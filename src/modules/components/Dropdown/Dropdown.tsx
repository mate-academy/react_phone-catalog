import './Dropdown.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const Dropdown = ({ label, value, options, onChange }: Props) => {
  return (
    <div className="dropdown">
      <label className="dropdown__label">{label}</label>
      <select
        className="dropdown__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
