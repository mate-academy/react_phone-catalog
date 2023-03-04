import './Input.scss';

type Props = {
  type: string,
  name: string,
  id: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
};

export const Input:React.FC<Props> = ({
  type, name, id, value, onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className="input"
      required
    />
  );
};
