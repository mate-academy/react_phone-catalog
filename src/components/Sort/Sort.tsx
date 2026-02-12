import { FC } from 'react';
import Select from 'react-select';
import './Sort.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  title: string;
  option: Option[];
  onChange: (selectedOption: Option | null) => void;
  value: string | number;
};

const Sort: FC<Props> = ({ title, option, onChange, value }) => {
  const getValue = () => {
    return option.find(opt => opt.value === value) || null;
  };

  return (
    <div className="sort">
      <h1 className="sort-title">{title}</h1>

      <Select
        classNamePrefix="sort-select"
        onChange={onChange}
        value={getValue()}
        options={option}
      />
    </div>
  );
};

export default Sort;
