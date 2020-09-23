import { IUserRow } from "src/types";
import { dummyUserRow } from "../dummy";

async function testConnection(userId: number) {
  const dummyData: IUserRow[] = JSON.parse(JSON.stringify(dummyUserRow))
    .default;

  const user = dummyData.find((cur) => {
    if (cur.userId === userId) return cur;
  });

  return user;
}

async function fetch(userId: number) {
  const dummyData: IUserRow[] = JSON.parse(JSON.stringify(dummyUserRow))
    .default;

  const user = dummyData.find((cur) => {
    if (cur.userId === userId) return cur;
  });

  await setTimeout(() => {}, 500);

  return user;
}

let fetchUser: (userId: number) => Promise<IUserRow | undefined>;

if (process.env.NODE_ENV === "test") {
  fetchUser = testConnection;
} else {
  fetchUser = fetch;
}

export default fetchUser;
