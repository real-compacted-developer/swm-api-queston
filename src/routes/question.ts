import { Router, Request, Response } from "express";
import { body, validationResult, buildCheckFunction } from "express-validator";

import { DBLayerQuestion, DBLayerUser } from "../fetch";
import { IQuestionInfo, IUserRow } from "../types";

const checkParamAndQuery = buildCheckFunction(["params", "query"]);

import { getQuestions } from "./middleware";

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
  getQuestions.default
);

export default router;
