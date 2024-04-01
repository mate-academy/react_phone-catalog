import { useContext } from 'react';
import './PopUp.scss';
import { StateContext } from '../../AppContext';
import { ACTIONS } from '../../helpers/utils';

type Props = {
  closePopUp: (trigger: boolean) => void;
};

const PopUp: React.FC<Props> = ({ closePopUp }) => {
  const { dispatch } = useContext(StateContext);

  function cleanTheCart() {
    localStorage.removeItem('cart');
    closePopUp(false);
    dispatch({ type: ACTIONS.RENDER_PAGE });
  }

  return (
    <div className="popup-box">
      <div className="mb-24"> Would you like to wipe the cart?</div>
      <div className="popup-button-box">
        <div
          role="button"
          tabIndex={0}
          className="popup-button"
          onClick={() => closePopUp(false)}
          onKeyDown={() => closePopUp(false)}
        >
          Cancel
        </div>
        <div
          role="button"
          tabIndex={0}
          className="popup-button"
          onClick={cleanTheCart}
          onKeyDown={cleanTheCart}
        >
          Wipe the cart
        </div>
      </div>
    </div>
  );
};

export default PopUp;
