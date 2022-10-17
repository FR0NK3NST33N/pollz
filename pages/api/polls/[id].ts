import { NextApiResponse } from "next";
import nc from "next-connect";
import onError from "../../../middleware/error";
import { createVote, getPoll } from "../../../db";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.get(async (req: any, res: any) => {
  const poll = await getPoll(req.query.id as string);
  res.send({ data: poll });
});

handler.post(async (req: any, res: any) => {
  const poll = await createVote(
    req.query.id as string,
    req.body.vote,
    req.user?.uid ?? undefined
  );
  res.send({ data: poll });
});

export default handler;
