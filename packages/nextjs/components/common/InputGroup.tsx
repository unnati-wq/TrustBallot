type Props = {
  label?: string;
  children: React.ReactNode;
};

export const InputGroup = ({ label, children }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full mb-3">
      {label && (
        <label htmlFor={label} className="flex w-1/6 text-sm font-medium">
          {label}
        </label>
      )}
      <div className={label ? "w-5/6" : "w-full"}>{children}</div>
    </div>
  );
};
