import React from 'react'
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Newest', value: 'age' },
  { key: 2, text: 'Alphabetically', value: 'name' },
  { key: 3, text: 'Cheapest', value: 'price' },
];

const DropdownMenu = () => (
  <Dropdown clearable options={options} selection />
)


export default DropdownMenu;
