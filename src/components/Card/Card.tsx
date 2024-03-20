import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCart,
  removeFromCart,
  removeProduct,
} from '../../features/product/productsSlice';
import { Product } from '../../types/Product';
import './Card.scss';
import { BASE_URL } from '../../api/api';

type Props = {
  card: Product;
};

export const Card: React.FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.phones);

  const { id, itemId, category, name, price, image } = card;

  const handleDelete = () => {
    dispatch(removeProduct(card));
    localStorage.setItem(
      'cart',
      JSON.stringify([...cart.filter(pr => pr.id !== id)]),
    );
  };

  const handleAddItem = () => {
    dispatch(addToCart(card));

    localStorage.setItem('cart', JSON.stringify([...cart, card]));
  };

  const handleRemoveItem = () => {
    const copy = [...cart].reverse();
    const index = copy.findIndex(item => item.id === id);

    copy.splice(index, 1);

    dispatch(removeFromCart(card));

    localStorage.setItem('cart', JSON.stringify([...copy].reverse()));
  };

  const amountOfProduct = useMemo(() => {
    return cart.filter(item => item.id === id).length;
  }, [cart, id]);

  const isAddDisabled = amountOfProduct >= 99;
  const isDeleteDisabled = amountOfProduct <= 1;

  return (
    <div className="card">
      <div className="card__container">
        <button
          className="card__delete"
          aria-label="delete"
          type="button"
          onClick={handleDelete}
          data-cy="cartDeleteButton"
        >
          <div className="icon icon-close-hidden" />
        </button>

        <Link to={`/${category}/${itemId}`} className="card__link">
          <img src={`${BASE_URL}/${image}`} className="card__image" alt=" " />
          <p className="card__product-name">{name}</p>
        </Link>
      </div>

      <div className="card__buttons">
        <button
          className={classNames('card__button', {
            'card__button--disabled': isDeleteDisabled,
          })}
          type="button"
          aria-label="minus"
          disabled={isDeleteDisabled}
          onClick={handleRemoveItem}
        >
          <div
            className={classNames('icon', {
              'icon-minus-hidden': isDeleteDisabled,
              'icon-minus': !isDeleteDisabled,
            })}
          />
        </button>

        <p className="card__amount" data-cy="productQuantity">
          {amountOfProduct}
        </p>

        <button
          className={classNames('card__button', {
            'card__button--disabled': isAddDisabled,
          })}
          type="button"
          aria-label="plus"
          onClick={handleAddItem}
          disabled={isAddDisabled}
        >
          <div
            className={classNames('icon', {
              'icon-plus-hidden': isAddDisabled,
              'icon-plus': !isAddDisabled,
            })}
          />
        </button>
      </div>

      <p className="card__price">{`${price}`}</p>
    </div>
  );
};
