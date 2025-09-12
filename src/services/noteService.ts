import axios from "axios";
import type Note from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const baseUrl = "https://notehub-public.goit.study/api/notes";

interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface createNoteProps {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

async function fetchNotes(
  search: string,
  page: number,
  perPage = 16
): Promise<fetchNotesProps> {
  const request = await axios.get<fetchNotesProps>(baseUrl, {
    params: {
      search,
      page,
      perPage,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return request.data;
}

export default fetchNotes;

export async function createNote(note: createNoteProps): Promise<Note> {
  const postRequest = await axios.post<Note>(baseUrl, note, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return postRequest.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteRequest = await axios.delete<Note>(baseUrl + "/" + id, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });
  return deleteRequest.data;
}
