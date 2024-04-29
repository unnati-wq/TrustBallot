"use client";

import { useState } from "react";
import { NextPage } from "next";
import { Descriptions, InputGroup } from "~~/components/common/";
import { InputBase } from "~~/components/scaffold-eth";

const New: NextPage = () => {
  const [name, setName] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleDateChange = (value: string) => {
    setDateEnd(value);
  };

  const items = [
    { label: "Name", value: name },
    { label: "Description", value: description },
    { label: "Date End", value: dateEnd },
  ];

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-5">New Voting</h2>
      <div className="flex gap-5">
        <div className="p-8 bg-gray-200 dark:bg-slate-800 rounded-xl md:w-1/2">
          <h3 className="text-3xl font-bold">Details</h3>
          <InputGroup label="Name">
            <InputBase value={name} onChange={handleNameChange}></InputBase>
          </InputGroup>
          <InputGroup label="Description">
            <InputBase value={description} onChange={handleDescriptionChange}></InputBase>
          </InputGroup>
          <InputGroup label="Date End">
            <InputBase type="date" value={dateEnd} onChange={handleDateChange}></InputBase>
          </InputGroup>
        </div>
        <div className="p-8 bg-gray-200 dark:bg-slate-800 rounded-xl md:w-1/2">
          <h3 className="text-3xl font-bold">Review</h3>
          <Descriptions items={items} />
        </div>
      </div>
    </div>
  );
};

export default New;
