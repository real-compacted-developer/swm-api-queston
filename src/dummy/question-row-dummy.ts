import { IQuestionRow } from "../types";

const dummyQuestionRow: IQuestionRow[] = [
  {
    id: 1,
    slideImageURL:
      "https://www.easygiftproducts.co.uk/16555/dolu-my-first-slide-030016-.jpg",
    slideOrder: 1,
    like: 0,
    title: "이부분 질문",
    user: "1",
    content: "이부분을 잘 모르겠어요",
    createdAt: "2020-09-20T04:58:22.304Z",
  },
  {
    id: 2,
    slideOrder: 3,
    slideImageURL:
      "https://support.strava.com/hc/article_attachments/360057537172/Fullscreen_5_18_20__5_17_PM.jpg",
    user: "2",
    like: 3,
    title: "이부분이 어려워요",
    content: "어려워요",
    createdAt: "2020-09-21T04:58:22.304Z",
  },
];

export default dummyQuestionRow;
