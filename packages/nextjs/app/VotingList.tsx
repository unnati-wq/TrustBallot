import { VotingCard } from "./VotingCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const VotingList = () => {
  const { data: events } = useScaffoldReadContract({
    contractName: "EventFactory",
    functionName: "getDeployedEvents",
  });

  return (
    <section className="p-10">
      <h3 className="text-3xl font-bold mb-8">Ongoing</h3>
      <div className="flex gap-3">
        {events && events.length > 0 ? (
          events.map((voting, index) => (
            <div key={index} className="w-1/4">
              <VotingCard
                name={voting.name}
                description={voting.description}
                endDate={voting.deadline.toString()}
                host={voting.owner}
              ></VotingCard>
            </div>
          ))
        ) : (
          <p>No voting events found</p>
        )}
      </div>
    </section>
  );
};
