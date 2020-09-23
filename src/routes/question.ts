import { Router, Request, Response } from "express";
import { body, validationResult, buildCheckFunction } from "express-validator";

import { DBLayerQuestion } from "../fetch";
import { IQuestionInfo } from "../types";

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
 * @api {get} /study/:roomNumber/questions?sort_by=created&order=asc 방의 질문 목록을 가져옴
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
  [checkParamAndQuery("roomNumber").isString()],
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
    const { sort_by, order } = req.query;

    const query = {
      sortBy: sort_by,
      orderBy: order,
    };

    const questionData = await DBLayerQuestion.default(roomNumber, query);

    const responseJSON: SuccessResponse = {
      success: true,
      message: "SUCCESS",
      data: {
        questions: questionData,
      },
    };

    res.status(200).send(responseJSON);
  }
);

export default router;
