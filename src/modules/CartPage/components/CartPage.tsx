import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './CartPage.module.scss';
import { Loader } from '../../../components/Loader';
import { useProducts } from '../../../hooks/use-products';
import { useAppContext } from '../../../hooks/use-context';
import { BaseProduct } from '../../../types';
import { useRef } from 'react';

export const CartPage = () => {
  const { products, loading, error } = useProducts<BaseProduct>();
  const { cartItems, changeQty, deleteFromCart } = useAppContext();

  type CartEntry = {
    cartItem: (typeof cartItems)[number];
    product: BaseProduct;
  };

  const cartEntries = cartItems
    .map(item => ({
      cartItem: item,
      product: products.find(product => product.itemId === item.id),
    }))
    .filter((entry): entry is CartEntry => Boolean(entry.product));

  const total = cartEntries.reduce(
    (sum, entry) => sum + entry.product.price * entry.cartItem.qty,
    0,
  );
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleRemove = (itemId: string, color: string, capacity: string) => {
    return deleteFromCart({ id: itemId, color, capacity });
  };

  const handleQuantity = (
    itemId: string,
    color: string,
    capacity: string,
    delta: number,
  ) => {
    changeQty({ id: itemId, color, capacity }, delta);
  };

  const clearCartItems = () => {
    cartItems.forEach(cartItem =>
      handleRemove(cartItem.id, cartItem.color, cartItem.capacity),
    );
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

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

      {cartEntries.length === 0 ? (
        <div className={styles.empty}>
          <img
            src="img/cart-is-empty.png"
            alt="Cart is empty"
            className={`${styles.emptyImage} not-scale`}
          />

          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {cartEntries.map(({ cartItem, product }) => (
              <div
                key={`${cartItem.id}-${cartItem.color}-${cartItem.capacity}`}
                className={styles.item}
              >
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() =>
                    handleRemove(cartItem.id, cartItem.color, cartItem.capacity)
                  }
                  aria-label="Remove from cart"
                >
                  <i className="fas fa-xmark" />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.itemImage}
                />

                <a
                  className={styles.itemName}
                  href={`#/${product.category}/${product.itemId}`}
                >
                  {product.name}
                </a>

                <div className={styles.quantityRow}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      className={cn(styles.quantityBtn, {
                        [styles.quantityBtnDisabled]: cartItem.qty <= 1,
                      })}
                      onClick={() =>
                        handleQuantity(
                          cartItem.id,
                          cartItem.color,
                          cartItem.capacity,
                          -1,
                        )
                      }
                      disabled={cartItem.qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <span className={styles.quantityCount}>{cartItem.qty}</span>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() =>
                        handleQuantity(
                          cartItem.id,
                          cartItem.color,
                          cartItem.capacity,
                          1,
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>

                  <span className={styles.itemPrice}>
                    ${product.price * cartItem.qty}
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
            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={() => {
                dialogRef.current?.showModal();
              }}
            >
              Checkout
            </button>

            <dialog id="my-dialog" ref={dialogRef} className={styles.dialog}>
              <button
                onClick={() => {
                  dialogRef.current?.close();
                }}
                className={styles.dialogClose}
              >
                <i className={cn('fas fa-xmark')} />
              </button>

              <p>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </p>

              <div className={styles.dialogActions}>
                <button
                  className={styles.dialogConfirm}
                  onClick={clearCartItems}
                >
                  Confirm order
                </button>

                <button
                  className={styles.dialogCancel}
                  onClick={() => {
                    dialogRef.current?.close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </dialog>
          </div>
        </div>
      )}
    </>
  );
};
