import { useContext } from 'react';
import { Product } from '../../types/Product';
import { CartContext } from '../../storage/CartContext';
import './AddToCartButton.scss';

type Props = {
  product: Product;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart, removeFromCart } = useContext(CartContext);

  return (
    <>
      {isInCart(product.name) ? (
        <button
          className="add-to-cart-button
            add-to-cart-button--selected"
          type="button"
          onClick={() => removeFromCart(product.id)}
        >
          Added to cart
        </button>
      ) : (
        <button
          className="add-to-cart-button"
          type="button"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      )}
    </>

  );
};
