import { Link } from 'react-router-dom';
import { handleBackButton } from '../../utils/handleBackButton';
import styles from './ShoppingCartPage.module.scss';
import { useContext, useMemo, useRef } from 'react';
import { DispatchContext, StateContext } from '../../Store/Store';
import classNames from 'classnames';

export const ShoppingCartPage = () => {
  const { cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const getTotalProductsPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + product.totalPrice, 0);
  }, [cart]);

  const getTotalProductsAmount = useMemo(() => {
    return cart.reduce((sum, product) => sum + product.count, 0);
  }, [cart]);

  const handleConfirmButton = () => {
    dialogRef.current?.close();

    cart.forEach(product => {
      dispatch({ type: 'deleteFromCart', payload: product });
    });
  };

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.shoppingCart__back}>
        <button
          className={styles.shoppingCart__backArrow}
          onClick={handleBackButton}
        />
        <button
          className={styles.shoppingCart__backText}
          onClick={handleBackButton}
        >
          Back
        </button>
      </div>
      <h1 className={styles.shoppingCart__title}>Cart</h1>
      {cart.length > 0 ? (
        <>
          <div className={styles.shoppingCart__productsContainer}>
            {cart.map(product => (
              <div className={styles.shoppingCart__card} key={product.id}>
                <div className={styles.shoppingCart__cardTop}>
                  <button
                    className={styles.shoppingCart__cardTopDeleteButton}
                    onClick={() =>
                      dispatch({ type: 'deleteFromCart', payload: product })
                    }
                  />
                  <Link
                    to={`/${product.category}/${product.itemId}`}
                    className={styles.shoppingCart__cardTopImageLink}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.shoppingCart__cardTopImage}
                    />
                  </Link>
                  <Link
                    to={`/${product.category}/${product.itemId}`}
                    className={styles.shoppingCart__cardTopName}
                  >
                    {product.name}
                  </Link>
                </div>
                <div className={styles.shoppingCart__cardBottom}>
                  <div className={styles.shoppingCart__cardBottomCounter}>
                    <button
                      className={styles.shoppingCart__cardBottomCounterButton}
                      onClick={() =>
                        dispatch({ type: 'amountDecrease', payload: product })
                      }
                      disabled={product.count <= 1}
                    >
                      <div
                        className={classNames(
                          styles.shoppingCart__cardBottomCounterMinus,
                          {
                            [styles[
                              'shoppingCart__cardBottomCounterMinus--disabled'
                            ]]: product.count <= 1,
                            [styles[
                              'shoppingCart__cardBottomCounterMinus--is-active'
                            ]]: product.count > 1,
                          },
                        )}
                      />
                    </button>
                    <span
                      className={styles.shoppingCart__cardBottomCounterCount}
                    >
                      {product.count}
                    </span>
                    <button
                      className={styles.shoppingCart__cardBottomCounterButton}
                      onClick={() =>
                        dispatch({ type: 'amountIncrease', payload: product })
                      }
                    >
                      <div
                        className={styles.shoppingCart__cardBottomCounterPlus}
                      />
                    </button>
                  </div>
                  <span className={styles.shoppingCart__cardBottomPrice}>
                    {`$${product.totalPrice}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.shoppingCart__checkout}>
            <div className={styles.shoppingCart__checkoutTop}>
              <span className={styles.shoppingCart__checkoutTopTotalPrice}>
                {`$${getTotalProductsPrice}`}
              </span>
              <span className={styles.shoppingCart__checkoutTopText}>
                {`Total for ${getTotalProductsAmount} items`}
              </span>
            </div>
            <div className={styles.shoppingCart__checkoutDivider} />
            <button
              className={styles.shoppingCart__checkoutButton}
              onClick={() => dialogRef.current?.showModal()}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <h4 className={styles.shoppingCart__empty}>Your cart is empty</h4>
      )}

      <dialog ref={dialogRef} className={styles.shoppingCart__dialogContainer}>
        <div className={styles.shoppingCart__dialog}>
          <h4 className={styles.shoppingCart__dialogText}>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </h4>
          <div className={styles.shoppingCart__dialogButtonsContainer}>
            <button
              className={styles.shoppingCart__dialogButton}
              onClick={handleConfirmButton}
            >
              Confirm
            </button>
            <button
              className={styles.shoppingCart__dialogButton}
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </div>

        <button
          className={styles.shoppingCart__dialogClose}
          onClick={() => dialogRef.current?.close()}
        >
          <span className={styles.shoppingCart__dialogCloseButton} />
        </button>
      </dialog>
    </div>
  );
};
