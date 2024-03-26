import React, { useState, useContext } from 'react';
import cn from 'classnames';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { LSCart } from '../../helpers/LSCart';
import { CartContext } from '../../store/CartContext';
import { LSFav } from '../../helpers/LSFav';
import { FavContext } from '../../store/FavContext';

type Props = {
  item: Product;
  setFavorites?: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductCard: React.FC<Props> = ({ item, setFavorites }) => {
  const [productInCart, setProductInCart] = useState(
    LSCart.checkProductInLSCart(item.id),
  );
  const [favProduct, setFavProduct] = useState(LSFav.checkLSFav(item.id));

  const { setCartQuantity } = useContext(CartContext);
  const { setFavQuantity } = useContext(FavContext);

  const cartBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (LSCart.checkProductInLSCart(item.id)) {
      setCartQuantity(prev => prev - 1);
      LSCart.removeProductFromLSCart(item);
      setProductInCart(false);
    } else {
      setCartQuantity(prev => prev + 1);
      LSCart.addToLSCart(item);
      setProductInCart(true);
    }
  };

  const favBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (LSFav.checkLSFav(item.id)) {
      setFavQuantity(prev => prev - 1);

      if (setFavorites) {
        setFavorites(prev => prev.filter(el => el.id !== item.id));
      }
    } else {
      setFavQuantity(prev => prev + 1);
    }

    setFavProduct(prev => !prev);
    LSFav.addToLSFav(item);
  };

  return (
    <Link to={`/product/${item.itemId}`} data-cy="cardsContainer">
      <div className="catalog-item__top">
        <img
          src={`../_new/${item.image}`}
          alt={item.name}
          className="catalog-item__img"
        />
      </div>

      <p className="catalog-item--title">{item.name}</p>
      <div className="catalog-item--price-row">
        <span className="catalog-item--new-price">${item.price}</span>
        {item.fullPrice !== item.price && (
          <span className="catalog-item--old-price">${item.fullPrice}</span>
        )}
      </div>
      <ul className="catalog-item--params">
        <li className="catalog-item--params-item params-item">
          <span className="params-item--title">Screen</span>
          <span className="params-item--value">{item.screen}</span>
        </li>
        <li className="catalog-item--params-item params-item">
          <span className="params-item--title">Capacity</span>
          <span className="params-item--value">{item.capacity}</span>
        </li>
        <li className="catalog-item--params-item params-item">
          <span className="params-item--title">RAM</span>
          <span className="params-item--value">{item.ram}</span>
        </li>
      </ul>
      <div className="catalog-item--buttons">
        <button
          type="button"
          className={cn({
            'catalog-item--cart-btn-empty': !productInCart,
            'catalog-item--cart-btn': productInCart,
          })}
          onClick={cartBtnHandler}
        >
          {productInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={cn('catalog-item--fav-btn', {
            'catalog-item--fav-btn--active': favProduct,
          })}
          onClick={favBtnHandler}
          data-cy="addToFavorite"
        >
          fav
        </button>
      </div>
    </Link>
  );
};
