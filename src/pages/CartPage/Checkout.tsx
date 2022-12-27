import { FC, useMemo } from 'react';
import { Product } from 'src/types/Product';
import { getTotalPrice } from 'src/utils/helpers/getTotalPrice';
import { getTotalProducts } from 'src/utils/helpers/getTotalProducts';

type Props = {
  cartProducts: Product[],
};

export const Checkout: FC<Props> = ({ cartProducts }) => {
  const totalPrice = useMemo(() => {
    return getTotalPrice(cartProducts);
  }, [cartProducts]);

  const totalProducts = getTotalProducts(cartProducts);

  return (
    <div className="cart-section__checkout">
      <div className="cart-section__checkout-price-wrapper">
        <div className="cart-section__checkout-price">
          {`$${totalPrice}`}
        </div>

        <div className="cart-section__checkout-total">
          {`Total for ${totalProducts} items`}
        </div>
      </div>

      <div className="cart-section__checkout-button-wrapper">
        <button
          type="button"
          className="cart-section__checkout-button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
