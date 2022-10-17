export const fetchMyPolls = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/polls`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();
  return data;
};

export const fetchPoll = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/polls/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = await res.json();
  return data;
};

export const createPoll = async (question, options) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/polls`, {
    method: "POST",
    body: JSON.stringify({ question: question, options: options }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return;
};

export const createVote = async (id, vote) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/polls/${id}`, {
    method: "POST",
    body: JSON.stringify({ vote: vote }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return;
};

export const deletePoll = async (id) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/poll/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return;
};
