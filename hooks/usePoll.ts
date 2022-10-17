import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { fetchPoll } from "../lib";

export const usePoll = () => {
  const router = useRouter();
  const [poll, setPoll] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  const totalVotes = useMemo(() => {
    if (poll)
      return poll.options.reduce(
        (previousValue, currentValue) => previousValue + currentValue.voteCount,
        0
      );
  }, [poll?.options.map((o) => o.voteCount).toString()]);

  useEffect(() => {
    const getPoll = async (id) => {
      const data = await fetchPoll(id);
      setPoll(data);
    };
    if (router.query.id) getPoll(router.query.id);
    setLoading(false);
  }, [router, poll?.id]);

  return {
    loading,
    poll,
    setPoll,
    totalVotes,
  };
};
