import { useState } from 'react';
import classNames from 'classnames';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import { Phone } from '../../types/Phone';
import { CartItem } from '../../types/CartItem';

type Props = {
  phones: Phone[],
  products: Phone[],
  title: string,
  likedProducts: Phone[],
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const PhoneSlider: React.FC<Props> = ({
  phones,
  title,
  products,
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  const visibleCount = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleCount;

  return (
    <div className="hot-phones">
      <div
        className="hot-phones__content"
        data-cy="productList"
      >
        <div className="hot-phones__top">
          <h1 className="hot-phones__title title">
            {title}
          </h1>

          <div className="hot-phones__buttons">
            <button
              type="button"
              className={classNames(
                'hot-phones__button hot-phones__button--left', {
                  'hot-phones__button--disabled--left': start <= 0,
                },
              )}
              onClick={() => setStart((prev) => prev - 1)}
              disabled={start === 0}
            >
              <p hidden>
                left button
              </p>
            </button>

            <button
              type="button"
              className={classNames(
                'hot-phones__button hot-phones__button--right', {
                  'hot-phones__button--disabled--right':
                    end > phones.length - 1,
                },
              )}
              onClick={() => setStart((prev) => prev + 1)}
              disabled={end === 0}
            >
              <p hidden>
                right button
              </p>
            </button>
          </div>
        </div>

        <div
          className="hot-phones__phones"
        >
          {products.slice(start, end).map((phone: Phone) => (
            <PhoneCard
              phone={phone}
              key={phone.id}
              likedProducts={likedProducts}
              setLikedProducts={setLikedProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
