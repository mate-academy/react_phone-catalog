import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './ProductDetails.scss';

interface Props {
  product: Product | null;
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeCapacity, setActiveCapacity] = useState<string>('');
  const [primaryImg, setPrimaryImg] = useState<string | null>(null);
  const [phonesStorge, setPhonesStorge] = useState<Product[]>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);

  useEffect(() => {
    if (product !== null) {
      setPrimaryImg(product.images[0]);
    }

    setPhonesStorge(JSON.parse(localStorage.getItem('phones') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [product]);

  if (product === null) {
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
          {product.images.map(el => {
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
            {product.colorsAvailable.map(color => {
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
            {product.capacityAvailable.map(capacity => {
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
              ${product.priceRegular}
            </p>

            <p className="product-price__prices-discount">
              ${product.priceDiscount}
            </p>
          </div>

          <div className="product-price__buttons ">
            <button
              className={classNames('product-price__buttons-cart', {
                'is-element-in-cart': elementsCart.some(
                  el => el.id === product.id,
                ),
              })}
              onClick={() => {
                const elements = addInCart(product);

                setElementsCart(elements);
              }}
            >
              Add to cart
            </button>

            <button
              className="product-price__buttons-favourites"
              onClick={() => {
                const updated = togglePhoneInStorage(product, 'phones');

                setPhonesStorge(updated);
              }}
            >
              <div
                className={classNames(
                  'product-price__buttons-favourites-icon',
                  {
                    'is-phone-favourites': phonesStorge?.some(
                      item => item.id === product.id,
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
            <div>{product.screen}</div>
          </li>
          <li className="characteristics__item">
            <div>Resolution</div>
            <div>{product.resolution}</div>
          </li>
          <li className="characteristics__item">
            <div>processor</div>
            <div>{product.processor}</div>
          </li>
          <li className="characteristics__item">
            <div>RAM</div>
            <div>{product.ram}</div>
          </li>
        </ul>
      </div>
    </article>
  );
};
