import classNames from 'classnames';
import './AddToCartButton.scss';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as cartAction } from '../../features/cart/cartSlice';
import { Products } from '../../types/Products';

type CartProductsProps = {
  cardData: Products;
};

export const AddToCartButton: React.FC<CartProductsProps> = ({ cardData }) => {
  const { itemId } = cardData;

  const location = useLocation();
  const isProductDetailsPage = location.pathname.includes(`${itemId}`);
  const dispatch = useAppDispatch();

  const cart = useAppSelector(state => state.cart);

  const isInCart = cart.cartItems?.some(
    item => item.itemInCart.itemId === itemId,
  );

  const toggleCart = () => {
    if (isInCart) {
      dispatch(cartAction.removeItem(itemId));
    } else {
      dispatch(cartAction.addItem(cardData));
    }
  };

  return (
    <button
      type="button"
      className={classNames('addToCartButton', {
        addToCartButton__inCart: isInCart,
        'addToCartButton--productDetailsPage': isProductDetailsPage,
      })}
      onClick={toggleCart}
    >
      {isInCart ? 'Added to cart ' : 'Add to cart'}
    </button>
  );
};
