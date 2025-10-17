import { type User, type InsertUser, type UpdateUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, user: UpdateUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      balance: insertUser.balance || "0.00"
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: string, updateData: UpdateUser): Promise<User> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      throw new Error("Użytkownik nie istnieje");
    }

    const updatedUser: User = {
      ...existingUser,
      username: updateData.username,
      password: updateData.password,
      balance: updateData.balance,
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();
