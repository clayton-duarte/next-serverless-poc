import { withIronSession, Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";

interface NextApiRequestWithSession extends NextApiRequest {
  session: Session;
}

type NextApiHandlerWithSession = (
  req: NextApiRequestWithSession,
  res: NextApiResponse
) => Promise<void> | void;

export default (handler: NextApiHandlerWithSession, isPrivate = true) => {
  function ensureAuthenticated(req, res) {
    if (isPrivate) {
      const token = req.session.get("token");
      if (!token) {
        res.statusCode = 401;
        req.session.destroy();
        res.send("Please Auth");
        return;
      }
    }
    return handler(req, res);
  }

  return withIronSession(ensureAuthenticated, {
    password: process.env.SESSION_PASSWORD,
    cookieName: "session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
};
