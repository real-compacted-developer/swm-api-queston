# 커넥트 클래스 질문 API

- 조회
- 추가
- 좋아요

## 질문 데이터 양식

```typescript
interface IQuestionInfo {
  id: number; // 유니크한 id 값

  userInfo: {
    userName: string;
    profileImageURL: string;
  };

  slideInfo: {
    page: number; // 연관된 슬라이드
    imageURL: string; // 연관된 슬라이드 이미지
  };

  like: number; // 좋아요 수

  content: string; // 질문 내용
}
```

## 질문 전부 조회

query로 조건을 설정함

sort_by : 정렬 기준

order : 오름차순, 내림차순 (asc : 오름차순, desc : 내림차순)

쿼리가 없는경우 MySQL에서 select한 순서대로

```typescript
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
```

성공 응답 예시

```json
{
  "success": true,
  "message": "SUCCESS",
  "data": {
    "questions": [
      {
        "id": 1,
        "userInfo": {
          "userName": "userName",
          "profileImageURL": "profileImageURL"
        },
        "slideInfo": {
          "page": 1,
          "imageURL": "slideImageURL"
        },
        "like": 0,
        "content": "질문 내용"
      }
      // ...
    ]
  }
}
```

실패 응답 예시

```json
{
  "success": false,
  "message": "DB CONNECTION FAILED"
}
```

### 질문 추가

```typescript
/**
 * @api {post} /study/:roomNumber/question 방의 질문을 추가함
 * @apiName CreateQuestion
 * @apiGroup Question
 *
 * @apiParam {String} roomNumber 유일한 방 번호
 * @apiParam {String} userId 생성한 유저의 unique한 ID 값
 * @apiParam {String} slidePage 슬라이드 페이지의 번호
 * @apiParam {String} slideImageURL 슬라이디 이미지 URL
 * @apiParam {string} title 질문 제목
 * @apiParam {String} content 질문 내용
 *
 * @apiSuccess {Boolean} success API 호출 성공 여부
 * @apiSuccess {String} message 응답 메시지
 * @apiSuccess {Object} data 생성한 질문 정보
 */
```

성공 응답 예시

```json
{
  "success": true,
  "message": "SUCCESS UPLOAD QUESTION",
  "data": {
    "question": {
      "id": 1,
      "userInfo": {
        "userName": "userName",
        "profileImageURL": "profileImageURL"
      },
      "slideInfo": {
        "page": 1,
        "imageURL": "slideImageURL"
      },
      "like": 0,
      "content": "질문 내용"
    }
  }
}
```

실패 응답 예시

```json
{
  "success": false,
  "message": "DB CONNECTION FAILED"
}
```

질문 좋아요 변경

```typescript
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
```

성공 응답 예시

```json
{
  "success": true,
  "message": "SUCCESS UPLOAD QUESTION",
  "data": {
    "question": {
      "id": 1,
      "userInfo": {
        "userName": "userName",
        "profileImageURL": "profileImageURL"
      },
      "slideInfo": {
        "page": 1,
        "imageURL": "slideImageURL"
      },
      "like": 1,
      "content": "질문 내용"
    }
  }
}
```

실패 응답 예시

```json
{
  "success": false,
  "message": "DB CONNECTION FAILED"
}
```
