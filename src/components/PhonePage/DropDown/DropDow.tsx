import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropDow.scss';

const sortby = ['Newest', 'Alphabetically', 'Cheapest'];
const items = ['4', '8', '16', 'all'];

const defaultOption = sortby[0];
const defaltItems = items[1];

export function MyDropdownSortBy() {
  return <Dropdown options={sortby} value={defaultOption} />;
}

export function MyDropdownItems() {
  return <Dropdown options={items} value={defaltItems} />;
}
