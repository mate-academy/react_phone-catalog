type OptionProps = {
  value: string;
  name: string;
  label: string;
  onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Option = ({
  value, name, label, onOptionChange,
}: OptionProps) => (
  <label className="select__option">
    <input
      onChange={onOptionChange}
      value={value}
      name={name}
      type="radio"
      className="select__input"
    />
    {label}
  </label>
);
