import classNames from 'classnames';
import { useAppContext } from '../../store/AppContext';
import { Product } from '../../types/Product';
import './AddToCartButton.scss';

type Props = {
  product: Product,
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const {
    state: { cart },
    addToCart,
    removeFromCart,
  } = useAppContext();

  const isInCart = cart
    .some(fav => fav.id === product.id);

  return (
    <button
      type="button"
      className={classNames('add-cart-btn', {
        'add-cart-btn--in-cart': isInCart,
      })}
      onClick={(e) => {
        e.preventDefault();
        if (isInCart) {
          removeFromCart(product.id);
        } else {
          addToCart(product);
        }
      }}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
