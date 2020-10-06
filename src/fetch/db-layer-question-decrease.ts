import { IQuestionRow } from "src/types";
import { dummyQuestionRow } from "../dummy";

import axios from "axios";

type Option = {
  diff: 1 | -1;
};

async function testConnection(questionId: string) {
  const dummyData: IQuestionRow = JSON.parse(JSON.stringify(dummyQuestionRow))
    .default[0];

  dummyData.like -= 1;

  return dummyData;
}

async function fetchData(questionId: string) {
  try {
    const response = await axios
      .delete(`${process.env.DB_LAYER_HOST}/question/like/${questionId}`)
      .then((response) => response.data);

    const { data, success } = response;
    if (!success) return undefined;

    return data as IQuestionRow;
  } catch (error) {
    return undefined;
  }
}

export let fetchQuestion: (
  questionId: string
) => Promise<IQuestionRow | undefined>;

if (process.env.NODE_ENV === "test") {
  fetchQuestion = testConnection;
} else {
  fetchQuestion = fetchData;
}
