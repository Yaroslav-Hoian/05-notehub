import css from "./App.module.css";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import fetchNotes, {
  createNote,
  createNoteProps,
  deleteNote,
} from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

const App = () => {
  const [noteWordSearch, setNoteWordSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["noteHubKey", noteWordSearch, page],
    queryFn: () => fetchNotes(noteWordSearch, page),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();

  const mutationPost = useMutation({
    mutationFn: async (newNote: createNoteProps) => {
      const res = await createNote(newNote);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteHubKey"] });
    },
  });

  const handleCreateTodo = () => {
    mutationPost.mutate({
      title: "string",
      content: "string",
      tag: "string",
    });
  };

  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteHubKey"] });
    },
  });

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
  };

  const handleSearch = (query: string) => {
    setNoteWordSearch(query);
    setPage(1);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>
      {isOpenModal && <Modal onClose={handleCloseModal} />}
      {data && data?.notes.length > 0 && (
        <NoteList notes={data?.notes} onSelect={handleDeleteNote} />
      )}
    </div>
  );
};

export default App;
