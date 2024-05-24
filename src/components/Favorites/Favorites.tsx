import { useContext } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { GlobalContext } from '../../GlobalContext';
import { Icon } from '../Icon';
import { IconList } from '../Icon/styles/IconList';

import classes from './Favorites.module.scss';

type Props = {
  onClick?: () => void;
};

export const Favorites: React.FC<Props> = ({ onClick }) => {
  const { favourites } = useContext(GlobalContext);

  const activeClass = ({ isActive }: { isActive: boolean }) => {
    return classNames([classes.Favorites], { [classes.active]: isActive });
  };

  return (
    <NavLink className={activeClass} to="/favorites">
      <button type="button" onClick={onClick}>
        <Icon icon={IconList.favorites} counter={favourites.length} />
      </button>
    </NavLink>
  );
};
