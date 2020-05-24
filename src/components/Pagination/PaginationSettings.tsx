import React from 'react';

type Props = {
  perPage: number,
  setPerPage: (value: number) => void,
}

const perPageOptions = [5, 10, 15, 20];

export const PaginationSettings: React.FC<Props> = ({ perPage, setPerPage }) => (
  <div className="pagination-setting">
    <div className="select is-info  is-small">
      <select
        value={perPage}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPerPage(Number(e.target.value))}
      >
        {perPageOptions.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
);
