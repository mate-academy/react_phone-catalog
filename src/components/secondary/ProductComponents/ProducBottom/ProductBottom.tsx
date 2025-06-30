import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './ProductBottom.scss';

interface Props {
  product: Product | null;
  allStore: Product[][];
}

export const ProductBottom: React.FC<Props> = ({ product, allStore }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [showProducts, setShowProducts] = useState<Product[]>([]);
  const [productStorge, setProductStorge] = useState<Product[]>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);
  const [store, setStore] = useState<string>('');

  useEffect(() => {
    if (!product) {
      return;
    }

    const currentStoreIndex = allStore.findIndex(store =>
      store?.some(item => item.name === product.name),
    );

    if (currentStoreIndex === -1) {
      return;
    }

    const currentStore =
      allStore.find(store => store?.some(item => item.name === product.name)) ||
      [];

    console.log(currentStore);

    switch (currentStoreIndex) {
      case 0:
        setStore('phones');
        break;

      case 1:
        setStore('accessories');
        break;

      case 2:
        setStore('tablets');
        break;
    }

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setProductStorge(JSON.parse(localStorage.getItem(store) || '[]'));

    setShowProducts(currentStore);
    setElementsCart(storedCart);
  }, [product, allStore]);

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
          {showProducts.map(p => {
            return (
              <article key={p.id} className="card">
                <div className="card__content">
                  <Link state={{ from: 'Product' }} to={`/product/${p.name}`}>
                    <img
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="card__content-img"
                      src={`/${p.images[0]}`}
                      alt="Phone-img"
                    />
                  </Link>

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
                        const updated = togglePhoneInStorage(p, store);

                        setProductStorge(updated);
                      }}
                    >
                      <div
                        className={classNames('card__content-down-save-img', {
                          'is-phone-favourites': productStorge?.some(
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
