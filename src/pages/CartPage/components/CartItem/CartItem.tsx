import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import classNames from 'classnames';
import { CartContext } from '../../../../context/AppContext';
import { Product } from '../../../../types/ProductCard';
import './CartItem.scss';
import '../../../../styles/main.scss';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const { removeFromCart, incrementProductInCart, decrementProductInCart } =
    useContext(CartContext);

  const { name, price, image } = product;

  const cartItemArticle = useRef<HTMLElement>(null);

  const handleRemoveCartItem = () => {
    setTimeout(() => removeFromCart(product.id), 500);

    cartItemArticle.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(100vw)' }],
      {
        duration: 600,
        iterations: 1,
        easing: 'cubic-bezier(.34,-0.31,.3,-0.41)',
      },
    );
  };

  const minusIconSrc =
    quantity > 1 ? './icons/minus-active.svg' : './icons/minus-disabled.svg';

  return (
    <article ref={cartItemArticle} className="cart-item">
      <div className="cart-item-main cart-item__main-info">
        <button
          className="cart-item-main__remove-button"
          onClick={handleRemoveCartItem}
        >
          <img src="./icons/close.svg" alt="close icon" />
        </button>

        <Link
          to={`/product/${product.itemId}`}
          className="cart-item-main__image-link"
        >
          <img
            src={image}
            className="cart-item-main__image"
            alt="Image of the product"
          />
        </Link>

        <Link
          to={`/product/${product.itemId}`}
          className="cart-item-main__name-link"
        >
          <h3 className="cart-item-main__name body-text--14">{name}</h3>
        </Link>
      </div>

      <div className="cart-item-details cart-item__details">
        <div className="cart-item-details__quantity">
          <button
            className={classNames(
              'cart-item-details__button',
              'default-button',
              {
                'cart-item-details__button--active': quantity > 1,
              },
            )}
            disabled={quantity < 2}
            onClick={() => decrementProductInCart(product.id)}
          >
            <img
              src={minusIconSrc}
              alt="minus icon - decrement quantity of product in the cart"
            />
          </button>

          <h3 className="body-text--14">{quantity}</h3>

          <button
            className={classNames(
              'default-button',
              'cart-item-details__button',
              'cart-item-details__button--active',
            )}
            onClick={() => incrementProductInCart(product.id)}
          >
            <img
              src="./icons/plus-active.svg"
              alt="plus icon - increment quantity of product in the cart"
            />
          </button>
        </div>

        <p className="cart-item-details__price">${price}</p>
      </div>
    </article>
  );
};
