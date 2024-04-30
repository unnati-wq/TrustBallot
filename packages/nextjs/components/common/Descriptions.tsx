interface Props {
  items: { label: string; value: string }[];
}

export const Descriptions: React.FC<Props> = ({ items }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map(item => (
        <div key={item.label} className="flex w-full break-words">
          <span className="w-2/5">{item.label}:</span>
          <span className="w-3/5">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
