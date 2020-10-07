import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { DBLayerCreateQuestion, DBLayerUser } from "../../fetch";
import { IQuestionInfo, QuestionData } from "../../types";

type SuccessResponse = {
  success: true;
  message: string;
  data: {
    question: IQuestionInfo;
  };
};

type FailResponse = {
  success: false;
  message: string;
};

export async function createQuestion(req: Request, res: Response) {
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req)
      .array()
      .map((cur) => {
        return cur.param;
      });

    const responseJSON: FailResponse = {
      success: false,
      message: `INVALID PARAMETERS (${errors.toString()})`,
    };

    res.status(500).send(responseJSON);
    return;
  }

  const { roomNumber } = req.params;
  const {
    userId,
    slidePage,
    slideImageURL,
    title,
    content,
  }: {
    userId: string;
    slidePage: number;
    slideImageURL: string;
    title: string;
    content: string;
  } = req.body;

  const userData = await DBLayerUser(userId);
  if (userData === undefined) {
    const responseJSON: FailResponse = {
      success: false,
      message: "INVALID USER",
    };

    res.status(500).send(responseJSON);
    return;
  }

  const data: QuestionData = {
    user: userData.id,
    title,
    content,
    slideOrder: slidePage,
    slideImageURL,
    studyDataId: roomNumber,
  };

  const questionData = await DBLayerCreateQuestion(roomNumber, data);
  if (questionData === undefined) {
    const responseJSON: FailResponse = {
      success: false,
      message: "INVALID URL (PARAMETERS)",
    };
    res.status(500).send(responseJSON);
    return;
  }

  const question: IQuestionInfo = {
    id: questionData.id,
    userInfo: {
      userName: userData.nickname,
      profileImageURL: userData.profileImage,
    },
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
