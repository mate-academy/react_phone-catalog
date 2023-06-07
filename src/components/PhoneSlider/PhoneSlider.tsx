import { useState } from 'react';
import classNames from 'classnames';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import { Phone } from '../../types/Phone';

type Props = {
  phones: Phone[],
  products: Phone[],
  title: string,
};

export const PhoneSlider: React.FC<Props> = ({ phones, products, title }) => {
  const visibleCount = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleCount;

  return (
    <div className="hot-phones">
      <div className="hot-phones__content">
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
            <PhoneCard phone={phone} key={phone.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
