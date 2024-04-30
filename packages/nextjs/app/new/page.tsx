"use client";

import NewVoting from "./NewVoting";
import { NewVotingStateProvider } from "./_context";

const New = () => {
  return (
    <NewVotingStateProvider>
      <NewVoting></NewVoting>
    </NewVotingStateProvider>
  );
};

export default New;
