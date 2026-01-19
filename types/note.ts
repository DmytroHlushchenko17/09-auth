import { User } from "./user";

export interface LoginBody {
  email: string;
  password: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  tag: string;
}

export interface Note extends NoteCreate {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
