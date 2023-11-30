import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { NavIcons } from '../NavIcons/NavIcons';
import { isLocation } from '../../helpers/pagesMethods';

import './Header.scss';

export const Header: FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);

  const [isShowSearch, setIsShowSearch] = useState(() => {
    if (isLocation(path)) {
      return Object.values(Location).includes(path);
    }

    return false;
  });

  useEffect(() => {
    setIsShowSearch(() => false);

    const newPath = location.pathname.slice(1);

    setIsShowSearch(() => {
      if (isLocation(newPath)) {
        return Object.values(Location).includes(newPath);
      }

      return false;
    });
  }, [location.pathname]);

  return (
    <div className="header">
      <div className="nav-container">
        <NavBar />
      </div>

      <div className="header__interactive">
        {isShowSearch && (
          <div className="header__search">
            {/* <Search
              placeholder={`Search in ${path}...`}
            /> */}
          </div>
        )}

        <div className="icons-container">
          <NavIcons />
        </div>
      </div>
    </div>
  );
};
