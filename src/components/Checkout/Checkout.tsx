import './style.scss';

type Props = {
  total: number;
  totalItems: number;
  onClick: (value: boolean) => void;
  isClicked: boolean;
};

export const Checkout: React.FC<Props> = ({
  total, totalItems, onClick, isClicked,
}) => {
  return (
    <div className="checkout">
      <div className="checkout__total">
        <h1 className="checkout__price">
          {`$${total}`}
        </h1>
        <p className="checkout__items">
          {`Total for ${totalItems} items`}
        </p>
      </div>
      <button
        type="button"
        className="checkout__button"
        onClick={() => onClick(true)}
      >
        Checkout
      </button>
      {isClicked && (
        <div className="checkout__sorry">
          <p className="checkout__sorry-message">
            We are sorry, but this feature is not implemented yet
          </p>
          <button
            type="button"
            className="checkout__sorry-close"
            onClick={() => onClick(false)}
          >
            <img
              src="/icons/close.svg"
              alt="Delete"
              className="checkout__sorry-image"
            />
          </button>
        </div>
      )}
    </div>
  );
};
