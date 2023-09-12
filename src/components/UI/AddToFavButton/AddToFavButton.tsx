import { useContext } from 'react';
import './add-to-fav-button.scss';
import { StoreContext } from '../../../contexts/StoreContext';

type Props = {
  id: string;
};

export const AddToFavButton: React.FC<Props> = ({ id }) => {
  const { favouriteIds, changeFavourites } = useContext(StoreContext);
  const isInFavourites = favouriteIds.some(favId => favId === id);

  return (
    <button
      type="button"
      className="add-to-fav"
      onClick={() => {
        changeFavourites(id);
      }}
    >
      <img
        src={`./img/icons/Favourites${isInFavourites ? 'Red' : ''}.svg`}
        alt="Add to favourites"
        className="add-to-fav__image"
      />
      {/* 1 */}
    </button>
  );
};
