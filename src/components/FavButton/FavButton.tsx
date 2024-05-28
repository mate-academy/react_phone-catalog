import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {actions as favoriteActions} from "../../features/favoriteSlice";

import {Product} from "../../types/Product";

type Props = {
  price?: number;
  capacity?: string;
  color?: string;
  product: Product | null;
};

export const FavButton: React.FC<Props> = ({
  product,
  color,
  capacity,
  price,
}) => {
  const {id} = product || {};

  const favorites = useAppSelector(state => state.favorite.favorite);
  const dispatch = useAppDispatch();

  const [isFavorited, setIsFavorited] = React.useState(
    favorites.some(
      item =>
        item.id === id && item.color === color && item.capacity === capacity,
    ),
  );

  useEffect(() => {
    setIsFavorited(
      favorites.some(
        item =>
          item.id === id && item.color === color && item.capacity === capacity,
      ),
    );
  }, [favorites, id, color, capacity]);

  const favImgRef = React.useRef<HTMLImageElement>(null);

  const handleMouseOver = () => {
    if (favImgRef.current && !isFavorited) {
      favImgRef.current.style.opacity = "0";

      setTimeout(() => {
        if (favImgRef.current && !isFavorited) {
          favImgRef.current.src = "/img/card/icons/fav_like.svg";
          favImgRef.current.style.opacity = "1";
        }
      }, 200);
    }
  };

  const handleMouseOut = () => {
    if (favImgRef.current && !isFavorited) {
      favImgRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      if (favImgRef.current && !isFavorited) {
        favImgRef.current.src = "/img/card/icons/fav.svg";
        favImgRef.current.style.opacity = "1";
      }
    }, 200);
  };

  const handleAddToFav = (
    e: React.MouseEvent<HTMLButtonElement>,
    localProduct: Product | null,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (localProduct && color && capacity && price) {
      dispatch(
        favoriteActions.add({
          ...localProduct,
          color: color,
          capacity: capacity,
          price: price,
        }),
      );
    } else if (localProduct) {
      dispatch(favoriteActions.add(localProduct));
    }

    return;
  };

  return (
    <button
      className="fav__button"
      onClick={e => {
        handleAddToFav(e, product);
        setIsFavorited(!isFavorited);
      }}
      onMouseOver={() => handleMouseOver()}
      onMouseOut={() => handleMouseOut()}
    >
      <img
        ref={favImgRef}
        className="card__bottom__fav__img"
        src={
          isFavorited
            ? "/img/card/icons/fav_like.svg"
            : "/img/card/icons/fav.svg"
        }
        alt="heart"
      />
    </button>
  );
};
