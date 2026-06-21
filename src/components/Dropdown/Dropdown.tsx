import styles from './Dropdown.module.scss';

interface Props {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({ id, label, options, value, onChange }: Props) => {
  return (
    <>
      <div>
        <label htmlFor={id}>{label}</label>
        <select
          value={value}
          name="dropdown"
          id={id}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
