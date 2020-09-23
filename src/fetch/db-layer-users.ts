import { IUserRow } from "src/types";
import { dummyUserRow } from "../dummy";

async function testConnection(userId: number) {
  const dummyData: IUserRow[] = JSON.parse(JSON.stringify(dummyUserRow));

  const user = dummyData.find((cur) => {
    if (cur.userId === userId) return cur;
  });

  return user;
}

async function fetch(userId: number) {
  const dummyData: IUserRow[] = JSON.parse(JSON.stringify(dummyUserRow));

  const user = dummyData.find((cur) => {
    if (cur.userId === userId) return cur;
  });

  await setTimeout(() => {}, 500);

  return user;
}

let fetchUser: Function;

if (process.env.NODE_ENV === "test") {
  fetchUser = testConnection;
} else {
  fetchUser = fetch;
}

export default fetchUser;
