// import { useContext } from 'react';
import classNames from 'classnames';
// import { Phones } from '../../types/Phones';
import './AddToCartButton.scss';
// import { CartContext } from '../ContextProviders';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as cartAction }
  from '../../features/cart/cartSlice';
import { Products } from '../../types/Products';

type CartProductsProps = {
  cardData: Products,
};

export const AddToCartButton: React.FC<CartProductsProps> = ({
  cardData,
}) => {
  const {
    // id,
    // category,
    // phoneId,
    itemId,
    // name,
    // fullPrice,
    // price,
    // screen,
    // capacity,
    // color,
    // ram,
    // year,
    // image,
  } = cardData;

  // const {
  //   cartProducts,
  //   addToCart,
  //   removeFromCart,
  // } = useContext(CartContext);

  // const isInCart = cartProducts.some(product => product.itemId === itemId);

  // const toggleCart = () => {
  //   if (isInCart) {
  //     removeFromCart(itemId);
  //   } else {
  //     addToCart(cardData);
  //   }
  // };
  const location = useLocation();
  const isProductDetailsPage = location.pathname.includes(`${itemId}`);
  const dispatch = useAppDispatch();

  const cart = useAppSelector(state => state.cart);

  const isInCart
    = cart.cartItems?.some(item => item.itemInCart.itemId === itemId);

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
      className={classNames(
        'addToCartButton',
        {
          addToCartButton__inCart: isInCart,
          'addToCartButton--productDetailsPage': isProductDetailsPage,
        },
      )}
      onClick={toggleCart}
    >
      {isInCart ? ('Added to cart ') : ('Add to cart')}
    </button>
  );
};
