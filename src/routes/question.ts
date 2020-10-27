import { Router } from "express";
import { buildCheckFunction, body } from "express-validator";

import { getQuestions, updateLike, createQuestion } from "./middleware";

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
 * @api {patch} study/:roomNumber/question/:questionId?type=increase 방의 질문의 좋아요를 변화시킴 (1개씩)
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
  "study/:roomNumber/question/:questionId",
  [checkParamAndQuery("questionId").isString()],
  updateLike
);

/**
 * @api {post} /study/:roomNumber/question 방의 질문을 추가함
 * @apiName CreateQuestion
 * @apiGroup Question
 *
 * @apiParam {String} roomNumber 유일한 방 번호
 * @apiParam {String} userId 생성한 유저의 unique한 ID 값
 * @apiParam {String} slidePage 슬라이드 페이지의 번호
 * @apiParam {String} slideImageURL 슬라이디 이미지 URL
 * @apiParam {String} title 질문 제목
 * @apiParam {String} content 질문 내용
 *
 * @apiSuccess {Boolean} success API 호출 성공 여부
 * @apiSuccess {String} message 응답 메시지
 * @apiSuccess {Object} data 생성한 질문 정보
 */
router.post(
  "/study/:roomNumber/question",
  [
    checkParamAndQuery("roomNumber").isString(),
    body("userId").isString(),
    body("slidePage").isNumeric(),
    body("slideImageURL").isString(),
    body("title").isString(),
    body("content").isString(),
  ],
  createQuestion
);

export default router;
