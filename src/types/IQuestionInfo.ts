export interface IQuestionInfo {
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
