import React, { useContext, useEffect, useState } from 'react';
import './Favorites.scss';
import { NavLink } from 'react-router-dom';
import { classNameFunc } from '../../helpers/utils/classNameFunc';
import { getLocalStorage } from '../../helpers/utils/getLocalStorage';
import { MenuContext } from '../../helpers/utils/menuContext';

type Props = {};

const BASE_CLASS = 'favorites__link';

export const Favorites: React.FC<Props> = () => {
  const { setHasMenu } = useContext(MenuContext);

  const [count, setCount] = useState(0);

  const handlerStorage = () => {
    const newCount = getLocalStorage<string[]>('favorites')?.length;

    if (newCount) {
      setCount(newCount);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handlerStorage);

    handlerStorage();

    return () => window.removeEventListener('storage', handlerStorage);
  }, []);

  return (
    <div className="favorites">
      <NavLink
        to="/favorites"
        className={ob => classNameFunc(ob, BASE_CLASS, false)}
        onClick={() => setHasMenu(false)}
      />
      {count > 0 && <span className="favorites__count">{count}</span>}
    </div>
  );
};
