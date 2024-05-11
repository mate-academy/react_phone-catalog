import React, { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Icon } from '../../../../shared/ui/Icon';

type Props = Exclude<NavLinkProps, 'children'>;

export const FavouritesLink: FC<Props> = props => {
  const numberOfFavouriteItems = 4;

  return (
    <NavLink {...props} title="Favourites">
      <Icon.Wrapper>
        <Icon variant="heart" />
        {numberOfFavouriteItems && (
          <Icon.Counter>{numberOfFavouriteItems}</Icon.Counter>
        )}
      </Icon.Wrapper>
    </NavLink>
  );
};
