import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Phone } from '../../../../types/Phone';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './ProductDetails.scss';

interface Props {
  phone: Phone | null;
}

export const ProductDetails: React.FC<Props> = ({ phone }) => {
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeCapacity, setActiveCapacity] = useState<string>('');
  const [primaryImg, setPrimaryImg] = useState<string | null>(null);
  const [phonesStorge, setPhonesStorge] = useState<Phone[]>([]);
  const [elementsCart, setElementsCart] = useState<Phone[]>([]);

  useEffect(() => {
    if (phone !== null) {
      setPrimaryImg(phone.images[0]);
    }

    setPhonesStorge(JSON.parse(localStorage.getItem('phones') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [phone]);

  if (phone === null) {
    return null;
  }

  return (
    <article className="product-details">
      <div className="product-details__images">
        <img
          src={`../../../../../public/${primaryImg}`}
          alt="Primary-img"
          className="product-details__images-primary"
        />

        <ul className="product-details__images-list">
          {phone.images.map(el => {
            return (
              <li
                key={el}
                className={classNames('product-details__images-list-item', {
                  'primary-img': el === primaryImg,
                })}
                onClick={() => setPrimaryImg(el)}
              >
                <img
                  src={`../../../../public/${el}`}
                  alt="list-img"
                  className="product-details__images-list-item-img"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="product-details__blocks">
        <div className="product-colors">
          <div className="product-colors__top">
            <p className="product-colors__top-p">Available colors</p>
            <p className="product-colors__top-id">ID: 802390</p>
          </div>

          <ul className="product-colors__list">
            {phone.colorsAvailable.map(color => {
              return (
                <li
                  key={color}
                  className={classNames('product-colors__list-item', {
                    'set-active-color': activeColor === color,
                  })}
                  onClick={() => {
                    setActiveColor(color);
                  }}
                >
                  <div
                    className="list-item__content"
                    style={{
                      backgroundColor: color,
                    }}
                  ></div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="product-capacity">
          <p className="product-capacity__p">Select capacity</p>

          <ul className="product-capacity__list">
            {phone.capacityAvailable.map(capacity => {
              return (
                <li
                  key={capacity}
                  className={classNames('product-capacity__list-item', {
                    'set-active-capacity': activeCapacity === capacity,
                  })}
                  onClick={() => {
                    setActiveCapacity(capacity);
                  }}
                >
                  {capacity}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="product-price">
          <div className="product-price__prices">
            <p className="product-price__prices-regular">
              ${phone.priceRegular}
            </p>

            <p className="product-price__prices-discount">
              ${phone.priceDiscount}
            </p>
          </div>

          <div className="product-price__buttons ">
            <button
              className={classNames('product-price__buttons-cart', {
                'is-element-in-cart': elementsCart.some(
                  el => el.id === phone.id,
                ),
              })}
              onClick={() => {
                const elements = addInCart(phone);

                setElementsCart(elements);
              }}
            >
              Add to cart
            </button>

            <button
              className="product-price__buttons-favourites"
              onClick={() => {
                const updated = togglePhoneInStorage(phone, 'phones');

                setPhonesStorge(updated);
              }}
            >
              <div
                className={classNames(
                  'product-price__buttons-favourites-icon',
                  {
                    'is-phone-favourites': phonesStorge?.some(
                      item => item.id === phone.id,
                    ),
                  },
                )}
              ></div>
            </button>
          </div>
        </div>

        <ul className="characteristics">
          <li className="characteristics__item">
            <div>Screen</div>
            <div>{phone.screen}</div>
          </li>
          <li className="characteristics__item">
            <div>Resolution</div>
            <div>{phone.resolution}</div>
          </li>
          <li className="characteristics__item">
            <div>processor</div>
            <div>{phone.processor}</div>
          </li>
          <li className="characteristics__item">
            <div>RAM</div>
            <div>{phone.ram}</div>
          </li>
        </ul>
      </div>
    </article>
  );
};
