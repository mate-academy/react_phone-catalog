import './ProductCard.scss';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Product } from '../../types/Product';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add as addToCart } from '../../features/cart/cartSlice';
import {
  add as addToFavourites,
  remove as removeFavourite,
} from '../../features/favourites/favouritesSlice';
import { isItemIncluded } from '../../helpers/isItemIncluded';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    type,
    price,
    discount,
    screen,
    capacity,
    ram,
    imageUrl,
  } = product;

  const cart = useAppSelector(state => state.cart);
  const favourites = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();

  const sellPrice = useMemo(() => {
    return calculateDiscount(product);
  }, []);
  const itemPath = `/${type}s/${id}`;

  const isItemInCart = useMemo(() => {
    return isItemIncluded(cart, id);
  }, [cart]);

  const isItemInFavourites = useMemo(() => {
    return isItemIncluded(favourites, id);
  }, [favourites]);

  const onAddToCart = () => {
    if (isItemInCart) {
      return;
    }

    dispatch(addToCart(product));
  };

  const onAddToFavourites = () => {
    if (isItemInFavourites) {
      dispatch(removeFavourite(id));

      return;
    }

    dispatch(addToFavourites(product));
  };

  return (
    <div className="ProductCard">
      <div className="ProductCard__content">
        <div className="ProductCard__image-container">
          <Link to={itemPath}>
            <img
              className="ProductCard__image"
              src={imageUrl}
              width="208"
              height="208"
              alt="product"
            />
          </Link>
        </div>

        <p className="ProductCard__title">
          <Link to={itemPath}>
            {name}
          </Link>
        </p>

        <div className="ProductCard__price">
          <h2 className="ProductCard__price-main">
            {`$${sellPrice}`}
          </h2>

          {!!discount && (
            <p className="ProductCard__price-discount">
              {`$${price}`}
            </p>
          )}
        </div>

        <table
          className="ProductCard__specs-table"
          role="presentation"
        >
          <tbody>
            <tr>
              <td>Screen</td>
              <td>{screen || '-'}</td>
            </tr>
            <tr>
              <td>Capacity</td>
              <td>{capacity || '-'}</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>{ram || '-'}</td>
            </tr>
          </tbody>
        </table>

        <div className="ProductCard__buttons">
          <Button
            variant="cart"
            className={classNames(
              { active: isItemInCart },
            )}
            onClick={onAddToCart}
          >
            {isItemInCart
              ? 'Added to cart'
              : 'Add to cart'}
          </Button>

          <Button
            variant="favourite"
            data-cy="addToFavorite"
            aria-label="add-favourite"
            className={classNames(
              { active: isItemInFavourites },
            )}
            onClick={onAddToFavourites}
          />
        </div>
      </div>
    </div>
  );
};
