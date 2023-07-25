import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoriteContext } from '../../../FavoriteContext';
import products from '../../../new/products.json';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './Basket.scss';
import { BasketButton } from './BasketButton';
import PrevArrow from './BasketImage/PrevArrow.svg';
import { BlockBasket } from './BlockBasket';

export const Basket = () => {
  const [sumPrice, setSumPrice] = useState(0);
  const navigation = useNavigate();
  const { basketLength } = useFavoriteContext();
  const { basket } = useFavoriteContext();

  const filtration = products.filter(
    (product) => basket.includes(product.phoneId.toString())
      || basket.includes(product.phoneId.toString()),
  );

  useEffect(() => {
    let totalPrice = 0;

    filtration.forEach((product) => {
      totalPrice += product.price;
    });
    setSumPrice(totalPrice);
  }, [filtration]);

  return (
    <>
      {basketLength < 1 ? (
        <NotFoundPage
          title="Basket"
          h1="Basket Products not found"
          text="The products are not selected.
       To make a choice, please return to the"
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

          <h1 className="h1ForBasket">
            Cart
          </h1>

          <div className={`block-for-contentBasket ${filtration.length < 4 ? 'isActive-forVH' : ''}`}>
            <div
              className="blockBasket"
            >
              {filtration.map((product) => (
                <BlockBasket key={product.phoneId} product={product} />
              ))}
            </div>

            <div className="block-for-Checkout">
              <h1 className="block-for-Checkout-price">{`$${sumPrice}`}</h1>
              <p
                className="block-for-Checkout-text"
                data-cy="productQauntity"
              >
                {`Total for ${basket.length} items`}
              </p>
              <BasketButton />
            </div>
          </div>
        </>
      )}
    </>

  );
};
