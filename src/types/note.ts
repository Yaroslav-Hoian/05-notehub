export default interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

type NoteTags = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export default interface NoteTag {
  noteTag: NoteTags;
}
