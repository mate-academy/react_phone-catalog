import './ProductCard.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Product } from '../../types/Product';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add as addToCart } from '../../features/cart/cartSlice';
import {
  add as addToFavourites,
  remove as removeFavourite,
} from '../../features/favourites/favouritesSlice';
import { isItemIncluded } from '../../utils/isItemIncluded';

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

  const sellPrice = calculateDiscount(product);
  const itemPath = `/${type}s/${id}`;

  const isItemInCart = isItemIncluded(cart, id);

  const isItemInFavourites = isItemIncluded(favourites, id);

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

        <table className="ProductCard__specs-table">
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
            content="cart"
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
            content="favourite"
            data-cy="addToFavorite"
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
