import { useState } from 'react';
import { Dropdown } from '../Dropdown';

/**
 * Приклад використання компонента Dropdown
 */
export const DropdownExample = () => {
  const [sortBy, setSortBy] = useState<string | number>('newest');
  const [itemsPerPage, setItemsPerPage] = useState<string | number>(12);
  const [category, setCategory] = useState<string | number>('all');

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'cheapest', label: 'Cheapest first' },
    { value: 'expensive', label: 'Most expensive' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  const itemsPerPageOptions = [
    { value: 12, label: '12 items' },
    { value: 24, label: '24 items' },
    { value: 48, label: '48 items' },
    { value: 96, label: '96 items' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All categories' },
    { value: 'phones', label: 'Phones' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'accessories', label: 'Accessories' },
  ];

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div>
        <Dropdown
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Select sorting"
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: {sortBy}
        </p>
      </div>

      <div>
        <Dropdown
          label="Items per page"
          options={itemsPerPageOptions}
          value={itemsPerPage}
          onChange={setItemsPerPage}
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: {itemsPerPage}
        </p>
      </div>

      <div>
        <Dropdown
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          placeholder="Select category"
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: {category}
        </p>
      </div>

      <div>
        <Dropdown
          label="Disabled"
          options={sortOptions}
          value=""
          onChange={() => { }}
          placeholder="Disabled dropdown"
          disabled
        />
      </div>

      <div>
        <Dropdown
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Without label"
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Example without label
        </p>
      </div>
    </div>
  );
};
