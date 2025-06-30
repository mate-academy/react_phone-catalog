import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useRef, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './HotPrice.scss';

interface Props {
  phones: Product[];
}

export const HotPrice: React.FC<Props> = ({ phones }) => {
  const [phonesStorge, setPhonesStorge] = useState<Product[]>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);
  const [prevEl, setPrevEl] = useState<HTMLDivElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!phones) {
      return;
    }

    setPhonesStorge(JSON.parse(localStorage.getItem('phones') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [phones]);

  return (
    <section className="hot-price">
      <div className="content-hot-price">
        <div className="hot-price__top">
          <h2 className="hot-price__top-h2">Hot prices</h2>

          <div className="hot-price__top-buttons">
            <div
              ref={node => setPrevEl(node)}
              className="hot-price__top-buttons-button button-01"
            >
              <div className="hot-price__top-buttons-button-left left"></div>
            </div>

            <div
              ref={node => setNextEl(node)}
              className="hot-price__top-buttons-button button-02"
            >
              <div className="hot-price__top-buttons-button-right right"></div>
            </div>
          </div>
        </div>

        <Swiper
          className="hot-price__bottom"
          spaceBetween={16}
          navigation={{ prevEl, nextEl }}
          modules={[Navigation]}
          slidesPerView="auto"
          onSwiper={swiper => {
            if (swiper.navigation) {
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
        >
          {phones.map(p => {
            return (
              <SwiperSlide>
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
                        <div className="characteristics-text first">
                          Capacity
                        </div>
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
                            'in-cart': elementsCart.some(
                              obj => obj.id === p.id,
                            ),
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
