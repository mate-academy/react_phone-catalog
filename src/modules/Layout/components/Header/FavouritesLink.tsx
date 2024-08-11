import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from '../../../../app/hooks';
import { selectFavourites } from '../../../../app/features/favourites';
import { Icon } from '../../../shared/ui/Icon';
import classes from './header.module.scss';

type Props = {};

export const FavouritesLink: FC<Props> = () => {
  const { items } = useAppSelector(selectFavourites);
  const numberOfFavouriteItems = items.length;

  return (
    <NavLink
      to={'/favourites'}
      className={({ isActive }) =>
        cn(classes.header__iconLink, {
          [classes.header__iconLink_active]: isActive,
        })
      }
      title="Favourites"
    >
      <Icon.Wrapper>
        <Icon variant="heart" />
        {Boolean(numberOfFavouriteItems) && (
          <Icon.Counter>{numberOfFavouriteItems}</Icon.Counter>
        )}
      </Icon.Wrapper>
    </NavLink>
  );
};
