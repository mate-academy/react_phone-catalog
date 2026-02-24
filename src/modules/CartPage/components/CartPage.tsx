import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './CartPage.module.scss';
import { Loader } from '../../../components/Loader';
import { useProducts } from '../../../hooks/use-products';
import { useAppContext } from '../../../hooks/use-context';
import { BaseProduct } from '../../../types';

export const CartPage = () => {
  const { products, loading, error } = useProducts<BaseProduct>();
  const { cartIds, cartItems, changeQty, deleteFromCart } = useAppContext();

  const Cart = products.filter(item => cartIds.includes(item.itemId));

  const getProductQty = (itemId: string) =>
    cartItems.find(item => item.id === itemId)?.qty ?? 0;

  const total = Cart.reduce(
    (sum, item) => sum + item.price * getProductQty(item.itemId),
    0,
  );
  const totalCount = cartItems.length;

  const handleRemove = (itemId: string) => {
    return deleteFromCart(itemId);
  };

  const handleQuantity = (itemId: string, delta: number) => {
    changeQty(itemId, delta);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Link to="/" className={styles.back}>
        <i className="fas fa-chevron-left" />
        Back
      </Link>

      <h1 className={styles.title}>Cart</h1>

      {Cart.length === 0 ? (
        <div className={styles.empty}>
          <img
            src="../public/img/product-not-found.png"
            alt="Cart is empty"
            className={styles.emptyImage}
          />

          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {Cart.map(item => (
              <div key={item.id} className={styles.item}>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.itemId)}
                  aria-label="Remove from cart"
                >
                  <i className="fas fa-xmark" />
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />

                <a
                  className={styles.itemName}
                  href={`#/${item.category}/${item.itemId}`}
                >
                  {item.name}
                </a>

                <div className={styles.quantityRow}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      className={cn(styles.quantityBtn, {
                        [styles.quantityBtnDisabled]:
                          getProductQty(item.itemId) <= 1,
                      })}
                      onClick={() => handleQuantity(item.itemId, -1)}
                      disabled={getProductQty(item.itemId) <= 1}
                      aria-label="Decrease quantity"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <span className={styles.quantityCount}>
                      {getProductQty(item.itemId)}
                    </span>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => handleQuantity(item.itemId, 1)}
                      aria-label="Increase quantity"
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>

                  <span className={styles.itemPrice}>
                    ${item.price * getProductQty(item.itemId)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.totalPrice}>${total}</p>
            <p className={styles.totalLabel}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </p>
            <hr className={styles.summaryDivider} />
            <button type="button" className={styles.checkoutBtn}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};
