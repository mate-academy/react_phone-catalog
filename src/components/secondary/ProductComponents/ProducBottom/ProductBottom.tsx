import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { useContext, useEffect, useRef, useState } from 'react';
import { phonesContext } from '../../../primary/HomePage';
import classNames from 'classnames';
import './ProductBottom.scss';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';

export const ProductBottom = () => {
  const phones = useContext(phonesContext);
  const container = useRef<HTMLDivElement | null>(null);
  const [showPhones, setShowPhones] = useState<Product[]>([]);
  const [phonesStorge, setPhonesStorge] = useState<Product[]>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);

  useEffect(() => {
    if (!phones) {
      return;
    }

    const phonesLength = phones.length;
    const phonesList: Product[] = [];
    const index = new Set<number>();

    while (phonesList.length < 5) {
      const number = Math.floor(Math.random() * phonesLength);

      if (!index.has(number)) {
        index.add(number);
        phonesList.push(phones[number]);
      }
    }

    setShowPhones(phonesList);

    setPhonesStorge(JSON.parse(localStorage.getItem('phones') || '[]'));
  }, [phones]);

  if (!phones) {
    return null;
  }

  const scrollLeft = () => {
    if (container.current) {
      const cardWidth = document.querySelector('.card')?.clientWidth || 0;

      container.current.scrollBy({
        left: -cardWidth,
      });
    }
  };

  const scrollRight = () => {
    if (container.current) {
      const cardWidth = document.querySelector('.card')?.clientWidth || 0;

      container.current.scrollBy({
        left: cardWidth,
      });
    }
  };

  return (
    <section className="product-bottom">
      <div className="scroll-container">
        <div className="scroll-container-top">
          <h2 className="scroll-container-top__h2">You may also like</h2>

          <div className="scroll-container-top__buttons">
            <div
              className="scroll-container-top__buttons-button"
              onClick={() => scrollLeft()}
            >
              <div className="scroll-container-top__buttons-left"></div>
            </div>

            <div
              className="scroll-container-top__buttons-button"
              onClick={() => scrollRight()}
            >
              <div className="scroll-container-top__buttons-right"></div>
            </div>
          </div>
        </div>

        <div ref={container} className="scroll-container-content">
          {showPhones.map(p => {
            return (
              <article key={p.id} className="card">
                <div className="card__content">
                  <a href={`/product/${p.name}`}>
                    <img
                      className="card__content-img"
                      src={`../../../../../public/${p.images[0]}`}
                      alt="Phone-img"
                    />
                  </a>

                  <a className="card__content-name" href={`/product/${p.name}`}>
                    {p.name}
                  </a>

                  <div className="card__content-prices">
                    <div className="card__content-prices-regular">{`$${p.priceRegular}`}</div>
                    <div className="card__content-prices-discount">{`$${p.priceDiscount}`}</div>
                  </div>

                  <div className="card__content-characteristics">
                    <div className="card__content-characteristics-item">
                      <div className="characteristics-text first">Screen</div>
                      <div className="characteristics-text screen-text">
                        {p.screen}
                      </div>
                    </div>

                    <div className="card__content-characteristics-item">
                      <div className="characteristics-text first">Capacity</div>
                      <div className="characteristics-text">{p.capacity}</div>
                    </div>

                    <div className="card__content-characteristics-item">
                      <div className="characteristics-text first">RAM</div>
                      <div className="characteristics-text">{p.ram}</div>
                    </div>
                  </div>

                  <div className="card__content-down">
                    <button
                      className={classNames('card__content-down-add', {
                        'is-element-in-cart': elementsCart.some(
                          el => el.id === p.id,
                        ),
                      })}
                      onClick={() => {
                        const elements = addInCart(p);

                        setElementsCart(elements);
                      }}
                    >
                      Add to cart
                    </button>
                    <div
                      className="card__content-down-save"
                      onClick={() => {
                        const updated = togglePhoneInStorage(p, 'phones');

                        setPhonesStorge(updated);
                      }}
                    >
                      <div
                        className={classNames('card__content-down-save-img', {
                          'is-phone-favourites': phonesStorge?.some(
                            item => item.id === p.id,
                          ),
                        })}
                      ></div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
