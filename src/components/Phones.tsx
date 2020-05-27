import React, { useState } from 'react';
import Dropdown from './Dropdown/Dropdown';

const options = [
  {
    id: 1,
    value: 'price ',
    title: 'Price: Low to High',
  },
  {
    id: 2,
    value: 'name ',
    title: 'Goods: A to Z',
  },
  // {
  //   id: 3,
  //   title: 'Goods: Z to A',
  // },
  {
    id: 4,
    value: 'age ',
    title: 'Newest',
  },
  // {
  //   id: 5,
  //   title: 'Oldest',
  // },
];

const Phones = () => {
  const [dropdownOptionId, setDropdownOptionId] = useState<number>(1);

  // const [sortField, setSortField] = useState<string>('price');
  // const visiblePhones = [...options];

  // switch (sortField) {
  //   case 'price':
  //     visiblePhones.sort(
  //       (a, b) => +a[sortField] - +b[sortField],
  //     );
  //     break;

  //   case 'name':
  //     visiblePhones.sort(
  //       (a, b) => a[sortField].localeCompare(b[sortField]),
  //     );
  //     break;

  //   case 'age':
  //     visiblePhones.sort(
  //       (a, b) => a[sortField].localeCompare(b[sortField]),
  //     );
  //     break;

  //   default:
  //     visiblePhones.sort(
  //       (a, b) => a.id - b.id,
  //     );
  // }
  return (
    <>
      <h1>Phones</h1>
      <Dropdown
        options={options}
        value={dropdownOptionId}
        onChange={() => (
          setDropdownOptionId(dropdownOptionId)
        )}
      />
    </>
  );
};

export default Phones;
