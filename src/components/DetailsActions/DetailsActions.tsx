import './DetailsActions.scss';

import { Link, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';
import * as cartActions from '../../features/cart';
import * as favoritesActions from '../../features/favorites';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { ProductDetails } from '../../types/ProductDetails';
import { Item } from '../../types/Item';
import { Product } from '../../types/Product';

type Props = {
  details?: ProductDetails;
  product?: Product;
};

export const DetailsActions: React.FC<Props> = ({ details, product }) => {
  const dispatch = useAppDispatch();
  const addItemToCart = ((item: Item) => (
    dispatch(cartActions.add(item))
  ));
  const cartItems = useAppSelector(state => state.cart);
  const addItemToFavorites = ((item: Product) => (
    dispatch(favoritesActions.add(item))
  ));

  const removeItemFromCart = ((itemId: string) => (
    dispatch(cartActions.remove(itemId))
  ));

  const removeItemFromFavorites = ((id: string) => (
    dispatch(favoritesActions.remove(id))
  ));
  const favorites = useAppSelector(state => state.favorites);
  const parentPath = useResolvedPath('../').pathname;

  const handleToggleCartItems = () => {
    if (details && !cartItems.find((item: Item) => item.id === details.id)) {
      const newItem = {
        id: details?.id,
        imageURL: details?.images[0],
        name: details?.name,
        price: details?.priceDiscount,
        quantity: 1,
      };

      addItemToCart(newItem);
    } else if (details && cartItems.find((item: Item) => item.id === details.id)) {
      removeItemFromCart(details?.id);
    }
  };

  const handleToggleFavorites = () => {
    if (product && !favorites.find((item: Product) => item.itemId === product?.itemId)) {
      addItemToFavorites(product);
    } else if (product && favorites.find((item: Product) => item.itemId === product?.itemId)) {
      removeItemFromFavorites(product.itemId);
    }
  };

  return (
    <>
      <span className="actions__label">
        Available colors
      </span>

      <ul className="actions__list">
        {details?.colorsAvailable.map((color) => (
          <li className="actions__color-item">
            <Link
              key={color}
              to={{
                pathname: `${parentPath}${details.namespaceId}-${details.capacity.toLocaleLowerCase()}-${color}`,
              }}
              className={classNames(
                'actions__color-link',
                {
                  'actions__color-link--active': (
                    details?.color === color
                  ),
                },
              )}
              style={{ backgroundColor: color }}
            />
          </li>
        ))}
      </ul>

      <span className="actions__label">
        Select capacity
      </span>

      <ul className="actions__list">
        {details?.capacityAvailable.map((capacity) => (
          <li className="actions__capacity-item">
            <Link
              key={capacity}
              to={{
                pathname: `${parentPath}${details.namespaceId}-${capacity.toLocaleLowerCase()}-${details.color}`,
              }}
              className={classNames(
                'actions__capacity-link',
                {
                  'actions__capacity-link--active': (
                    details?.capacity === capacity
                  ),
                },
              )}
            >
              {capacity}
            </Link>
          </li>
        ))}
      </ul>

      <div className="actions__price">
        <span className="actions__price-discount">
          {`$${details?.priceDiscount}`}
        </span>

        <span className="actions__price-regular">
          {`$${details?.priceRegular}`}
        </span>
      </div>

      <div className="actions__buttons">
        <button
          type="button"
          className={classNames(
            'actions__button',
            'button',
            {
              'button--selected': (cartItems.find((item: Item) => item.id === product?.itemId)),
            },
          )}
          onClick={handleToggleCartItems}
        >
          {
            (cartItems.find((item: Item) => item.id === product?.itemId))
              ? 'Added to cart'
              : 'Add to cart'
          }
        </button>

        <button
          aria-label="toggle-favorites"
          type="button"
          className={classNames(
            'actions__button',
            'button-square',
            {
              'button-square--filled': (favorites.find((item: Product) => item.itemId === product?.itemId)),
            },
            {
              'button-square--like': !(favorites.find((item: Product) => item.itemId === product?.itemId)),
            },
          )}
          data-cy="addToFavorite"
          onClick={handleToggleFavorites}
        />
      </div>

      <div className="actions__info">
        <span className="actions__characteristic">
          Screen
        </span>

        <span className="actions__value">
          {details?.screen}
        </span>

        <span className="actions__characteristic">
          Resolution
        </span>

        <span className="actions__value">
          {details?.resolution}
        </span>

        <span className="actions__characteristic">
          Processor
        </span>

        <span className="actions__value">
          {details?.processor}
        </span>

        <span className="actions__characteristic">
          RAM
        </span>

        <span className="actions__value">
          {details?.ram}
        </span>
      </div>
    </>
  );
};
