import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconArrow } from '../../shared/IconArrow';
import {
  ShoppingCartContextActionType,
  useShoppingCartDispatch,
  useShoppingCartStateValue,
} from '../../context';
import cartPageStyles from './CartPage.module.scss';
import { IconDelete } from '../../shared/IconDelete';
import { SecondaryButton } from '../../components/SecondaryButton';

export const CartPage = () => {
  const navigate = useNavigate();
  const state = useShoppingCartStateValue();
  const dispatch = useShoppingCartDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCartEmpty = state.items.length === 0;

  return (
    <div className={classNames('container', cartPageStyles.CartPage)}>
      <div className={cartPageStyles.CartBreadCrumbs}>
        <span>
          <IconArrow direction="Left" />
        </span>
        <button
          onClick={() => navigate(-1)}
          className={classNames('font-small', cartPageStyles.BackButton)}
        >
          Back
        </button>
      </div>

      <h1 className={cartPageStyles.CartTitle}>Cart</h1>

      {isCartEmpty && (
        <p className={cartPageStyles.EmptyCart}>Your cart is empty</p>
      )}

      {!isCartEmpty && (
        <div className={cartPageStyles.CartItemsWrapper}>
          <section className={cartPageStyles.CartItems}>
            {state.items.map(item => (
              <div className={cartPageStyles.CartItem} key={item.product.id}>
                <div className={cartPageStyles.CartItemLeft}>
                  <button
                    className={cartPageStyles.DeleteButton}
                    onClick={() =>
                      dispatch({
                        type: ShoppingCartContextActionType.REMOVE_FROM_CART,
                        payload: item.product,
                      })
                    }
                  >
                    <IconDelete />
                  </button>
                  <NavLink
                    to={`/${item.product.category}/${item.product.itemId}`}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className={cartPageStyles.CartItemImage}
                    ></img>
                  </NavLink>
                  <NavLink
                    to={`/${item.product.category}/${item.product.itemId}`}
                  >
                    <p
                      className={classNames(
                        'font-body',
                        cartPageStyles.CartItemName,
                      )}
                    >
                      {item.product.name}
                    </p>
                  </NavLink>
                </div>
                <div className={cartPageStyles.CartItemRight}>
                  <div className={cartPageStyles.CartItemQuantity}>
                    <SecondaryButton
                      isDisabled={item.quantity === 1}
                      onClick={() =>
                        dispatch({
                          type: ShoppingCartContextActionType.DECREASE_QUANTITY,
                          payload: item.product,
                        })
                      }
                    >
                      -
                    </SecondaryButton>
                    <span>{item.quantity}</span>
                    <SecondaryButton
                      onClick={() =>
                        dispatch({
                          type: ShoppingCartContextActionType.INCREASE_QUANTITY,
                          payload: item.product,
                        })
                      }
                    >
                      +
                    </SecondaryButton>
                  </div>
                  <h3
                    className={classNames('font-h3', cartPageStyles.ItemPrice)}
                  >
                    ${item.product.price * item.quantity}
                  </h3>
                </div>
              </div>
            ))}
          </section>
          <section className={cartPageStyles.PriceSection}>
            <h2 className={classNames('font-h2', cartPageStyles.PriceTitle)}>
              ${state.totalPrice}
            </h2>
            <p className={classNames('font-body', cartPageStyles.PriceText)}>
              Total for {state.totalCount} items
            </p>
            <span className={cartPageStyles.HorizontalLine}></span>
            <button
              className={classNames(
                'font-buttons',
                cartPageStyles.CheckoutButton,
              )}
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </button>
          </section>
        </div>
      )}

      {isModalOpen && (
        <div className={cartPageStyles.ModalOverlay}>
          <div className={cartPageStyles.Modal}>
            <p className={classNames('font-body', cartPageStyles.ModalText)}>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
            <div className={cartPageStyles.ModalButtons}>
              <button
                className={classNames(
                  'font-buttons',
                  cartPageStyles.ModalButtonConfirm,
                )}
                onClick={() => {
                  dispatch({
                    type: ShoppingCartContextActionType.CLEAR_CART,
                  });
                  setIsModalOpen(false);
                }}
              >
                Clear the Cart
              </button>
              <button
                className={classNames(
                  'font-buttons',
                  cartPageStyles.ModalButtonCancel,
                )}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
