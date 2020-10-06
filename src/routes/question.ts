import { Router } from "express";
import { buildCheckFunction } from "express-validator";

import { getQuestions, updateLike } from "./middleware";

const checkParamAndQuery = buildCheckFunction(["params", "query"]);

const router = Router();

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
  [checkParamAndQuery("roomNumber").isString()],
  getQuestions
);

/**
 * @api {patch} /question/:questionId?type=increase 방의 질문의 좋아요를 변화시킴 (1개씩)
 * @apiName IncreaseLike
 * @apiGroup Question
 *
 * @apiParam {String} questionId 유일한 질문 번호
 * @apiParam {String} type 좋아요의 증감 "increase" | "decrease"
 *
 * @apiSuccess {Boolean} success API 호출 성공 여부
 * @apiSuccess {String} message 응답 메시지
 * @apiSuccess {Object} data 좋아요를 증가시킨 질문 정보
 */
router.patch(
  "/question/:questionId",
  [checkParamAndQuery("questionId").isString()],
  updateLike
);

export default router;
