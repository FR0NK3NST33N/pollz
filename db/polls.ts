import prisma from "./db";

export const getHighestVotedPolls = async (recordCount: number = 20) => {
  const polls = await prisma.poll.findMany({
    take: recordCount,
    select: {
      question: true,
      options: {
        select: {
          name: true,
          _count: {
            select: {
              votes: true,
            },
          },
        },
      },
    },
    orderBy: {
      options: {
        _count: "desc",
      },
    },
  });
  return polls;
};

export const getMyPolls = async (userId: string) => {
  const polls = await prisma.poll.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      question: true,
      options: {
        select: {
          name: true,
          _count: {
            select: {
              votes: true,
            },
          },
        },
      },
    },
  });
  return polls;
};

export const createPoll = async (
  userId: string,
  question: string,
  options: string[]
) => {
  try {
    const poll = await prisma.poll.create({
      data: {
        question: question,
        userId: userId,
      },
    });
    const optionRecords = options.map((o) => ({
      pollId: poll.id,
      name: o,
      voteCount: 0,
    }));
    await prisma.option.createMany({
      data: optionRecords,
    });
    return { poll: { ...poll } };
  } catch (e) {
    throw e;
  }
};

export const upvoteOption = async () => {};

export const getPoll = async (id: string) => {
  const poll = await prisma.poll.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      question: true,
      options: {
        select: {
          id: true,
          name: true,
          voteCount: true,
        },
      },
    },
  });
  return poll;
};

export const createVote = async (
  pollId: string,
  optionId: string,
  userId: string | undefined
) => {
  const option = await prisma.option.update({
    where: {
      id: optionId,
    },
    data: {
      voteCount: { increment: 1 },
      votes: {
        create: {
          pollId: pollId,
          userId: userId ?? "",
        },
      },
    },
  });
  return await getPoll(pollId);
};

export const deletePoll = async (pollId: string) => {
  const poll = await prisma.poll.delete({ where: { id: pollId } });
  return poll;
};
