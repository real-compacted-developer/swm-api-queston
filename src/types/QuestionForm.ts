import { IUserRow } from "./";

export type QuestionData = {
  user: IUserRow;
  title: String;
  content: String;
  slideOrder: Number;
  slideImageURL: String;
  studyDataId: String;
};
