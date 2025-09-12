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
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [noteWordSearch, setNoteWordSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [debouncedSearch] = useDebounce(noteWordSearch, 1000);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["noteHubKey", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [data]);

  const queryClient = useQueryClient();

  const mutationPost = useMutation({
    mutationFn: async (newNote: createNoteProps) => {
      const res = await createNote(newNote);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteHubKey"] });
      toast.success("Success! Your note has been added.");
    },
  });

  const handleCreateNote = (note: createNoteProps) => {
    mutationPost.mutate(note);
  };

  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteHubKey"] });
      toast.success("Success! Your note has been deleted.");
    },
  });

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
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
        <Toaster />
        <SearchBox
          value={noteWordSearch}
          onChange={(e) => {
            setNoteWordSearch(e.target.value);
            setPage(1);
          }}
        />
        {isSuccess && data?.totalPages > 1 && (
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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isOpenModal && (
        <Modal onClose={handleCloseModal} onSubmitNote={handleCreateNote} />
      )}
      {isSuccess && data?.notes.length > 0 && (
        <NoteList notes={data?.notes} onSelect={handleDeleteNote} />
      )}
    </div>
  );
};

export default App;
