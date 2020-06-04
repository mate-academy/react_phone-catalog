import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './ItemsOnPage.scss';

type Props = {
  countPhones: number;
};

const ItemsOnPage: React.FC<Props> = ({ countPhones }) => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const perPage: number = Number(searchParams.get('perPage')) || countPhones;

  return (
    <div className="select-for-page">
      <span className="select-for-page__text">Items on page</span>
      <img src="./img/ArrowRight.svg" alt="arrow" className="select-for-page__svg" />
      <select
        className="select-for-page__option"
        value={perPage}
        onChange={(event) => {
          const target = event.target as HTMLSelectElement;

          searchParams.set('perPage', target.value);
          history.push({
            search: searchParams.toString(),
          });
          if (countPhones === Number(target.value)) {
            searchParams.set('page', '1');
            history.push({
              search: searchParams.toString(),
            });
          }
        }}
      >
        <option value={countPhones}>All</option>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={16}>16</option>
      </select>
    </div>
  );
};

export default ItemsOnPage;
