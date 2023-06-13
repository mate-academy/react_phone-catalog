/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { CartedProduct } from '../CartContext';

type Props = {
  product: Product | null;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartedProducts, setCartedProducts } = useContext(CartedProduct);
  const { favProducts, setFavProducts } = useContext(CartedProduct);

  const [isSelectedCart, setSelectedCart] = useState(
    cartedProducts.some(
      (pr: Product) => pr.itemId === product?.itemId,
    ),
  );
  const [isSelectedFav, setSelectedFav] = useState(
    favProducts.some(
      (pr: Product) => pr.itemId === product?.itemId,
    ),
  );

  const toggleCartedProduct = () => {
    if (!isSelectedCart && product) {
      window.localStorage.setItem('cartedProducts', JSON.stringify(
        [...cartedProducts, { ...product, count: 1 }],
      ));

      setCartedProducts([...cartedProducts, { ...product, count: 1 }]);
    } else {
      const arr = cartedProducts.filter(
        (pr: Product) => pr.itemId !== product?.itemId,
      );

      window.localStorage.setItem(
        'cartedProducts', JSON.stringify(arr),
      );
      setCartedProducts(arr);
    }

    setSelectedCart(!isSelectedCart);
  };

  const toggleFavProduct = () => {
    if (!isSelectedFav && product) {
      window.localStorage.setItem('favProducts', JSON.stringify(
        [...favProducts, { ...product, count: 1 }],
      ));

      setFavProducts([...favProducts, { ...product, count: 1 }]);
    } else {
      const arr = favProducts.filter(
        (pr: Product) => pr.itemId !== product?.itemId,
      );

      window.localStorage.setItem(
        'favProducts', JSON.stringify(arr),
      );
      setFavProducts(arr);
    }

    setSelectedFav(!isSelectedFav);
  };

  return (
    <div
      className="product-card"
    >
      <Link to={`../${product?.category}/${product?.itemId}`} className="product-card__picture">
        <img
          className="product-card__img"
          src={product?.image}
          alt={product?.name}
        />
      </Link>

      <Link to={`../${product?.category}/${product?.itemId}`} className="product-card__title">
        {product?.name}
      </Link>

      <div className="product-card__info main-product-details">
        <p className="main-product-details__price">
          ${product?.price}
          <span className="main-product-details__sale">
            ${product?.fullPrice}
          </span>
        </p>

        <ul className="main-product-details__characteristics-container">
          <li className="main-product-details__characteristic">
            Screen
            <span className="main-product-details__characteristic-value">
              {product?.screen}
            </span>
          </li>

          <li className="main-product-details__characteristic">
            Capacity
            <span className="main-product-details__characteristic-value">
              {product?.capacity}
            </span>
          </li>

          <li className="main-product-details__characteristic">
            RAM
            <span className="main-product-details__characteristic-value">
              {product?.ram}
            </span>
          </li>
        </ul>

        <div className="main-product-details__buttons">
          <button
            type="button"
            className={classNames(
              'main-product-details__add-to-cart',
              'icon-button',
              { 'main-product-details--is-selected-cart': isSelectedCart },
            )}
            onClick={toggleCartedProduct}
          >
            {isSelectedCart ? 'Selected' : 'Add to cart'}
          </button>
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'main-product-details__add-to-favorites',
              'icon-button',
              { 'main-product-details--is-selected-fav': isSelectedFav },
            )}
            onClick={toggleFavProduct}
          />
        </div>
      </div>
    </div>
  );
};
