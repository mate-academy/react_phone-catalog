import { Link } from 'react-router-dom';
import './CartPage.scss';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartProduct } from './CartProduct';

export const CartPage = () => {
  const { cartProducts, productPrice, setProductPrice } = useContext(ProductContext);

  const storedPrice = localStorage.getItem('productPrice');

  useEffect(() => {
    console.log('useEffect in CartPage is running');

    if (storedPrice) {
      setProductPrice(JSON.parse(storedPrice));
    }
  }, [productPrice, storedPrice]);

  return (
    <div className="cart">
      <div>
        <Link
          to="/"
          className="cart__link"
        >
          Back
        </Link>
        <h1 className="cart__title">Cart</h1>

        <div className="cart-container">
          {cartProducts.length ? (
            cartProducts.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))
          ) : (
            <h1>Your cart is empty</h1>
          )}
        </div>
      </div>
      <div className="cart__total-container">
        <h1 className="cart__total-price-amount">
          {`$${productPrice}`}
        </h1>
        <h2 className="cart__total-carts">
          {`Total for ${cartProducts.length} items`}
        </h2>
        <div className="cart__button-checkout-container">
          <button className="cart__button-checkout">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
