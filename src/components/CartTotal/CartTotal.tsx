import './CartTotal.scss';

type Props = {
  total: number;
  itemsCount: number;
};

export const CartTotal: React.FC<Props> = ({ total, itemsCount }) => {
  return (
    <div className="CartTotal">
      <div className="CartTotal__info">
        <p className="CartTotal__info-price">
          {`$${total}`}
        </p>
        <p className="CartTotal__info-items">
          {`Total for ${itemsCount} items`}
        </p>
      </div>
      <div className="CartTotal__divider" />
      <button type="button" className="primary-button wide CartTotal__button">
        Checkout
      </button>
    </div>
  );
};
