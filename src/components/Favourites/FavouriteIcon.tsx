import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IconWithCounter } from '../IconWithCounter';

export const FavouriteIcon = () => {
  const count = useSelector(
    (state: RootState) => state.favourites.items.length,
  );

  return (
    <IconWithCounter
      iconSrc="icons/favourites.svg"
      alt="favourites"
      count={count}
    />
  );
};
