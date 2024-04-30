import { VotingCard } from "./VotingCard";

const votings = [
  {
    name: "Voting 1",
    description: "A tiny voting description",
    endDate: "",
    host: "0x91912013920131032112311235464775848",
  },
  {
    name: "Voting 1",
    description: "A tiny voting description",
    endDate: "",
    host: "0x91912013920131032112311235464775848",
  },
  {
    name: "Voting 1",
    description: "A tiny voting description",
    endDate: "",
    host: "0x91912013920131032112311235464775848",
  },
  {
    name: "Voting 1",
    description: "A tiny voting description",
    endDate: "",
    host: "0x91912013920131032112311235464775848",
  },
];

export const VotingList = () => {
  return (
    <section className="p-10">
      <h3 className="text-3xl font-bold mb-8">Ongoing</h3>
      <div className="flex gap-3">
        {votings.map((voting, index) => (
          <div key={index} className="w-1/4">
            <VotingCard
              name={voting.name}
              description={voting.description}
              endDate={voting.endDate}
              host={voting.host}
            ></VotingCard>
          </div>
        ))}
      </div>
    </section>
  );
};
