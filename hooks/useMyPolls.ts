import { useEffect, useMemo, useState } from "react";
import { createPoll, deletePoll, fetchMyPolls } from "../lib";

export const useMyPolls = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState<any[]>([]);

  const getMyPolls = async () => {
    const data = await fetchMyPolls();
    setPolls(data);
    setLoading(false);
  };

  useEffect(() => {
    getMyPolls();
  }, []);

  const handleSave = async (question: string, options: string[]) => {
    try {
      setLoading(true);
      setOpen(false);

      await createPoll(question, options);
      getMyPolls();
    } catch (e) {}
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deletePoll(id);
      getMyPolls();
    } catch (e) {}
  };

  return {
    handleDelete,
    handleSave,
    loading,
    open,
    polls,
    setOpen,
  };
};
