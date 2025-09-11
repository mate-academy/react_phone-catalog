import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropDown.module.scss';

interface DDOpt {
  value: string;
  label?: string;
}

interface DDProps {
  onChange: (option: DDOpt) => void;
}

const sort = [
  { value: 'newest', label: 'Newest' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'alphabetically', label: 'Alphabetically' },
];

const num = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const defSort = sort[0];
const defNum = num[1];

export function DDSortBy({ onChange }: DDProps) {
  return (
    <Dropdown
      options={sort}
      value={defSort}
      onChange={option => onChange({ value: option.value })}
    />
  );
}

export function DDNum({ onChange }: DDProps) {
  return (
    <Dropdown
      options={num}
      value={defNum}
      onChange={option => onChange({ value: option.value })}
    />
  );
}
