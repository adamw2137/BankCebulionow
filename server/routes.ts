import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, updateUserSchema } from "@shared/schema";
import session from "express-session";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admingorka";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    isAdmin?: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "bank-cebulionow-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Użytkownik o tym loginie już istnieje" });
      }

      const user = await storage.createUser(validatedData);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Błąd rejestracji" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      const user = await storage.getUserByUsername(validatedData.username);
      if (!user || user.password !== validatedData.password) {
        return res.status(401).json({ message: "Nieprawidłowy login lub hasło" });
      }

      req.session.userId = user.id;
      req.session.isAdmin = false;

      res.json({ id: user.id, username: user.username, balance: user.balance });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Błąd logowania" });
    }
  });

  app.post("/api/auth/admin-login", async (req: Request, res: Response) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      if (
        validatedData.username !== ADMIN_USERNAME ||
        validatedData.password !== ADMIN_PASSWORD
      ) {
        return res.status(401).json({ message: "Nieprawidłowe dane logowania administratora" });
      }

      req.session.isAdmin = true;
      req.session.userId = undefined;

      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Błąd logowania" });
    }
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Nie zalogowano" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    res.json(user);
  });

  app.get("/api/auth/check-admin", async (req: Request, res: Response) => {
    res.json(req.session.isAdmin === true);
  });

  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Błąd wylogowania" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/users", async (req: Request, res: Response) => {
    if (!req.session.isAdmin) {
      return res.status(403).json({ message: "Brak uprawnień administratora" });
    }

    const users = await storage.getAllUsers();
    res.json(users);
  });

  app.put("/api/admin/users/:id", async (req: Request, res: Response) => {
    if (!req.session.isAdmin) {
      return res.status(403).json({ message: "Brak uprawnień administratora" });
    }

    try {
      const { id } = req.params;
      const validatedData = updateUserSchema.parse({ ...req.body, id });

      const existingUserWithUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUserWithUsername && existingUserWithUsername.id !== id) {
        return res.status(400).json({ message: "Użytkownik o tym loginie już istnieje" });
      }

      const updatedUser = await storage.updateUser(id, validatedData);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Błąd aktualizacji użytkownika" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
