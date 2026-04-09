import { FavoriteProduct } from '../../../types/FavoriteProduct';
import './BasketCheckout.scss';

type BasketCheckoutProps = {
  baskets: FavoriteProduct[];
};

const BasketCheckout = ({ baskets }: BasketCheckoutProps) => {
  return (
    <>
      <div className="basket-checkout">
        <div className="basket-checkout__sum">$</div>
        <p className="basket-chekout__counter--items">
          Total for {baskets.length} items
        </p>
        <button className="basket-checkout__button">Checkout</button>
      </div>
    </>
  );
};

export default BasketCheckout;
