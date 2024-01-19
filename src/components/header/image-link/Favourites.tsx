import { FAVORITES_LINK } from '../../../helpers/constants/Links';
import { ImageLink } from './ImageLink';

type FavoritesProps = {
  count?: number
};

export const Favourites = ({ count = -1 }: FavoritesProps) => (
  <ImageLink
    alternativeName="Favourites"
    imageSource="img/header/favourites.svg"
    link={FAVORITES_LINK}
    itemsCount={count}
  />
);

Favourites.defaultProps = {
  count: -1,
};
