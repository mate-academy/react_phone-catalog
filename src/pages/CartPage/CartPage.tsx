import { useContext, useMemo } from 'react';
import { BackButton } from '../../components/BackButton';
import './CartPage.scss';
import { CartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types/cartItem';
import classNames from 'classnames';
import { ProductContext } from '../../context/productContext';
import { Message } from '../../types/Message';
import { BASE_URL } from '../../utils/fetchProducts';

export const CartPage = () => {
  const { cartList, cartDispatch } = useContext(CartContext);
  const { dispatch } = useContext(ProductContext);

  const changedAmount = (product: CartItem, sign: number) => {
    const changedProduct = { ...product };
    const index = cartList.findIndex(item => item.id === product.id);

    changedProduct.quantity += sign;

    const newCartList = [...cartList];

    newCartList.splice(index, 1, changedProduct);

    cartDispatch({ type: 'UPDATE_AMOUNT', payload: newCartList });
  };

  const handleIncreaseAmount = (product: CartItem) => {
    changedAmount(product, 1);
  };

  const handleReduceAmount = (product: CartItem) => {
    changedAmount(product, -1);
  };

  const handleRemoveProduct = (product: CartItem) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: product });
    dispatch({ type: 'setMessage', payload: Message.removeFromCart });
  };

  const productInCart = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartList]);

  const productTotalPrice = useMemo(() => {
    return cartList.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }, [cartList]);

  return (
    <div className="cart">
      <BackButton />
      <h1 className="cart-title">Cart</h1>

      {cartList.length > 0 ? (
        <div className="cart__content">
          <ul className="cart__content-list">
            {cartList.map(product => (
              <li className="cart_item" key={product.id}>
                <div className="cart_item-left">
                  <div
                    className="cart_item-remove icon icon-remove"
                    onClick={() => handleRemoveProduct(product)}
                  />
                  <Link
                    to={`/${product.category}/${product.itemId}`}
                    className="cart_item-link"
                  >
                    <div className="cart_item-photo">
                      <img
                        className="cart_item-photo-img"
                        alt={product.name}
                        src={`${BASE_URL}${product.image}`}
                      />
                    </div>
                    <p className="cart_item-name">{product.name}</p>
                  </Link>
                </div>

                <div className="cart_item-right">
                  <div className="cart_item-quantity">
                    <button
                      className={classNames('cart_item-quantity-box', {
                        'cart_item-quantity-box-disabled':
                          product.quantity === 1,
                      })}
                      onClick={() => handleReduceAmount(product)}
                      disabled={product.quantity === 1}
                    >
                      <div
                        className={classNames('icon icon-minus', {
                          'icon-minus-disabled': product.quantity === 1,
                        })}
                      />
                    </button>
                    <div className="cart_item-quantity-value">
                      {product.quantity}
                    </div>
                    <button
                      className="cart_item-quantity-box"
                      onClick={() => handleIncreaseAmount(product)}
                    >
                      <div className="icon icon-plus" />
                    </button>
                  </div>
                  <div className="cart_item-price">{`$${product.price}`}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart_total">
            <p className="cart_total-price">{`$${productTotalPrice}`}</p>
            <p className="cart_total-text">
              {productInCart === 1
                ? 'Total for 1 item'
                : `Total for ${productInCart} items`}
            </p>

            <div className="cart_line" />

            <button
              className="cart_total-checkout"
              onClick={() =>
                dispatch({ type: 'setMessage', payload: Message.checkout })
              }
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h2 className="cart-empty">There are no items in the cart yet</h2>
      )}
    </div>
  );
};
