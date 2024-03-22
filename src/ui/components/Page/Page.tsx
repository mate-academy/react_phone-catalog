import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

import './Page.scss';

type Props = {};

export const Page: React.FC<Props> = () => {
  const [isShowHeaderSearch, setIsShowHeaderSearch] = useState<boolean>(false);
  const [isShowHeaderFav, setIsShowHeaderFav] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      const currentLocation = location.pathname.replace('/', '');

      switch (currentLocation) {
        case 'phones':
        case 'tablets':
        case 'accessories':
        case 'favorites':
          setIsShowHeaderSearch(true);
          setIsShowHeaderFav(true);
          break;
        default:
          setIsShowHeaderSearch(false);
          setIsShowHeaderFav(true);
      }
    }
  }, [location]);

  return (
    <div className="page">
      <Header
        isShowFav={isShowHeaderFav}
        isShowSearch={isShowHeaderSearch}
        location={location.pathname.replace('/', '')}
      />
      <div className="main">
        <div className="container main__container test">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
