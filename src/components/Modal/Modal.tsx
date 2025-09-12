import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import NoteForm from "../NoteForm/NoteForm";
import { useEffect } from "react";
import { createNoteProps } from "../../services/noteService";

export interface NoteModalProps {
  onClose: () => void;
  onSubmitNote: (note: createNoteProps) => void;
}

const Modal = ({ onClose, onSubmitNote }: NoteModalProps) => {
  const handleBackdropClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (ev.target === ev.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {<NoteForm onClose={onClose} onSubmitNote={onSubmitNote} />}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
