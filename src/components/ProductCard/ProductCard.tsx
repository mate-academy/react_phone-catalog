/* eslint-disable jsx-a11y/control-has-associated-label */
import './ProductCard.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { CartContext } from '../CartContext';
import { FavoritesContext } from '../FavoritesContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { favoritesProducts, setFavoritesProducts } =
    useContext(FavoritesContext);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const addCartButton = () => {
    setCartProducts(prewArr => {
      const productIndex = prewArr.findIndex(pArr => pArr[0].id === product.id);

      if (productIndex !== -1) {
        const updatedProducts: [Product, number][] = prewArr.map(
          (pArr, index) => {
            if (index === productIndex) {
              return [pArr[0], pArr[1] + 1];
            }

            return pArr;
          },
        );

        return updatedProducts;
      }

      return [...prewArr, [product, 1]];
    });
  };

  const likeProductCart = () => {
    setFavoritesProducts(prewArr => {
      const productIndex = prewArr.findIndex(pArr => pArr.id === product.id);

      if (productIndex !== -1) {
        setIsActive(false);

        return prewArr.filter(pArr => pArr.id !== product.id);
      }

      return [...prewArr, product];
    });
  };

  useEffect(() => {
    const sss = cartProducts.find(
      cartProduct => cartProduct[0].id === product.id,
    );

    if (sss) {
      setIsDisabled(true);
    }
  }, [cartProducts]);

  useEffect(() => {
    const sss = favoritesProducts.find(
      favoriteProduct => favoriteProduct.id === product.id,
    );

    if (sss) {
      setIsActive(true);
    }
  }, [favoritesProducts]);

  return (
    <div className="productCard" data-cy="cardsContainer">
      <Link
        to={`/${product.category}/${product.phoneId}`}
        className="productCard__picture"
      >
        <img
          className="productCard__image"
          src={`${product.image}`}
          alt={`${product.name}`}
        />
      </Link>

      <p className="productCard__title">{`${product.name} (iMT9G2FS/A)`}</p>

      <div className="productCard__prices">
        <p className="productCard__price">{`$${product.price}`}</p>
        <p className="productCard__price productCard__price--discount">{`$${product.fullPrice}`}</p>
      </div>

      <div className="productCard__line" />

      <div className="productCard__information">
        <div className="productCard__block">
          <p className="productCard__text">Screen</p>
          <p className="productCard__text productCard__text--second">
            {product.screen}
          </p>
        </div>

        <div className="productCard__block">
          <p className="productCard__text">Capacity</p>
          <p className="productCard__text productCard__text--second">
            {product.capacity}
          </p>
        </div>

        <div className="productCard__block">
          <p className="productCard__text">RAM</p>
          <p className="productCard__text productCard__text--second">
            {product.ram}
          </p>
        </div>
      </div>

      <div className="productCard__buttons">
        <button
          disabled={isDisabled}
          className="button productCard__button"
          type="button"
          onClick={addCartButton}
        >
          {(isDisabled && 'Added to cart') || 'Add to cart'}
        </button>

        <button
          data-cy="addToFavorite"
          className={classNames('productCard__favorites', {
            'productCart__favorites--active': isActive,
          })}
          type="button"
          onClick={likeProductCart}
        >
          <div
            className={classNames('icon', 'icon--favorites', {
              'icon--favorites--active': isActive,
            })}
          />
        </button>
      </div>
    </div>
  );
};
