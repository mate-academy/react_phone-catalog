import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Product } from '../../helpers/types/Product';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { useAppSelector } from '../../helpers/hooks/hooks';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../../store/slices/favSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/ButtonType';
import './ProductCard.scss';

type Props = {
  product: Product;
  transform?: string;
  type: ProductsCardType;
};

export const ProductCard: React.FC<Props> = ({ product, transform, type }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const { favorites } = useAppSelector((state) => state.favorites);
  const { cartItems } = useAppSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const hasInFavorites = useMemo(() => {
    return favorites.some((fav) => fav.id === product.id);
  }, [favorites, product]);

  const hasInCart = useMemo(() => {
    return cartItems.some((item) => item.id === product.id);
  }, [cartItems, product]);

  const handleFavoritesChange = useCallback(() => {
    if (hasInFavorites) {
      dispatch(deleteFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  }, [hasInFavorites]);

  const handleCartItemsChange = useCallback(
    (prod: Product) => {
      if (hasInCart) {
        return;
      }

      dispatch(addToCart(prod));
    },
    [hasInCart],
  );

  return (
    <div className="productCard" data-cy="cardsContainer" style={{ transform }}>
      <div className="productCard__container">
        <Link to={`/${category}/${itemId}`}>
          <img
            src={`_new/${image}`}
            alt={name}
            className="productCard__image"
          />

          <h3 className="productCard__title">{name}</h3>
        </Link>

        <div className="productCard__price">
          {type === ProductsCardType.DISCOUNT ? (
            <>
              <span className="productCard__price-main">{`$${price}`}</span>
              <span className="productCard__price-discount">
                {`$${fullPrice}`}
              </span>
            </>
          ) : (
            <span className="productCard__price-main">{`$${fullPrice}`}</span>
          )}
        </div>

        <ul className="productCard__info">
          <li className="productCard__text">
            <span className="productCard__text-title">Screen</span>
            <span className="productCard__text-value">{screen}</span>
          </li>

          <li className="productCard__text">
            <span className="productCard__text-title">Capacity</span>
            <span className="productCard__text-value">{capacity}</span>
          </li>

          <li className="productCard__text">
            <span className="productCard__text-title">RAM</span>
            <span className="productCard__text-value">{ram}</span>
          </li>
        </ul>

        <div className="productCard__buttons">
          <Button
            content={ButtonType.TEXT}
            onClick={() => handleCartItemsChange(product)}
            className={cn({ active: hasInCart })}
            disabled={hasInCart}
          >
            {hasInCart ? 'Added to cart' : 'Add to cart'}
          </Button>

          <Button
            content={ButtonType.FAVORITES}
            data-cy="addToFavorite"
            onClick={handleFavoritesChange}
            className={cn({ active: hasInFavorites })}
          />
        </div>
      </div>
    </div>
  );
};
