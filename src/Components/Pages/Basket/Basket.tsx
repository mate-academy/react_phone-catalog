import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoriteContext }
  from '../../../core/context/FavoriteContext/FavoriteContext';
import products from '../../../new/products.json';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './Basket.scss';
import { BasketButton } from './BasketButton';
import PrevArrow from './BasketImage/PrevArrow.svg';
import { BlockBasket } from './BlockBasket';

export const Basket = () => {
  const { basket, basketLength } = useFavoriteContext();
  const [sumPrice, setSumPrice] = useState(0);
  const navigation = useNavigate();

  const getTotalQuantity = () => {
    let totalQuantity = 0;

    basket.forEach((product) => {
      totalQuantity += product.quantity;
    });

    return totalQuantity;
  };

  const filtration = products.filter(
    (product) => basket.some((item) => item.id === product.phoneId.toString()),
  );

  useEffect(() => {
    let totalPrice = 0;

    filtration.forEach((product) => {
      const phoneId = product.phoneId.toString();
      const productInBasket = basket.find((item) => item.id === phoneId);

      if (productInBasket) {
        totalPrice += product.price * productInBasket.quantity;
      }
    });

    setSumPrice(totalPrice);
  }, [basket, filtration]);

  return (
    <>
      {basketLength < 1 ? (
        <NotFoundPage
          title="Cart"
          h1="Basket Products not found"
          text="The products are not selected. To make a choice,
           please return to the"
        />
      ) : (
        <>
          <div className="MainForBasket">
            <div className="prev-to-back">
              <button
                type="button"
                className="prev-to-back"
                onClick={() => navigation(-1)}
              >
                <img src={PrevArrow} alt="PrevArrow" />
                <p className="block-forPageNotFound__text-1-1">Back</p>
              </button>
            </div>
          </div>

          <h1 className="h1ForBasket">Cart</h1>

          <div className={`block-for-contentBasket ${filtration.length < 4 ? 'isActive-forVH' : ''}`}>
            <div className="blockBasket">
              {filtration.map((product) => (
                <BlockBasket key={product.phoneId} product={product} />
              ))}
            </div>

            <div className="block-for-Checkout">
              <h1 className="block-for-Checkout-price">{`$${sumPrice}`}</h1>
              <p className="block-for-Checkout-text" data-cy="productQauntity">
                {`Total for ${getTotalQuantity()} items`}
              </p>
              <BasketButton />
            </div>
          </div>
        </>
      )}
    </>
  );
};
