import { NextApiResponse } from "next";
import nc from "next-connect";
import onError from "../../../middleware/error";
import middleware from "../../../middleware/all";
import { createPoll, getMyPolls } from "../../../lib";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);
handler.post(async (req, res) => {
  console.log(req.user);
  const newPoll = await createPoll(
    req.user.uid,
    req.body.question,
    req.body.options
  );
  res.send({ data: newPoll });
});

handler.get(async (req, res) => {
  const polls = await getMyPolls(req.user.uid);
  res.send({ data: polls });
});

export default handler;