import type Note from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  onSelect: (note: string) => void;
  notes: Note[];
}

const NoteList = ({ notes, onSelect }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button onClick={() => onSelect(note.id)} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
