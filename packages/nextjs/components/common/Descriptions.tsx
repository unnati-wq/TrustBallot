interface Props {
  items: { label: string; value: string }[];
}

export const Descriptions: React.FC<Props> = ({ items }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map(item => (
        <div key={item.label} className="flex gap-2 w-full">
          <span className="w-1/5">{item.label}:</span>
          <span className="w-4/5">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
