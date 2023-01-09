import { FC, useMemo, useState } from 'react';
import { Product } from 'src/types/Product';
import { getTotalPrice } from 'src/utils/helpers/getTotalPrice';
import { getTotalProducts } from 'src/utils/helpers/getTotalProducts';
import './Checkout.scss';

type Props = {
  cartProducts: Product[],
};

export const Checkout: FC<Props> = ({ cartProducts }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const totalPrice = useMemo(() => {
    return getTotalPrice(cartProducts);
  }, [cartProducts]);

  const totalProducts = getTotalProducts(cartProducts);
  const handleOnClick = () => {
    setIsCheckout(true);

    setTimeout(() => {
      setIsCheckout(false);
    }, 5000);
  };

  return (
    <>
      <div className="cart-section__checkout">
        <div className="cart-section__checkout-wrapper">
          <div className="cart-section__checkout-price-wrapper">
            <div className="cart-section__checkout-price">
              {`$${totalPrice}`}
            </div>

            <div
              className="cart-section__checkout-total"
              data-cy="productQauntity"
            >
              {`Total for ${totalProducts} items`}
            </div>
          </div>

          <div className="cart-section__checkout-button-wrapper">
            <button
              type="button"
              className="cart-section__checkout-button"
              onClick={handleOnClick}
            >
              Checkout
            </button>
          </div>
        </div>

        {isCheckout && (
          <div className="cart-section__checkout-message">
            I need some back end here ;(
          </div>
        )}
      </div>

    </>
  );
};
