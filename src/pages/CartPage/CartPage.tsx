import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import './CartPage.scss';
import { ProductBuyCard } from '../../components/ProductByCard';
import { actions } from '../../features/addedToCartProducts';
import { actions as quantityActions } from '../../features/cartQuantities';

export const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cartQuantities);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalCartQuantity = 0;
  const addedToCartProducts = useSelector(
    (state: RootState) => state.addedToCartProducts,
  );

  const totalPrice = addedToCartProducts.reduce((sum, product) => {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 1;

    totalCartQuantity += quantity;

    return sum + (product.price ?? product.fullPrice) * quantity;
  }, 0);

  function checkoutAlert() {
    const confirmClear = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmClear) {
      for (const productToDelete of addedToCartProducts) {
        dispatch(actions.deleteOne(productToDelete.itemId));
        dispatch(quantityActions.removeQuantity(productToDelete.id));
      }
    }
  }

  function goBack() {
    return navigate(-1);
  }

  return (
    <>
      {addedToCartProducts.length === 0 ? (
        <div className="cart-empty">
          <img
            src="./img/cart-is-empty.png"
            className="cart-empty__img"
            alt="cart_is_empty"
          />
          <button className="cart-empty__button" onClick={goBack}>
            Go Back
          </button>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-page__top-cart">
            <p className="top-cart__back" onClick={goBack}>
              <span className="top-cart__back-icon" />
              Back
            </p>
            <h1 className="top-cart__title">Cart</h1>
          </div>

          {addedToCartProducts.length === 0 ? (
            <h2>The cart is empty</h2>
          ) : (
            <div className="cart-page__bottom-cart">
              <div className="bottom-cart__products-cards">
                {addedToCartProducts.map(product => (
                  <ProductBuyCard product={product} key={product.id} />
                ))}
              </div>

              <div className="bottom-cart__checkout checkout">
                <p className="checkout__price">{`$${totalPrice}`}</p>
                <p className="checkout__items">{`Total for ${totalCartQuantity} items`}</p>
                <button
                  className="checkout__button"
                  onClick={() => checkoutAlert()}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
