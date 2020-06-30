import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getFavorites } from '../../store';
import { setProduct, removeProduct } from '../../store/favorites';
import './Buttons.scss';

type Props = {
  product: Product;
};

const FavoriteButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favoritesProducts = useSelector(getFavorites);

  const addToFavorites = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      dispatch(setProduct(product));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  const isInFavorites = useMemo(() => (
    favoritesProducts.some(favoritesProduct => favoritesProduct.id === product.id)
  ), [favoritesProducts, product.id]);

  return (

    <label
      className={classNames('Button__favorites',
        {
          Button__InFavorites: isInFavorites,
        })}
      htmlFor={`${product.id}`}
    >

      <input
        type="checkbox"
        id={`${product.id}`}
        checked={isInFavorites}
        className="Button__checkBox"
        onChange={(event) => addToFavorites(event)}
      />

    </label>

  );
};

export default FavoriteButton;
