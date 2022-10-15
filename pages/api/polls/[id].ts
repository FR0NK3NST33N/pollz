import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import onError from "../../../middleware/error";
import middleware from "../../../middleware/all";
import { createPoll, createVote, getMyPolls, getPoll } from "../../../lib";
import Pusher from "pusher";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.get(async (req: any, res: any) => {
  console.log(req.query);
  const poll = await getPoll(req.query.id as string);
  res.send({ data: poll });
});

handler.post(async (req: any, res: any) => {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP as string,
    key: process.env.PUSHER_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: process.env.PUSHER_CLUSTER as string,
    useTLS: true,
  });

  console.log(req.query);
  const poll = await createVote(
    req.query.id as string,
    req.body.vote,
    req.user?.uid ?? undefined
  );
  pusher.trigger("pollz", "message", {
    message: poll,
  });
  res.send({ data: poll });
});

export default handler;
