export interface IQuestionRow {
  id: number; // PK
  title: string;
  content: string;
  user: {
    id: string;
    nickname: string;
    email?: string;
    profileImage: string;
  };
  like: number;
  slideOrder: number;
  slideImageURL: string;
  createdAt: string;
}
