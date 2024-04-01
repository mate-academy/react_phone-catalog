import { useContext } from 'react';
import './CartPage.scss';
import { Product } from '../../types';
import { StateContext } from '../../AppContext';
import { ACTIONS, useDeleteAllSimilar } from '../../helpers/utils';

type Props = {
  summary: (amount: number) => void,
  reduce: (amount: number) => void,
  phone: Product,
};

export const CartItem : React.FC<Props> = ({ summary, reduce, phone }) => {
  const { state, dispatch } = useContext(StateContext);
  const deleteAllSimilar = useDeleteAllSimilar();

  function addItem() {
    dispatch({ type: ACTIONS.ADD_TO_CARD, payload: phone });
  }

  function deleteItem() {
    if (state.card.filter(elem => elem.id === phone.id).length > 0) {
      reduce(+phone.price.slice(1));
      dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: phone });
    }
  }

  return (
    <div className="item-container mb-16">
      <div className="cart-element">
        <div className="cart-button-box-chunk">
          <div
            className="close"
            onClick={
              () => deleteAllSimilar(phone)
            }
            onKeyDown={
              () => dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: phone })
            }
            role="button"
            tabIndex={0}
            data-cy="cartDeleteButton"
          >
            <img src="./img/icons/close.svg" alt="img" />
          </div>

          <div className="">
            {phone
          && (
            <img
              src={phone.picsArray[0]}
              alt="img"
              className="cart-image"
            />
          )}
          </div>

          <div className="cart-name ">
            {phone && phone.name.slice(0, phone.name.length - 8)}
          </div>
        </div>

        <div className="cart-button-box-chunk ">
          <div className="cart-button-box">
            <div
              className="cart-square-border"
              onClick={deleteItem}
              onKeyDown={deleteItem}
              role="button"
              tabIndex={0}
            >
              -
            </div>
            <div className="cart-square">
              {state.card.filter(elem => elem.id === phone.id).length}
            </div>
            <div
              className="cart-square-border"
              onClick={() => {
                addItem();
                summary(+phone.price.slice(1));
              }}
              role="button"
              tabIndex={0}
              onKeyDown={addItem}
            >
              +
            </div>
          </div>
          <div className="cart-price " data-cy="productQauntity">
            {Number(phone?.price.slice(1))
            * state.card.filter(elem => elem.id === phone.id).length}
          </div>
        </div>
      </div>
    </div>
  );
};
