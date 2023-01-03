import { useContext, useEffect, useState } from 'react';
import { NoResults } from '../additional/NoResults';
import { CartProducts } from '../context/SavedProductsContext';

export const Checkout = () => {
  const { cartProducts } = useContext(CartProducts);
  const [isCheckout, setIsCheckout] = useState(false);
  const [totalProducts, setTotalProducts] = useState<number | undefined>(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cartProducts.length > 0) {
      const allQuantity = cartProducts.map(p => p.quantity);
      const quantitySum = allQuantity.reduce(
        (prev, current) => prev && current && prev + current,
      );

      let priceSum = 0;
      const prices = document.querySelectorAll('.cart-list__products__price');

      prices.forEach(item => {
        priceSum += Number(item.textContent?.slice(1));
      });

      setTotalProducts(quantitySum);
      setTotalPrice(priceSum);
    }
  }, [cartProducts]);

  return (
    <div className="cart-checkout">
      <div className="cart-checkout__info">

        <p className="cart-checkout__info__price">
          {`$${totalPrice}`}
        </p>

        <p className="cart-checkout__info__total">
          {`Total for ${totalProducts} items`}
        </p>
      </div>

      <button
        className="cart-checkout__button"
        type="button"
        onClick={() => {
          setIsCheckout(true);
          setTimeout(() => setIsCheckout(false), 3000);
        }}
      >
        Checkout
      </button>

      {isCheckout && (
        <NoResults
          text="We are sorry, but this feature is not implemented yet"
          isShowButton={false}
          additionalClass="cart-checkout__text"
        />
      )}

    </div>
  );
};
