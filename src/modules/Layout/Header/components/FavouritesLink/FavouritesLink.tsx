import React, { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import {
  useFavourites,
  selectFavourites,
} from '../../../../../app/features/favourites';
import { Icon } from '../../../../shared/ui/Icon';

type Props = Exclude<NavLinkProps, 'children'>;

export const FavouritesLink: FC<Props> = props => {
  const [favourites] = useFavourites(selectFavourites);
  const numberOfFavouriteItems = favourites.length;

  return (
    <NavLink {...props} title="Favourites">
      <Icon.Wrapper>
        <Icon variant="heart" />
        {Boolean(numberOfFavouriteItems) && (
          <Icon.Counter>{numberOfFavouriteItems}</Icon.Counter>
        )}
      </Icon.Wrapper>
    </NavLink>
  );
};
