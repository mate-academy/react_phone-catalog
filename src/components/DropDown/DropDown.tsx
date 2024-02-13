import './DropDown.scss';

export const Dropdown = (
  {
    label,
    value,
    options,
    handleChange,
  }: {
    label: string,
    options: {},
    value: string | number,
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  },
) => {
  return (
    <div className="dropdown icon-down">
      <label
        className="dropdown__label"
      >
        {label}
      </label>
      <select
        value={value}
        className="select"
        onChange={handleChange}
      >
        {Object.entries(options).map(([key, v]) => (
          <option value={key} key={key}>
            {v as React.ReactNode}
          </option>
        ))}
      </select>
    </div>
  );
};
