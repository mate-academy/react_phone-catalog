import './ProductCard.scss';
import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { BASE_URL, productCardWidth } from '../../helpers/constants';
import { Specification } from '../../types/Specification';
import { Specs } from '../Specs';
import { FavouritesContext } from '../FavouritesContextProvider';
import { Colors } from '../../types/Colors';
import { CartContext } from '../CartContextProvider';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const { pathname } = useLocation();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  const {
    name,
    price,
    fullPrice,
    image,
    screen,
    capacity,
    ram,
    itemId,
    id,
    category,
  } = product;

  const { cart, toggleCartItem } = useContext(CartContext);

  const handleAddToCartClick = useCallback(
    () => toggleCartItem(product),
    [product, toggleCartItem],
  );

  const isSelected = useMemo(() => {
    return favourites.some(favourite => favourite.id === id);
  }, [id, favourites]);

  const hasDiscount = useMemo(
    () => fullPrice > price,
    [fullPrice, price],
  );

  const specs: Specification[] = useMemo(() => {
    return [
      { name: 'Screen', text: screen },
      { name: 'Capacity', text: capacity },
      { name: 'RAM', text: ram },
    ];
  }, [screen, capacity, ram]);

  const isAddedToCart = useMemo(() => {
    return cart.some(({ id: cartId }) => cartId === id);
  }, [id, cart]);

  return (
    <li
      ref={ref}
      className="product-card"
      data-cy="cardsContainer"
      style={{ width: productCardWidth }}
    >
      <Link
        to={`/${category}/${itemId}`}
        state={pathname}
        className="product-card__content"
      >
        {inView ? (
          <img src={`${BASE_URL}/${image}`} alt="" className="product-card__img" />
        ) : (
          <div className="skeleton product-card__skeleton" />
        )}

        <h4 className="product-card__name">
          {name}
        </h4>

        <div className="product-card__prices">
          <p className="product-card__price">
            {`$${price}`}
          </p>

          {hasDiscount && (
            <p className="product-card__price product-card__price--old">
              {`$${fullPrice}`}
            </p>
          )}
        </div>

        <span className="product-card__divider" />

        <Specs specs={specs} />
      </Link>

      <div className="product-card__buttons">
        <button
          className={classNames('product-card__add-to-cart', {
            button: !isAddedToCart,
            'product-card__add-to-cart--active': isAddedToCart,
          })}
          type="button"
          onClick={handleAddToCartClick}
        >
          Add to cart
        </button>

        <button
          type="button"
          data-cy="addToFavorite"
          className="product-card__add-to-favourites"
          aria-label="add to favourite"
          onClick={() => {
            toggleFavourite(product);
          }}
        >
          {isSelected ? (
            <Icon iconType={IconType.heartSelected} color={Colors.red} />
          ) : (
            <Icon iconType={IconType.heart} />
          )}
        </button>
      </div>
    </li>
  );
};
