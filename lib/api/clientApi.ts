import {
  AuthResponse,
  FetchNotesParams,
  FetchNotesResponse,
  Note,
  NoteCreate,
  LoginBody,
} from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

export const login = async (data: LoginBody) => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export const register = async (data: LoginBody) => {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
};

export const fetchNotes = async (params: FetchNotesParams = {}) => {
  const res = await api.get<FetchNotesResponse>("/notes", { params });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (note: NoteCreate) => {
  const res = await api.post<Note>("/notes", note);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete<void>(`/notes/${id}`);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<{ success: boolean }>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (userData: Partial<User>) => {
  const res = await api.patch<User>("/users/me", userData);
  return res.data;
};
