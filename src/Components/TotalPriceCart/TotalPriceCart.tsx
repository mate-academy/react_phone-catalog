import { FC, useState } from 'react';

type Props = {
  totalPrice: number,
  totalProducts: number,
};

export const TotalPriceCart: FC<Props> = ({
  totalPrice,
  totalProducts,
}) => {
  const [isMessage, setIsMessage] = useState(false);

  const hendlerShowMessage = () => {
    setIsMessage(true);
  };

  return (
    <div className="totalPrice">
      <div className="totalPrice__priceBlock">
        <p
          className="totalPrice__price"
          data-cy="productQauntity"
        >
          {`$${totalPrice}`}
        </p>
        <p className="totalPrice__priceForItems">{`Total for ${totalProducts} items`}</p>
      </div>
      <button
        type="button"
        className="buttonAdd totalPrice__button"
        onClick={hendlerShowMessage}
      >
        Checkout
      </button>

      {isMessage && (
        <p className="totalPrice__message">
          We are sorry, but this feature is not implemented yet
        </p>
      )}
    </div>
  );
};
