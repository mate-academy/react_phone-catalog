import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import favorite from '../../imgs/Favourites (Heart Like).svg';
import favoriteFilled
  from '../../imgs/icons/Favourites Filled (Heart Like).svg';

import { addFavorites, deleteFavorite } from '../../Reducer/favoritesReducer';
import { Phone } from '../../type/Phone';

import './button.scss';

type Props = {
  phone: Phone;
};

export const FavButton: React.FC<Props> = ({ phone }) => {
  const [isFav, setIsFav] = useState(false);

  const favs = useSelector((state: any) => state.favorites);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsFav(favs.some((fav: Phone) => fav.itemId === phone.itemId));
  }, [favs]);

  const handler = (product: Phone) => {
    if (isFav) {
      dispatch(deleteFavorite(product.id));
    } else {
      dispatch(addFavorites(product));
    }
  };

  return (
    <button
      type="button"
      className="button button__fav"
      onClick={() => handler(phone)}
    >
      <img src={isFav ? favoriteFilled : favorite} alt="" />
    </button>
  );
};
