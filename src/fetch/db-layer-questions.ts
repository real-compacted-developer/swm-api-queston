import { IQuestionRow } from "src/types";
import { dummyQuestionRow } from "../dummy";

type Option = {
  sortBy?: "created" | "like";
  orderBy?: "asc" | "desc";
};

async function testConnection(roomNumber: number, option: Option) {
  const dummyData: IQuestionRow[] = JSON.parse(JSON.stringify(dummyQuestionRow))
    .default;

  if (option?.sortBy === "created") {
    dummyData.sort(
      (a: IQuestionRow, b: IQuestionRow) =>
        Number(a.createdAt) - Number(b.createdAt)
    );

    if (option?.orderBy === "desc") {
      dummyData.reverse();
    }
  } else if (option?.sortBy === "like") {
    dummyData.sort((a: IQuestionRow, b: IQuestionRow) => a.like - b.like);

    if (option?.orderBy === "desc") {
      dummyData.reverse();
    }
  }

  return dummyData;
}

async function fetch(roomNumber: number, option: Option) {
  const dummyData: IQuestionRow[] = JSON.parse(JSON.stringify(dummyQuestionRow))
    .default;

  return dummyData;
}

let fetchQuestion: (
  roomNumber: number,
  option: Option
) => Promise<IQuestionRow[]>;

if (process.env.NODE_ENV === "test") {
  fetchQuestion = testConnection;
} else {
  fetchQuestion = fetch;
}

export default fetchQuestion;
