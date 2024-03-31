import './PopUp.scss';

type Props = {
  closePopUp: (trigger: boolean) => void;
};

const PopUp: React.FC<Props> = ({ closePopUp }) => {
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
          onClick={() => closePopUp(false)}
          onKeyDown={() => closePopUp(false)}
        >
          Wipe the cart
        </div>
      </div>
    </div>
  );
};

export default PopUp;
