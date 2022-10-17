import { getToken } from "next-auth/jwt";

const auth = async (req, res, next) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (token) {
    req.user = token;
    next();
  } else {
    res.status(401);
    res.end();
  }
};
export default auth;
