import { useFavoritesState } from '@/shared/hooks/useFavoritesState';
import { HeaderLink } from '../HeaderLink';

interface Props {
  className?: string;
}

export const FavoritesButton = ({ className }: Props) => {
  const favoritesState = useFavoritesState();

  return (
    <HeaderLink
      to={'/favorites'}
      iconURL={'img/icons/favourites.svg'}
      className={className}
      amount={favoritesState.length}
    />
  );
};
