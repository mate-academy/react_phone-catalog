import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../../context/AppContext';

import { Product } from '../../../../types/ProductCard';

import './CartItem.scss';
import '../../../../styles/main.scss';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const {
    addToCart,
    removeFromCart,
    incrementProductInCart,
    decrementProductInCart,
  } = useContext(CartContext);

  const { name, price, image } = product;

  // const image =
  //   'images' in product && Array.isArray(product.images)
  //     ? product.images[0]
  //     : product.image;

  const wishlistIconPath = './icons/heart-black.svg';

  return (
    <article className="cart-item">
      <button onClick={() => removeFromCart(product.id)}>
        <img src="./icons/close.svg" alt="close icon" />
      </button>
      <button onClick={() => decrementProductInCart(product.id)}>
        <img
          src="./icons/minus-active.svg"
          alt="minus icon - decrement quantity of product in the cart"
        />
      </button>
      {quantity}
      <button onClick={() => incrementProductInCart(product.id)}>
        <img
          src="./icons/plus-active.svg"
          alt="plus icon - increment quantity of product in the cart"
        />
      </button>
      <Link
        to={`/product/${product.itemId}`}
        className="product__image-wrapper"
      >
        <img
          src={image}
          className="product__image"
          alt="Image of the product"
        />
      </Link>
      <Link to={`/product/${product.itemId}`} className="product__name-wrapper">
        <h3 className="product__name">{name}</h3>
      </Link>
      <p className="product__price">${price}</p>

      <hr className="product__divider" />

      <div className="buttons">
        <button
          className="buttons__cart"
          onClick={() => {
            addToCart(product);
          }}
        >
          Add to cart
        </button>
        <button className="wishlist-button buttons__wishlist">
          <img
            className="wishlist-button__icon"
            src={wishlistIconPath}
            alt="Heart icon image, adds the product to wishlist when clicked"
          />
        </button>
      </div>
    </article>
  );
};
