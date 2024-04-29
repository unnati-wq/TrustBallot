import { useContext } from "react";
import { NewVotingStateContext } from "./_context";
import { NextPage } from "next";
import { Descriptions, InputGroup } from "~~/components/common";
import { InputBase } from "~~/components/scaffold-eth";

export const NewVoting: NextPage = () => {
  const { state, dispatch } = useContext(NewVotingStateContext);

  const handleNameChange = (value: string) => {
    dispatch({ type: "SET_NAME", payload: value });
  };

  const handleDescriptionChange = (value: string) => {
    dispatch({ type: "SET_DESCRIPTION", payload: value });
  };

  const handleDateChange = (value: string) => {
    dispatch({ type: "SET_DATE_END", payload: value });
  };

  const addAddress = (value: string) => {
    dispatch({ type: "ADD_ADDRESS", payload: value });
  };

  /*
  const addOption = (value: string) => {
    dispatch({ type: "ADD_OPTION", payload: value });
  };
  */

  const items = [
    { label: "Name", value: state.name },
    { label: "Description", value: state.description },
    { label: "Date End", value: state.dateEnd },
    { label: "Allowed Addresses (Voters)", value: state.addresses.join(", ") },
  ];

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-5">Voting Voting</h2>
      <div className="flex gap-5">
        <div className="p-8 bg-gray-200 dark:bg-slate-800 rounded-xl md:w-1/2">
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-3">Details</h3>
            <InputGroup label="Name">
              <InputBase value={state.name} onChange={handleNameChange}></InputBase>
            </InputGroup>
            <InputGroup label="Description">
              <InputBase value={state.description} onChange={handleDescriptionChange}></InputBase>
            </InputGroup>
            <InputGroup label="Date End">
              <InputBase type="date" value={state.dateEnd} onChange={handleDateChange}></InputBase>
            </InputGroup>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-3">Addresses</h3>
            {state.addresses.map((address, index) => (
              <InputGroup key={index} label="Address">
                <InputBase value={address} onChange={v => console.log(v)}></InputBase>
              </InputGroup>
            ))}
            <button className="bg-primary px-5 py-3 rounded-full" onClick={() => addAddress("test")}>
              Add address
            </button>
          </div>
        </div>
        <div className="p-8 bg-gray-200 dark:bg-slate-800 rounded-xl md:w-1/2">
          <h3 className="text-3xl font-bold">Review</h3>
          <Descriptions items={items} />
        </div>
      </div>
    </div>
  );
};

export default NewVoting;
