"use server";
import { cookies } from "next/headers";
import { api } from "./api";
import { FetchNotesParams, FetchNotesResponse, Note } from "@/types/note";
import { User } from "@/types/user";

export const fetchNotes = async (params: FetchNotesParams = {}) => {
  const cookieStore = await cookies();
  const res = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const deleteNote = async (id: string) => {
  const cookieStore = await cookies();
  const res = await api.delete(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const res = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
