import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropDown.scss';

interface DDOpt {
  value: string;
  label?: string;
}

interface DDProps {
  onChange: (option: DDOpt) => void;
  value: string;
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

export function DDSortBy({ onChange, value }: DDProps) {
  return (
    <Dropdown
      options={sort}
      value={
        sort.find(opt => opt.value.toLowerCase() === value.toLowerCase()) ||
        sort[0]
      }
      onChange={option => onChange({ value: option.value })}
    />
  );
}

export function DDNum({ onChange, value }: DDProps) {
  return (
    <Dropdown
      options={num}
      value={num.find(opt => opt.value === value) || num[1]}
      onChange={option => onChange({ value: option.value })}
    />
  );
}
