import Image from "next/image";
import thumbnailImg from "/public/thumbnail.jpg";

type Props = {
  name: string;
  description: string;
  endDate: string;
  host: string;
};

export const VotingCard = ({ name, description, endDate, host }: Props) => {
  return (
    <div className="flex flex-col p-6 rounded-xl bg-gray-400 dark:bg-slate-900">
      <div className="leading-none">
        <h4 className="text-xl font-bold">{name}</h4>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex flex-row mb-2">
        <Image src={thumbnailImg} width={50} height={50} alt="user" className="rounded-full"></Image>
        <div className="flex flex-col ml-4 w-100 overflow-hidden">
          <span className="text-sm">hosts</span>
          <span className="text-md">{host}</span>
        </div>
      </div>
      <span className="text-sm">Ends: {new Date(parseInt(endDate) * 1000).toDateString()}</span>
    </div>
  );
};
