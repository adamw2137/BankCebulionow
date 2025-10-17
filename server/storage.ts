// server/storage.ts
import { supabase } from "./supabaseClient";

// Typ użytkownika
export interface User {
  id: string;
  username: string;
  password: string;
  balance: number;
}

// Funkcje storage
async function createUser(user: { username: string; password: string; balance?: number }) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ username: user.username, password: user.password, balance: user.balance || 0 }])
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

async function getUserByUsername(username: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as User | null;
}

async function getUser(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as User | null;
}

async function getAllUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data as User[];
}

async function updateUser(id: string, updated: { username?: string; password?: string; balance?: number }) {
  const { data, error } = await supabase
    .from("users")
    .update(updated)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

// Tworzymy jeden obiekt default export
const storage = {
  createUser,
  getUserByUsername,
  getUser,
  getAllUsers,
  updateUser,
};

export default storage;
