import { IUserRow } from "../types";

const dummyUserRow: IUserRow[] = [
  {
    id: "1",
    nickname: "김철수",
    email: "chulsu@gmmail.com",
    profileImage:
      "https://cdn1.iconfinder.com/data/icons/female-avatars-vol-1/256/female-portrait-avatar-profile-woman-sexy-afro-2-512.png",
    isPremium: true,
  },
  {
    id: "2",
    nickname: "홍길동",
    email: "hong@korea.com",
    profileImage:
      "https://eruditegroup.co.nz/wp-content/uploads/2016/07/profile-dummy3.png",
    isPremium: false,
  },
];

export default dummyUserRow;
