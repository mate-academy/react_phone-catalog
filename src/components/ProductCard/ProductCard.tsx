import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../../helpers/types/Product';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';
import {
  addToFavorites, removeFromFavorites,
} from '../../store/slices/favoritesSlice';
import { ButtonType } from '../../helpers/types/ButtonType';
import { Button } from '../Button/Button';
import './ProductCard.scss';

type Props = {
  product: Product;
  type: ProductsCardType,
  transform?: string
};

export const ProductCard: React.FC<Props> = ({ product, type, transform }) => {
  const {
    image, name, price, screen, fullPrice, capacity, ram, itemId, category,
  } = product;

  const { favorites } = useAppSelector(state => state.favorites);
  const { cartItems } = useAppSelector(state => state.cartItems);

  const dispatch = useDispatch();

  const hasInFavorites = favorites.some((fav) => fav.id === product.id);
  const hasInCart = cartItems.some((item) => item.id === product.id);

  const handleFavoritesChanges = () => {
    if (hasInFavorites) {
      dispatch(removeFromFavorites(product));

      return;
    }

    dispatch(addToFavorites(product));
  };

  const handleCartChanges = () => {
    if (hasInCart) {
      dispatch(removeFromCart(product.id));

      return;
    }

    dispatch(addToCart(product));
  };

  return (
    <div className="productCard" data-cy="cardsContainer" style={{ transform }}>
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
            <s className="productCard__price-discount">
              {`$${fullPrice}`}
            </s>
          </>
        ) : (
          <span className="productCard__price-main">{`$${fullPrice}`}</span>
        )}
      </div>

      <ul className="productCard__parameters">
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

      <div className="productCard__button">
        <button
          type="button"
          onClick={() => handleCartChanges()}
          className={classNames('productCard__button-add', {
            'productCard__button-add--active': hasInCart,
          })}
        >
          {hasInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <Button
          data-cy="addToFavorite"
          content={ButtonType.FAVORITES}
          className={classNames('productCard__button-like',
            { active: hasInFavorites })}
          onClick={handleFavoritesChanges}
        />
      </div>
    </div>
  );
};
