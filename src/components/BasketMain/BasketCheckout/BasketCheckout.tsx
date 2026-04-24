import useAppContext from '../../../useAppContext';
import './BasketCheckout.scss';

const BasketCheckout = () => {
  const { baskets } = useAppContext();
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
      <div className="basket-checkout">
        <div className="basket-checkout__sum">${totalSum}</div>
        <p className="basket-checkout__counter--items">
          Total for {totalItems} items
        </p>
        <button className="basket-checkout__button">Checkout</button>
      </div>
    </>
  );
};

export default BasketCheckout;
