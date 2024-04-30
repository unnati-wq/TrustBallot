import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NewVotingStateContext, Option } from "./_context";
import { NextPage } from "next";
import { Descriptions, InputGroup } from "~~/components/common";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const NewVoting: NextPage = () => {
  const { state, dispatch } = useContext(NewVotingStateContext);
  const [address, setAddress] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionDescription, setOptionDescription] = useState("");
  const { writeContractAsync: writeEventFactoryAsync } = useScaffoldWriteContract("EventFactory");
  const router = useRouter();

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

  const removeAddress = (value: string) => {
    dispatch({ type: "REMOVE_ADDRESS", payload: value });
  };

  const addOption = (value: Option) => {
    dispatch({ type: "ADD_OPTION", payload: value });
  };

  const removeOption = (value: string) => {
    dispatch({ type: "REMOVE_OPTION", payload: value });
  };

  const isFormValid = useMemo(() => {
    return state.name && state.description && state.dateEnd && state.addresses.length > 0 && state.options.length > 0;
  }, [state.addresses.length, state.dateEnd, state.description, state.name, state.options.length]);

  const createVoting = async () => {
    try {
      await writeEventFactoryAsync(
        {
          functionName: "createEvent",
          args: [
            state.name,
            state.description,
            BigInt(Math.floor(new Date(state.dateEnd).getTime() / 1000)),
            state.addresses,
          ],
        },
        {
          onBlockConfirmation: () => {
            router.push("/");
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  const handleSubmit = () => {
    if (isFormValid) {
      createVoting();
    }
  };

  const items = [
    { label: "Name", value: state.name },
    { label: "Description", value: state.description },
    { label: "Date End", value: state.dateEnd },
    { label: "Allowed Addresses (Voters)", value: state.addresses.join(", ") },
    { label: "Options/ Candidates", value: state.options.map(o => o.name).join(", ") },
  ];

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-5">New Voting</h2>
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
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-3">Options</h3>
            <div className="flex items-center gap-2 w-full mb-3">
              <InputBase placeholder="Name" value={optionName} onChange={setOptionName} />
              <InputBase placeholder="Description" value={optionDescription} onChange={setOptionDescription} />
              <button
                className="bg-primary px-5 py-3 rounded-full"
                onClick={() => {
                  setOptionName("");
                  setOptionDescription("");
                  addOption({ name: optionName, description: optionDescription });
                }}
              >
                Add
              </button>
            </div>
            {state.options.map((option, index) => (
              <div key={index} className="flex">
                <InputGroup>
                  <InputBase value={option.name} disabled onChange={v => console.log(v)}></InputBase>
                  <InputBase value={option.description} disabled onChange={v => console.log(v)}></InputBase>
                </InputGroup>
                <button className="bg-primary px-5 py-3 rounded-full" onClick={() => removeOption(option.name)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-3">Voters</h3>
            <div className="flex items-center gap-2 w-full mb-3">
              <AddressInput value={address} onChange={setAddress} />
              <button
                className="bg-primary px-5 py-3 rounded-full"
                onClick={() => {
                  setAddress("");
                  addAddress(address);
                }}
              >
                Add
              </button>
            </div>
            {state.addresses.map((address, index) => (
              <div key={index} className="flex">
                <InputGroup>
                  <AddressInput value={address} disabled onChange={v => console.log(v)}></AddressInput>
                </InputGroup>
                <button className="bg-primary px-5 py-3 rounded-full" onClick={() => removeAddress(address)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="p-8 h-fit bg-gray-200 dark:bg-slate-800 rounded-xl md:w-1/2">
          <h3 className="text-3xl font-bold">Review</h3>
          <Descriptions items={items} />
          <button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className="float-end mt-5 bg-primary px-5 py-3 rounded-full"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewVoting;
