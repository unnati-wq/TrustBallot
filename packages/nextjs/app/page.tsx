"use client";

import Link from "next/link";
import { VotingList } from "./VotingList";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex min-h-[70vh] p-4 items-center text-center">
          <div className="my-auto">
            <h1 className="p-4 text-5xl font-bold">Truly descentralized voting for everyone</h1>
            <span className="text-lg">
              Create and participate in voting rounds that are 100% trusted and censorship resistant
            </span>
            <br />
            <Link className="bg-primary px-5 py-3 rounded-full" href="new">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <VotingList></VotingList>
    </>
  );
};

export default Home;
