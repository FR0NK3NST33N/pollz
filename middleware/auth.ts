import { getToken } from "next-auth/jwt";

const auth = async (req, res, next) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET }); // await jwt.getToken({ req, secret: process.env.JWT_SECRET });

  console.log(token);

  if (token) {
    // Signed in
    req.user = token;
    next();
  } else {
    // Not Signed in
    res.status(401);
    res.end();
  }
};
export default auth;
