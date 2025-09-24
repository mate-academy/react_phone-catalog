import React from 'react';

type Props = {
  sort: string;
  onChange: (newSort: string) => void;
};

export const SortField: React.FC<Props> = ({ sort, onChange }) => {
  return (
    <label>
      Sort by:{' '}
      <select value={sort} onChange={e => onChange(e.target.value)}>
        <option value="Newest">Newest</option>
        <option value="Alphabetically">Alphabetically</option>
        <option value="Cheapest">Cheapest</option>
      </select>
    </label>
  );
};

