import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getProductsById } from '../../services/Products';
import { Product } from '../../types/Product';
import '../../styles/utils/typography.scss';
import './CartPage.scss';
import { CartItem as CartItemType } from '../../types/CartItem';
import { CartItem } from '../../components/CartItem/CartItem';
import GoBackButton from '../../components/GoBackButton';
import { useDispatch } from 'react-redux';
import { clear as clearCart } from '../../features/cartReducer';

export const CartPage = () => {
  const dispatch = useDispatch();
  const carts: CartItemType[] = useAppSelector(state => state.cart.items);
  const cartIds = carts.map(item => item.id);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isModal, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (isModal) {
      clear();
      setIsModal(false);
    } else {
      setIsModal(true);
    }
  };

  const totalPrice = cartProducts.reduce((acc, product) => {
    const cartItem = carts.find(item => item.id === product.itemId);

    return acc + product.price * (cartItem ? cartItem.quantity : 1);
  }, 0);

  const totalQuantity = cartProducts.reduce((acc, product) => {
    const cartItem = carts.find(item => item.id === product.itemId);

    return acc + (cartItem ? cartItem.quantity : 1);
  }, 0);

  useEffect(() => {
    const fetchFavouriteProducts = async () => {
      const cartProd = await getProductsById(cartIds);

      setCartProducts(cartProd);
    };

    fetchFavouriteProducts();
  }, [cartIds]);

  return (
    <div className="cartPage">
      <div className="cartPage__go-back-button">
        <GoBackButton />
      </div>
      <h1 className="cartPage__title title cartPage__empty">Cart</h1>
      <div className="cartPage__main">
        {cartProducts.length > 0 ? (
          <div className="cartPage__list">
            {cartProducts.map(product => (
              <div className="cartPage__item" key={product.id}>
                <CartItem product={product} />
              </div>
            ))}
          </div>
        ) : (
          <h1 className="title title--h2">Your cart is empty</h1>
        )}
        {cartProducts.length > 0 && (
          <div className="cartPage__total-price-block">
            <p className="cartPage__price">${totalPrice}</p>
            <p className="paragraph cartPage__subtitle ">
              Total for {totalQuantity} items
            </p>
            <hr className="cartPage__line" />

            <button
              className="cartPage__button button"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            {isModal && (
              <div className="cartPage__modal">
                <button
                  onClick={closeModal}
                  className="cartPage__modal__close-button"
                />
                <p className="paragraph">
                  Checkout is not implemented yet. <br />
                  Do you want to clear the Cart?
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
