import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './HotPrice.scss';

interface Props {
  phones: Product[];
}

export const HotPrice: React.FC<Props> = ({ phones }) => {
  const brendContainer = useRef<HTMLDivElement | null>(null);
  const [phonesStorge, setPhonesStorge] = useState<Product[]>([]);
  const [phonesShow, setPhonesShow] = useState<Product[]>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);

  useEffect(() => {
    if (!phones) {
      return;
    }

    const indexToShow = new Set<number>();
    const phonesList: Product[] = [];

    const maxCount = Math.min(4, phones?.length || 0);

    while (phonesList.length < maxCount) {
      const number = Math.floor(Math.random() * phones?.length);

      if (!indexToShow.has(number)) {
        indexToShow.add(number);
        phonesList.push(phones[number]);
      }
    }

    setPhonesShow(phonesList);
    setPhonesStorge(JSON.parse(localStorage.getItem('phones') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [phones]);

  const scrollLeft = () => {
    if (brendContainer.current) {
      const cardWidth =
        document.querySelector('.brend__bottom-phone-card')?.clientWidth || 0;

      brendContainer.current.scrollBy({
        left: -cardWidth,
      });
    }
  };

  const scrollRight = () => {
    if (brendContainer.current) {
      const cardWidth =
        document.querySelector('.brend__bottom-phone-card')?.clientWidth || 0;

      brendContainer.current.scrollBy({
        left: cardWidth,
      });
    }
  };

  return (
    <section className="hot-price">
      <div className="content-hot-price">
        <div className="hot-price__top">
          <h2 className="hot-price__top-h2">Hot prices</h2>

          <div className="hot-price__top-buttons">
            <div
              className="hot-price__top-buttons-button button-01"
              onClick={() => scrollLeft()}
            >
              <div className="hot-price__top-buttons-button-left left"></div>
            </div>

            <div
              className="hot-price__top-buttons-button button-02"
              onClick={() => scrollRight()}
            >
              <div className="hot-price__top-buttons-button-right right"></div>
            </div>
          </div>
        </div>

        <div className="hot-price__bottom" ref={brendContainer}>
          {phonesShow.map(p => {
            return (
              <article key={p.id} className="hot-price__bottom-card">
                <div className="hot-price__bottom-card-content">
                  <Link
                    state={{ from: 'Home' }}
                    className="link-img"
                    to={`product/${p.name}`}
                  >
                    <img
                      className="hot-price__bottom-card-img"
                      src={p.images[0]}
                      alt="Phone-img"
                    />
                  </Link>

                  <Link
                    className="hot-price__bottom-card-name"
                    to={`product/${p.name}`}
                    state={{ from: 'Home' }}
                  >
                    <span className="hot-price__bottom-card-name-text">
                      {p.name}
                    </span>
                  </Link>

                  <div className="hot-price__bottom-card-prices">
                    <div className="hot-price__bottom-card-prices-regular">{`$${p.priceRegular}`}</div>
                    <div className="hot-price__bottom-card-prices-discount">{`$${p.priceDiscount}`}</div>
                  </div>

                  <div className="hot-price__bottom-card-characteristics">
                    <div className="hot-price__bottom-card-characteristics-item">
                      <div className="characteristics-text first">Screen</div>
                      <div className="characteristics-text screen-text">
                        {p.screen}
                      </div>
                    </div>

                    <div className="hot-price__bottom-card-characteristics-item">
                      <div className="characteristics-text first">Capacity</div>
                      <div className="characteristics-text">{p.capacity}</div>
                    </div>

                    <div className="hot-price__bottom-card-characteristics-item">
                      <div className="characteristics-text first">RAM</div>
                      <div className="characteristics-text">{p.ram}</div>
                    </div>
                  </div>

                  <div className="hot-price__bottom-card-down">
                    <button
                      className={classNames(
                        'hot-price__bottom-card-down-button',
                        {
                          'in-cart': elementsCart.some(obj => obj.id === p.id),
                        },
                      )}
                      onClick={() => {
                        const elements = addInCart(p);

                        setElementsCart(elements);
                      }}
                    >
                      {elementsCart.some(obj => obj.id === p.id)
                        ? 'Added to cart'
                        : 'Add to card'}
                    </button>

                    <div
                      className="hot-price__bottom-card-down-button-save"
                      onClick={() => {
                        const updated = togglePhoneInStorage(p, 'phones');

                        setPhonesStorge(updated);
                      }}
                    >
                      <div
                        className={classNames(
                          'hot-price__bottom-card-down-button-save-img',
                          {
                            'is-phone-favourites': phonesStorge?.some(
                              item => item.id === p.id,
                            ),
                          },
                        )}
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
