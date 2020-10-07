import { IQuestionRow, QuestionData } from "src/types";

import axios from "axios";

async function testConnection(roomId: string, questionData: QuestionData) {
  return undefined;
}

async function fetchData(roomId: string, questionData: QuestionData) {
  const response = await axios
    .post(`${process.env.DB_LAYER_HOST}/question`, questionData)
    .then((response) => response.data);

  const { data, success } = response;
  if (!success) return undefined;

  return data;
}

export let fetchQuestion: (
  roomId: string,
  data: QuestionData
) => Promise<IQuestionRow | undefined>;

if (process.env.NODE_ENV === "test") {
  fetchQuestion = testConnection;
} else {
  fetchQuestion = fetchData;
}
