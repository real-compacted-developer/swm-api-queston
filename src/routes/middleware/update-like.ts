import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { DBLayerQuestionIncrease, DBLayerQuestionDecrease } from "../../fetch";

type Question = {
  id: number;
  user: string;
  slideInfo: {
    page: number;
    imageURL: string;
  };
  like: number;
  content: string;
};

type SuccessResponse = {
  success: true;
  message: string;
  data: {
    question: Question;
  };
};

type FailResponse = {
  success: false;
  message: string;
};

export async function updateLike(req: Request, res: Response) {
  if (!validationResult(req).isEmpty()) {
    const responseJSON: FailResponse = {
      success: false,
      message: "INVALID URL (PARAMETERS)",
    };

    res.status(500).send(responseJSON);
    return;
  }

  const { questionId, roomNumber } = req.params;
  const { type } = req.query;

  console.log(type, questionId);

  const questionData =
    type === "decrease"
      ? await DBLayerQuestionDecrease(roomNumber, questionId)
      : await DBLayerQuestionIncrease(roomNumber, questionId);

  if (!questionData) {
    const responseJSON: FailResponse = {
      success: false,
      message: "INVALID QUESTION ID (NO QUESTION DATA)",
    };

    res.status(500).send(responseJSON);
    return;
  }

  const question: Question = {
    id: questionData.id,
    user: questionData.user,
    slideInfo: {
      page: questionData.slideOrder,
      imageURL: questionData.slideImageURL,
    },
    like: questionData.like,
    content: questionData.content,
  };

  const responseJSON: SuccessResponse = {
    success: true,
    message: "SUCCESS",
    data: {
      question,
    },
  };

  res.status(200).send(responseJSON);
}
