import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { createVote } from "../lib";

export const useVote = (poll, channel) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [localVotes, setLocalVotes] = useState<string[] | undefined>(undefined);
  const [vote, setVote] = useState("");
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (poll) {
      const completedPolls = localStorage.getItem("completedPolls");
      const completedPollsArray = completedPolls
        ? JSON.parse(completedPolls)
        : [];
      const completedCheck = completedPollsArray.findIndex(
        (v) => v === poll?.id
      );
      if (completedCheck >= 0) setVoted(true);
      setLocalVotes(completedPollsArray);
    }
  }, [poll?.id]);

  const handleVoteChange = (e) => {
    setVote(e.target.value);
  };

  const handleVote = async () => {
    try {
      await createVote(router.query.id, vote);
      let _poll = { ...poll };
      let index = _poll.options.findIndex((o) => o.id === vote);
      _poll.options[index].voteCount += 1;
      //@ts-ignore
      channel.publish({ name: "vote", data: _poll });
      setVoted(true);
      if (localVotes) {
        localStorage.setItem(
          "completedPolls",
          JSON.stringify([...localVotes, poll?.id])
        );
      } else {
        localStorage.setItem("completedPolls", JSON.stringify([poll?.id]));
      }
    } catch (e) {}
  };

  return {
    handleVote,
    handleVoteChange,
    loading,
    localVotes,
    setVoted,
    vote,
    voted,
  };
};
