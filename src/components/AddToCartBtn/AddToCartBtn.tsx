import { useDispatch } from 'react-redux';
import { Product } from '../../types/Product';
import { useAppSelector } from '../../app/hooks';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import { CartItem } from '../../types/CartItem';
import './addToCartBtn.scss';

type Props = {
  wide?: boolean;
  product: Product;
};

export const AddToCartBtn: React.FC<Props> = ({ wide, product }) => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector(state => state.cartItems);
  const isInCart = cartItems.some(item => item.id === product.id);

  const toggleIsInCart = (productItem: CartItem) => {
    if (isInCart) {
      dispatch(removeFromCart(productItem));

      const updatedCartItems = cartItems.filter(
        item => item.id !== productItem.id,
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      dispatch(addToCart(productItem));
      const updatedProductItem = { ...productItem, quantity: 1 };

      const updatedCartItems = [...cartItems, updatedProductItem];

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  return (
    isInCart ? (
      <button
        type="button"
        className={`addToCartBtn-added ${wide ? 'addToCartBtn-wide-added' : ''}`}
        onClick={(event) => {
          event.preventDefault();
          toggleIsInCart(product);
        }}
      >
        Added to cart
      </button>
    ) : (
      <button
        type="button"
        className={`addToCartBtn ${wide ? 'addToCartBtn-wide' : ''}`}
        onClick={(event) => {
          event.preventDefault();
          toggleIsInCart(product);
        }}
      >
        Add to cart
      </button>
    )
  );
};
