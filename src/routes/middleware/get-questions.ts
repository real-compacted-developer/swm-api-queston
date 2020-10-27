import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { DBLayerQuestion, DBLayerUser } from "../../fetch";
import { IQuestionInfo, IUserRow } from "../../types";

type SuccessResponse = {
  success: true;
  message: string;
  data: {
    questions: IQuestionInfo[];
  };
};

type FailResponse = {
  success: false;
  message: string;
};

export async function getQuestions(req: Request, res: Response) {
  if (!validationResult(req).isEmpty()) {
    const responseJSON: FailResponse = {
      success: false,
      message: "INVALID URL (PARAMETERS)",
    };

    res.status(500).send(responseJSON);
    return;
  }

  const { roomNumber } = req.params;
  const { sort_by, order_by } = req.query;

  const query: {
    sortBy?: "created" | "like";
    orderBy?: "asc" | "desc";
  } = {};
  if (sort_by === "created" || sort_by === "like") query.sortBy = sort_by;
  if (order_by === "asc" || order_by === "desc") query.orderBy = order_by;

  const questionData = await DBLayerQuestion(Number(roomNumber), query);

  const userIdArray = questionData.map((cur) => cur.user);
  const userMap = new Map<string, IUserRow>();

  for (const key of userIdArray) {
    const userData = await DBLayerUser(key);

    if (!userData) continue;
    userMap.set(key, userData);
  }

  const responseData: IQuestionInfo[] = questionData.reduce((pre, cur) => {
    let user = userMap.get(cur.user);

    const question: IQuestionInfo = {
      id: cur.id,
      userInfo: {
        userName: user ? user.nickname : "찾을 수 없는 유저입니다.",
        profileImageURL: user ? user.profileImage : "default",
      },
      slideInfo: {
        page: cur.slideOrder,
        imageURL: cur.slideImageURL,
      },
      like: cur.like,
      content: cur.content,
    };

    pre.push(question);
    return pre;
  }, new Array<IQuestionInfo>());

  const responseJSON: SuccessResponse = {
    success: true,
    message: "SUCCESS",
    data: {
      questions: responseData,
    },
  };

  res.status(200).send(responseJSON);
}
