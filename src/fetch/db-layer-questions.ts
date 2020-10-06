import { IQuestionRow } from "src/types";
import { dummyQuestionRow } from "../dummy";

import axios from "axios";

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
  } else if (option?.sortBy === "like") {
    dummyData.sort((a: IQuestionRow, b: IQuestionRow) => a.like - b.like);
  }

  if (option?.orderBy === "desc") {
    dummyData.reverse();
  }

  return dummyData;
}

async function fetchData(roomNumber: number, option: Option) {
  const response = await axios
    .get(`${process.env.DB_LAYER_HOST}/studydata/${roomNumber}`)
    .then((response) => response.data);

  const { data, success } = response;
  if (!success) return [];

  const dummyData: IQuestionRow[] = data.questions;

  if (option?.sortBy === "created") {
    dummyData.sort(
      (a: IQuestionRow, b: IQuestionRow) =>
        Number(a.createdAt) - Number(b.createdAt)
    );
  } else if (option?.sortBy === "like") {
    dummyData.sort((a: IQuestionRow, b: IQuestionRow) => a.like - b.like);
  }

  return dummyData;
}

export let fetchQuestion: (
  roomNumber: number,
  option: Option
) => Promise<IQuestionRow[]>;

if (process.env.NODE_ENV === "test") {
  fetchQuestion = testConnection;
} else {
  fetchQuestion = fetchData;
}
