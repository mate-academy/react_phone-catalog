import { useLocation } from 'react-router-dom';
import { useEffect, memo, useState } from 'react';
import { useDiviceSize } from '../utils/useDeviceSize/useDiviceSize';
import {
  Nav,
  TopActions,
  Logo,
  Search,
} from './index';

import { categories } from '../utils/listsNames';

export const Header = memo(() => {
  const { pathname } = useLocation();
  const headerItemsName = ['home', ...categories];
  const showSearch = pathname === '/favourites' || pathname === '/phones';
  const { device } = useDiviceSize();
  const [shift, setShift] = useState(-700);

  useEffect(() => {
    const Id = () => window.scrollTo(0, 0);

    if (!shift) {
      window.addEventListener('scroll', Id);
    }

    // eslint-disable-next-line no-restricted-globals
    return () => removeEventListener('scroll', Id);
  }, [shift]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setShift(-700);
  }, [pathname]);

  const handlerShowMenu = () => {
    setShift(shift ? 0 : -700);
  };

  return (
    <header className="header">
      <div
        className="header__wrap-left"
        style={{ left: shift }}
        onScroll={(e) => e.preventDefault()}
      >
        {device !== 'phone' && <Logo />}
        <Nav items={headerItemsName} />
      </div>

      {device === 'phone' && (
        <div
          className="header__wrap-left--mobile"
        >
          <Logo />
          <button
            type="button"
            onClick={handlerShowMenu}
            className="header__wrap-left--show-menu"
          >
            <img
              src={`assests/images/${shift ? 'Menu.png' : 'Close.svg'}`}
              alt="menu icon"
              width={20}
            />
          </button>

        </div>
      )}

      <div className="header__wrap--right">
        {showSearch && shift !== 0 && <Search pathName={pathname.slice(1)} />}
        <TopActions />
      </div>
    </header>
  );
});
