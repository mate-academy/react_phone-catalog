import useAppContext from '../../../useAppContext';
import './BasketCheckout.scss';

const BasketCheckout = () => {
  const { baskets, handleCheckout } = useAppContext();
  const totalSum = baskets.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const totalItems = baskets.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  return (
    <>
      {baskets.length > 0 && (
        <div className="basket-checkout">
          <div className="basket-checkout__sum">${totalSum}</div>
          <p className="basket-checkout__counter--items">
            Total for {totalItems} items
          </p>
          <button className="basket-checkout__button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </>
  );
};

export default BasketCheckout;
