import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { getAllTablets } from '../../api/api';
import { ProductsList } from '../../components/ProductsList';

import { NoResults } from '../../components/NoResults';

import './TabletsPage.scss';
import '../../styles/PageNav.scss';
import { SearchList } from '../../components/SearchList';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  const setActive = (
    { isActive }: { isActive: boolean },
  ) => (isActive ? 'PageNav__link PageNav__link--isActive' : 'PageNav__link');

  useEffect(() => {
    ((async () => {
      const allTabletsFromServer = await getAllTablets();

      setTablets(allTabletsFromServer);
    }))();
  }, []);

  return (
    <div className="TabletsPage container">
      {
        search.length <= 0
          ? (
            <>
              <div className="PageNav__nav">
                <NavLink className="PageNav__link" to="/">
                  <i className="icon-Home PageNav__icon" />
                </NavLink>
                <i className="icon-Chevron-Arrow-Right PageNav__arrow" />
                <NavLink to="/tablets" className={setActive}>Tablets</NavLink>
              </div>
              <h2 className="TabletsPage__title">Tablets</h2>
              <span
                className="TabletsPage__subTitle"
              >
                {tablets.length}
                {' '}
                models
              </span>
              {tablets.length !== 0
                ? <ProductsList devices={tablets} />
                : <NoResults title="Tablets" />}
            </>
          )
          : <SearchList devices={tablets} />
      }

    </div>
  );
};
