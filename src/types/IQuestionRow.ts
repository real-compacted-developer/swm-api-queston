export interface IQuestionRow {
  id: number; // PK
  title: string;
  content: string;
  user: string;
  like: number;
  slideOrder: number;
  slideImageURL: string;
  createdAt: string;
}
