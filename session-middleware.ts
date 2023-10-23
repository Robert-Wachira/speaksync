import {
  readSession,
  createSession,
  deleteSession,
} from "@/utils/sessionHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { useState, useEffect } from "react";

interface SessionData {
  user: string | null;
}
export async function useCustomSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [session, setSession] = useState<SessionData | null>(null);
  // const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionData = readSession(req);
    setSession(sessionData);
  }, []);

  const login = (data: SessionData) => {
    createSession(res, data);
    setSession(data);
  };

  const logout = () => {
    deleteSession(res);
    setSession(null);
  };

  return { session, login, logout };
  // const session = readSession(context.req);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login", // Redirect to the login page if not authenticated
  //       permanent: false,
  //     },
  //   };
  // }

  // // Continue with the protected route logic
}
