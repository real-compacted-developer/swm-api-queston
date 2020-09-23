export interface IQuestionRow {
  id: number; // PK
  content: string;
  like: number;
  writer: number; // FK - user
  slide: {
    order: number;
    url: string;
  };
}
