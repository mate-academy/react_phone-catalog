import './ProductCard.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Product } from '../../types/Product';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { getItemPath } from '../../helpers/getItemPath';
import { CartContext } from '../GlobalCartProvider';
import { FavouriteContext } from '../GlobalFavouritesProvider';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
    imageUrl,
  } = product;

  const { cart, setCart } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);

  const sellPrice = calculateDiscount(product);

  const itemPath = getItemPath(product);

  const itemInCart = cart.some(cartItem => cartItem.id === product.id);

  const itemInFavourites = favourites.includes(product.id);

  const onAddToCart = () => {
    if (itemInCart) {
      return;
    }

    setCart([...cart, {
      id: product.id,
      quantity: 1,
    }]);
  };

  const onAddToFavourites = () => {
    if (itemInFavourites) {
      setFavourites(
        favourites.filter(item => item !== product.id),
      );

      return;
    }

    setFavourites([...favourites, product.id]);
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
              { active: itemInCart },
            )}
            onClick={onAddToCart}
          >
            {itemInCart
              ? 'Added to cart'
              : 'Add to cart'}
          </Button>

          <Button
            content="favourite"
            data-cy="addToFavorite"
            className={classNames(
              { active: itemInFavourites },
            )}
            onClick={onAddToFavourites}
          />
        </div>
      </div>
    </div>
  );
};
