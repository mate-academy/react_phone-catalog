import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getAllAccessories } from '../../api/api';
import { ProductsList } from '../../components/ProductsList';
import { NoResults } from '../../components/NoResults';

import './AccessoriesPage.scss';
import { SearchList } from '../../components/SearchList';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  const setActive = (
    { isActive }: { isActive: boolean },
  ) => (isActive ? 'PageNav__link PageNav__link--isActive' : 'PageNav__link');

  useEffect(() => {
    ((async () => {
      const allAccessoriesFromServer = await getAllAccessories();

      setAccessories(allAccessoriesFromServer);
    }))();
  }, []);

  return (
    <div className="AccessoriesPage container">
      {
        search.length <= 0
          ? (
            <>
              <div className="PageNav__nav">
                <NavLink className="PageNav__link" to="/">
                  <i className="icon-Home PageNav__icon" />
                </NavLink>
                <i className="icon-Chevron-Arrow-Right PageNav__arrow" />
                <NavLink
                  to="/accessories"
                  className={setActive}
                >
                  Accessory
                </NavLink>
              </div>
              <h2 className="AccessoriesPage__title">Accessories</h2>
              <span
                className="AccessoriesPage__subTitle"
              >
                {accessories.length}
                {' '}
                models
              </span>
              {accessories.length !== 0
                ? <ProductsList devices={accessories} />
                : <NoResults title="Accessories" />}
            </>
          )
          : <SearchList devices={accessories} />
      }
    </div>
  );
};
