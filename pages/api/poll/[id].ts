import { NextApiResponse } from "next";
import nc from "next-connect";
import onError from "../../../middleware/error";
import { createVote, deletePoll, getPoll } from "../../../db";
import middleware from "../../../middleware/all";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

handler.delete(async (req: any, res: any) => {
  const poll = await deletePoll(req.query.id as string);
  res.send({ data: poll });
});

export default handler;
