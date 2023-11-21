import { useState, useEffect } from 'react';
import { Icon } from '../Icon';
import { Product } from '../../types/Product';
import { IconType } from '../../types/Icon';
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
} from '../../app/hooks';
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from '../../features/favoriteAndCartSlice';
import './ProductCart.scss';

type Props = {
  product: Product,
};

export const ProductCart:React.FC<Props> = ({ product }) => {
  const {
    name,
    id,
    image,
    price,
  } = product;

  const dispatch = useAppDispatch();

  const { cart } = useAppSelector(state => state.favoriteAndCartProducts);
  const [setCartLocalStorage] = useLocalStorage('cart', cart);

  const itemInCart = cart.filter(item => item.name === name)[0];

  const defaultCountValue = () => {
    let counter = 0;

    cart.forEach(item => {
      if (item.id === itemInCart?.id) {
        counter += 1;
      }
    });

    return counter;
  };

  const [amount, setAmount] = useState(defaultCountValue());

  const handleDeleteProduct = () => {
    const updatedCart = cart.filter(item => item.id !== id);

    dispatch(deleteFromCart(id));
    setCartLocalStorage(updatedCart);
  };

  const handleIncreaseCount = () => {
    dispatch(addToCart(itemInCart));
    setCartLocalStorage([...cart, itemInCart]);
    setAmount(prev => prev + 1);
  };

  const handleDecreaseCount = () => {
    const currItems = JSON.parse(localStorage.getItem('cart') || '[]');

    const itemToRemove = currItems.findLastIndex((item: Product) => (
      item.id === itemInCart.id
    ));

    currItems.splice(itemToRemove, 1);

    dispatch(removeFromCart(itemInCart));
    setCartLocalStorage([...currItems]);
    setAmount(prev => prev - 1);
  };

  useEffect(() => {
    defaultCountValue();
  }, [cart.length]);

  return (
    <li className="cart__item">
      <button
        className="cart__item--delete"
        data-cy="cartDeleteButton"
        type="button"
        onClick={handleDeleteProduct}
      >
        <Icon type={IconType.CROSS_DISABLED} />
      </button>

      <div className="cart__image--container">
        <img
          className="cart__image"
          src={image}
          alt="Product"
        />
      </div>

      <div className="cart__item--name">
        {name}
      </div>

      <div className="
        cart__buttons
        buttons"
      >
        <button
          className="buttons__button"
          type="button"
          onClick={handleDecreaseCount}
          disabled={amount === 1}
        >
          <Icon
            type={amount === 1
              ? IconType.MINUS_DISABLED
              : IconType.MINUS}
          />
        </button>

        <div
          className="cart__amount"
          data-cy="productQauntity"
        >
          {amount}
        </div>

        <button
          className="buttons__button"
          type="button"
          onClick={handleIncreaseCount}
        >
          <Icon type={IconType.PLUS} />
        </button>
      </div>

      <div className="cart__price">
        {`$${price * amount}`}
      </div>
    </li>
  );
};
