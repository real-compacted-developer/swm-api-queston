import { IQuestionRow } from "../types";

const dummyQuestionRow: IQuestionRow[] = [
  {
    id: 1,
    writer: 1,
    slide: {
      order: 1,
      url:
        "https://www.easygiftproducts.co.uk/16555/dolu-my-first-slide-030016-.jpg",
    },
    like: 0,
    content: "이부분을 잘 모르겠어요",
  },
  {
    id: 2,
    writer: 2,
    slide: {
      order: 3,
      url:
        "https://support.strava.com/hc/article_attachments/360057537172/Fullscreen_5_18_20__5_17_PM.jpg",
    },
    like: 3,
    content: "어려워요",
  },
];

export default dummyQuestionRow;
