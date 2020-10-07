import axios from "axios";

import { IUserRow } from "src/types";
import { dummyUserRow } from "../dummy";

async function testConnection(userId: string): Promise<IUserRow | undefined> {
  const dummyData: IUserRow[] = JSON.parse(JSON.stringify(dummyUserRow))
    .default;

  const user = dummyData.find((cur) => {
    if (cur.id === userId) return cur;
  });

  return user;
}

async function fetch(userId: string): Promise<IUserRow | undefined> {
  const response = await axios
    .get(`${process.env.DB_LAYER_HOST}/user/${userId}`)
    .then((response) => response.data);

  if (response.success === false) {
    return undefined;
  }

  return response.data;
}

export let fetchUser: (userId: string) => Promise<IUserRow | undefined>;

if (process.env.NODE_ENV === "test") {
  fetchUser = testConnection;
} else {
  fetchUser = fetch;
}
