import { BasketProduct } from '../../../types/BasketProduct';
import './BasketCheckout.scss';

type BasketCheckoutProps = {
  baskets: BasketProduct[];
};

const BasketCheckout = ({ baskets }: BasketCheckoutProps) => {
  const totalSum = baskets.reduce((sum, product) => sum + product.price, 0);

  return (
    <>
      <div className="basket-checkout">
        <div className="basket-checkout__sum">${totalSum}</div>
        <p className="basket-checkout__counter--items">
          Total for {baskets.length} items
        </p>
        <button className="basket-checkout__button">Checkout</button>
      </div>
    </>
  );
};

export default BasketCheckout;
