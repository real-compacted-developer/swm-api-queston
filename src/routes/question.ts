import { Router, Request, Response } from "express";
import { body, validationResult, buildCheckFunction } from "express-validator";

import { DBLayerQuestion, DBLayerUser } from "../fetch";
import { IQuestionInfo, IUserRow } from "../types";

const checkParamAndQuery = buildCheckFunction(["params", "query"]);

const router = Router();

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

/**
 * @api {get} /study/:roomNumber/questions?sort_by=created&order_by=asc 방의 질문 목록을 가져옴
 * @apiName GetQuestions
 * @apiGroup Question
 *
 * @apiParam {String} roomNumber 유일한 방 번호
 *
 * @apiSuccess {Boolean} success API 호출 성공 여부
 * @apiSuccess {String} message 응답 메시지
 * @apiSuccess {Object} data 해당 방의 질문 리스트
 */
router.get(
  "/study/:roomNumber/questions",
  [checkParamAndQuery("roomNumber").isNumeric()],
  async (req: Request, res: Response) => {
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

    const questionData = await DBLayerQuestion.default(
      Number(roomNumber),
      query
    );

    const userIdArray = questionData.map((cur) => cur.writer);
    const userMap = new Map<number, IUserRow>();

    await userIdArray.forEach((key) => {
      DBLayerUser.default(key).then((user) => {
        if (!user) return;
        userMap.set(key, user);
      });
    });

    const responseData: IQuestionInfo[] = questionData.reduce((pre, cur) => {
      const user = userMap.get(cur.writer);
      if (!user) return pre;

      const question: IQuestionInfo = {
        id: cur.id,
        userInfo: {
          userName: user.nickname,
          profileImageURL: user.profileImage,
        },
        slideInfo: {
          page: cur.slide.order,
          imageURL: cur.slide.url,
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
);

export default router;
