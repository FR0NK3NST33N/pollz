import Ably from "ably/promises";

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "pollz",
  });
  res.status(200).json(tokenRequestData);
}
