import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Brand.scss';

interface Props {
  phones: Product[];
}

export const Brand: React.FC<Props> = ({ phones }) => {
  const [phonesShow, setPhonesShow] = useState<Product[]>([]);
  const brendContainer = useRef<HTMLDivElement | null>(null);
  const [phonesStorge, setPhonesStorge] = useState<Product[]>([]);
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
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    setPhonesStorge(JSON.parse(localStorage.getItem('phones') || '[]'));
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
    <section className="brend">
      <div className="brend-content">
        <div className="brend__top">
          <h2 className="brend__top-h2">Brand new models</h2>

          <div className="brend__top-buttons">
            <div
              className="brend__top-buttons-button button-01"
              onClick={() => {
                scrollLeft();
              }}
            >
              <div className="brend__top-buttons-button-left left"></div>
            </div>

            <div
              className="brend__top-buttons-button button-02"
              onClick={() => {
                scrollRight();
              }}
            >
              <div className="brend__top-buttons-button-right right"></div>
            </div>
          </div>
        </div>

        <div className="brend__bottom" ref={brendContainer}>
          {phonesShow.map(p => {
            return (
              <article key={p.id} className="brend__bottom-phone-card">
                <div className="brend__bottom-phone-card-content">
                  <Link
                    state={{ from: 'Home' }}
                    className="link-img"
                    to={`product/${p.name}`}
                  >
                    <img
                      className="brend__bottom-phone-card-img"
                      src={p.images[0]}
                      alt="Phone-img"
                    />
                  </Link>

                  <Link
                    to={`product/${p.name}`}
                    state={{ from: 'Home' }}
                    className="brend__bottom-phone-card-name"
                  >
                    <span className="hot-price__bottom-card-name-text">
                      {p.name}
                    </span>
                  </Link>

                  <div className="brend__bottom-phone-card-price">{`$${p.priceRegular}`}</div>

                  <div className="brend__bottom-phone-card-characteristics">
                    <div className="brend__bottom-phone-card-characteristics-item">
                      <div className="characteristics-text first">Screen</div>
                      <div className="characteristics-text screen-text">
                        {p.screen}
                      </div>
                    </div>

                    <div className="brend__bottom-phone-card-characteristics-item">
                      <div className="characteristics-text first">Capacity</div>
                      <div className="characteristics-text">{p.capacity}</div>
                    </div>

                    <div className="brend__bottom-phone-card-characteristics-item">
                      <div className="characteristics-text first">RAM</div>
                      <div className="characteristics-text">{p.ram}</div>
                    </div>
                  </div>

                  <div className="brend__bottom-phone-card-down">
                    <button
                      className={classNames(
                        'brend__bottom-phone-card-down-button',
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
                      className="brend__bottom-phone-card-down-button-save"
                      onClick={() => {
                        const updated = togglePhoneInStorage(p, 'phones');

                        setPhonesStorge(updated);
                      }}
                    >
                      <div
                        className={classNames(
                          'brend__bottom-phone-card-down-button-save-img',
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
