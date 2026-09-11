import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { useAllProducts } from '../useAllProducts/useAllProducts';
import style from './AddCart.module.scss';
import { Loader } from '../../Loader/Loader';

export const AddCart: React.FC = () => {
  const { cartItems, incrementCart, decrementCart, removeFromCart, clearCart } =
    useCart();
  const { products, isLoading } = useAllProducts();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  const cartProducts = useMemo(
    () =>
      products
        .filter(product => cartItems[String(product.id)])
        .map(product => ({
          ...product,
          quantity: cartItems[String(product.id)],
        })),
    [products, cartItems],
  );

  const totalCount = cartProducts.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.priceDiscount * product.quantity,
    0,
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <div className={style.cart}>
        <button
          type="button"
          className={style.back}
          onClick={() => navigate(-1)}
        >
          &#8249; Back
        </button>

        <h1 className={style.title}>Cart</h1>

        {cartProducts.length === 0 ? (
          <p className={style.empty}>Your cart is empty</p>
        ) : (
          <div className={style.content}>
            <ul className={style.list}>
              {cartProducts.map(product => (
                <li className={style.item} key={product.id}>
                  <button
                    type="button"
                    className={style.removeButton}
                    onClick={() => removeFromCart(String(product.id))}
                    aria-label="Remove from cart"
                  >
                    &times;
                  </button>
                  <Link className={style.Link} to={`/product/${product.id}`}>
                    <img
                      className={style.image}
                      src={`${import.meta.env.BASE_URL}/${product.images[0]}`}
                      alt={product.name}
                    />
                  </Link>
                  <Link className={style.Link} to={`/product/${product.id}`}>
                    <p className={style.name}>{product.name}</p>
                  </Link>
                  <div className={style.quantity}>
                    <button
                      type="button"
                      className={style.quantityButton}
                      onClick={() => decrementCart(String(product.id))}
                      aria-label="Decrease quantity"
                      disabled={product.quantity === 1}
                    >
                      -
                    </button>
                    <span className={style.quantityValue}>
                      {product.quantity}
                    </span>
                    <button
                      type="button"
                      className={style.quantityButton}
                      onClick={() => incrementCart(String(product.id))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <p className={style.price}>
                    ${product.priceDiscount * product.quantity}
                  </p>
                </li>
              ))}
            </ul>

            <div className={style.summary}>
              <p className={style.total}>${totalPrice}</p>
              <p className={style.count}>Total for {totalCount} items</p>
              <button
                type="button"
                className={style.checkoutButton}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
