export default interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export type NoteTags = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
