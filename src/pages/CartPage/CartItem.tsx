import {
  useContext,
  useState,
} from 'react';
import './CartPage.scss';
import { Product } from '../../types';
import { StateContext } from '../../AppContext';
import { ACTIONS } from '../../helpers/utils';

type Props = {
  summary: (amount: number) => void,
  reduce: (amount: number) => void,
  phone: Product,
};

export const CartItem : React.FC<Props> = ({ summary, reduce, phone }) => {
  const [amount, setAmount] = useState<number>(1);
  const { state, dispatch } = useContext(StateContext);

  function addItem() {
    setAmount(state.card.filter(elem => elem.id === phone.id).length);
    dispatch({ type: ACTIONS.ADD_TO_CARD, payload: phone });
  }

  function deleteItem() {
    if (amount > 0) {
      setAmount(state.card.filter(elem => elem.id === phone.id).length);
      reduce(+phone.price.slice(1));
      dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: phone });
    }
  }

  return (
    <div className="item-container mb-16">
      <div className="cart-element">
        <div
          className="ml-24"
          onClick={
            () => dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: phone })
          }
          onKeyDown={
            () => dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: phone })
          }
          role="button"
          tabIndex={0}
        >
          <img src="./img/icons/close.svg" alt="img" />
        </div>

        <div className="ml-30">
          {phone
          && (
            <img
              src={phone.picsArray[0]}
              alt="img"
              className="cart-image"
            />
          )}
        </div>

        <div className="cart-name ml-30">
          {phone && phone.name}
        </div>

        <div className="dflex ml-50">
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
        <div className="cart-price ml-42">
          {Number(phone?.price.slice(1)) * amount}
        </div>
      </div>
    </div>
  );
};
