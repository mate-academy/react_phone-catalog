import { useContext } from 'react';
import IconButton from '../IconButton/IconButton';
import FavoriteContext from '../../Contexts/FavoriteContext';

type Props = {
  variant: 'header' | 'mobileMenu';
};

export const FavoritesIcon: React.FC<Props> = ({ variant }) => {
  const { favoritesItems } = useContext(FavoriteContext);
  const favoritesItemsLength = favoritesItems.length;

  return (
    <IconButton
      variant={variant}
      badgeCount={favoritesItemsLength}
      path={'/favorite'}
      icon={'/img/icons/heart-Icon.svg'}
      descriptions={'Favorites'}
    />
  );
};

export default FavoritesIcon;
