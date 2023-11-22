import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Context } from '../Context';
import { Icon } from '../Icon';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useWindowSize } from '../../utils/useWindowSize';
import { IconType } from '../../types/Icon';
import { Product } from '../../types/Product';
import './ProductCart.scss';

type Props = {
  product: Product,
};

export const ProductCart: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    price,
    discount,
  } = product;

  const { cart, setCart } = useContext(Context);

  const { width } = useWindowSize();

  const [setCartLocalStorage] = useLocalStorage('cart', cart);

  const cartItem = cart.filter(item => (
    product.name === item.name))[0];

  const defaultCountValue = () => {
    let counter = 0;

    cart.forEach(item => {
      if (item.id === cartItem?.id) {
        counter += 1;
      }
    });

    return counter;
  };

  const [cartItemValue, setCartItemValue] = useState(defaultCountValue());
  const [isImage, setIsImage] = useState(false);

  const handleDeleteItem = () => {
    setCartLocalStorage(cart.filter(cartProduct => (
      cartProduct.name !== cartItem.name
    )));

    setCart(cartList => cartList?.filter(item => item.id !== product.id));
    setCartItemValue(0);
  };

  const handleAddItem = () => {
    const currentItems = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart([...currentItems, cartItem]);
    setCartLocalStorage([...currentItems, cartItem]);
    setCartItemValue(prev => prev + 1);
  };

  const handleRemoveItem = () => {
    const currentItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemToRemove = currentItems.findLastIndex((item: Product) => (
      item.id === cartItem.id
    ));

    currentItems.splice(itemToRemove, 1);

    setCart([...currentItems]);
    setCartLocalStorage([...currentItems]);
    setCartItemValue(prev => prev - 1);
  };

  useEffect(() => {
    defaultCountValue();
  }, [cart.length]);

  useEffect(() => {
    if (width > 440) {
      setIsImage(true);
    } else {
      setIsImage(false);
    }
  }, [width]);

  return (
    <li className="cart__item">
      <button
        className="cart__item--close-icon"
        type="button"
        onClick={() => handleDeleteItem()}
      >
        <Icon
          type={IconType.CLOSE}
        />
      </button>

      {isImage && (
        <div className="cart__image--container">
          <img
            src={imageUrl}
            alt="product"
            className="cart__image"
          />
        </div>
      )}

      <div className="cart__item-title">
        {name}
      </div>

      <div
        className="
          cart__buttons
          buttons"
      >
        <button
          className="buttons__button"
          type="button"
          disabled={cartItemValue === 1}
          onClick={() => handleRemoveItem()}
        >
          {cartItemValue > 1 && (
            <Icon
              type={IconType.MINUS}
            />
          )}

          {cartItemValue === 1 && (
            <Icon
              type={IconType.MINUS_DISABLED}
            />
          )}
        </button>

        <div className="cart__quantity">
          {cartItemValue}
        </div>

        <button
          className="buttons__button"
          type="button"
          onClick={() => handleAddItem()}
        >
          <Icon
            type={IconType.PLUS}
          />
        </button>
      </div>

      <div className="cart__price">
        {`$${(price - (price / 100) * discount) * cartItemValue}`}
      </div>
    </li>
  );
};
