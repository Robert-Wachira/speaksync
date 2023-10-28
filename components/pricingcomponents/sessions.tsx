"use client";

import { useEffect, useState } from "react";
//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

const hankoAPI = process.env.NEXT_PUBLIC_HANKO_API_URL;

export async function getSessionValid() {
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    // @ts-ignore
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoAPI ?? ""))
    );
  }, []);

  const sess = hanko?.session.isValid();
}

export async function getUserId() {
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    // @ts-ignore
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoAPI ?? ""))
    );
  }, []);

  //   const sess = hanko?.session.isValid();
  //   const sess = hanko?.session;
  const sessuserid = hanko?.user.getInfo();
  return sessuserid;
}
