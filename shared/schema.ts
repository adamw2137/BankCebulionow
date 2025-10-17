import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  balance: decimal("balance", { precision: 10, scale: 2 }).notNull().default("0.00"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const registerUserSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Hasła muszą być identyczne",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  username: z.string().min(1, "Login jest wymagany"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

export const updateUserSchema = z.object({
  id: z.string(),
  username: z.string().min(1, "Login jest wymagany"),
  password: z.string().min(1, "Hasło jest wymagane"),
  balance: z.coerce.number().min(0, "Saldo nie może być ujemne").transform(val => val.toFixed(2)),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
