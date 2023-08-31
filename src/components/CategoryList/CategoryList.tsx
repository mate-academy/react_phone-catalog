import { useEffect, useState } from 'react';
import { CategoryLink } from './CategoryLink';
import { fetchAccessories, fetchPhones, fetchTablets } from '../../api';

import './CategoryList.scss';

export const CategoryList = () => {
  const [phonesAmount, setPhonesAmount] = useState(0);
  const [tabletsAmount, setTabletsAmount] = useState(0);
  const [accessoriesAmount, setAccessoriesAmount] = useState(0);

  useEffect(() => {
    fetchPhones().then((res) => setPhonesAmount(res.length));
    fetchTablets().then((res) => setTabletsAmount(res.length));
    fetchAccessories().then((res) => setAccessoriesAmount(res.length));
  }, []);

  return (
    <div className="CategoryList">
      <h2 className="CategoryList__title">Shop by category</h2>

      <div
        className="CategoryList__links"
        data-cy="categoryLinksContainer"
      >
        <CategoryLink
          type="phones"
          amount={phonesAmount}
        />
        <CategoryLink
          type="tablets"
          amount={tabletsAmount}

        />
        <CategoryLink
          type="accessories"
          amount={accessoriesAmount}
        />
      </div>
    </div>
  );
};
