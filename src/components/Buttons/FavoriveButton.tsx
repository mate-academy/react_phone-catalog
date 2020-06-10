import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavourites } from '../../store/favourites';
import { getFavourites } from '../../store/index';

type Props = {
  item: Products;
  className: string;
};


export const FavoriteButton: React.FC<Props> = ({ item, className }) => {
  const dispatch = useDispatch();
  const favourites = useSelector(getFavourites);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const handleClick = (product: Products) => {
    dispatch(setFavourites(product));
  };

  useMemo(() => {
    setIsFavourite(favourites
      .some((favouriteProduct: Products) => favouriteProduct.id === item.id));
  }, [favourites, item.id]);


  return (
    <button
      onClick={() => handleClick(item)}
      type="button"
      className={className}
    >
      <img
        src={isFavourite ? './img/active_heart.svg' : './img/heart.svg'}
        alt="heart_icon"
        className="PhoneCard__favorits-image"
      />
    </button>
  );
};
