import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCategories } from '../../types/ProductCategories';
import './Header.scss';
import { SearchField } from '../SearchField';

type Props = {
  menuShow: boolean;
  setMenuShown: (menuIsShown: boolean) => void;
};

export const Header: React.FC<Props> = ({ menuShow, setMenuShown }) => {
  const location = useLocation();
  const [searchIsShown, setSearchIsShown] = useState(false);

  const checkIfSearchShow = () => {
    const category = location.pathname.slice(1);

    setSearchIsShown(false);

    if (
      category === ProductCategories.PHONES ||
      category === ProductCategories.ACCESSORIES ||
      category === ProductCategories.TABLETS
    ) {
      setSearchIsShown(true);
    }
  };

  useEffect(() => {
    checkIfSearchShow();
  }, [location]);

  return (
    <header className="header" id="header">
      <Logo placement={'header'} />

      <div className="header__search-wrapper">
        <SearchField searchIsShown={searchIsShown} />
      </div>

      <div className="header__navigation">
        <Navigation searchIsShown={searchIsShown} />
      </div>

      <div className="header__buttons">
        {menuShow ? (
          <button
            className="header__button header__button--close"
            onClick={() => setMenuShown(false)}
          />
        ) : (
          <button
            className="header__button header__button--menu"
            onClick={() => setMenuShown(true)}
          />
        )}
      </div>
    </header>
  );
};
