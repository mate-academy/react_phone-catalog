import { Link, NavLink } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../Main/Main.module.scss';
import products from '../../../../../public/api/products.json';
import phones from '../../../../../public/api/phones.json';
import tablets from '../../../../../public/api/tablets.json';
import accessories from '../../../../../public/api/accessories.json';
import { CartContext } from '../../../../CartContext';
import { FavouritesContext } from '../../../../FavouritesContext';
import classNames from 'classnames';

export const Main: React.FC = () => {
  const [newModelsPrevDisabled, setNewModelsPrevDisabled] = useState(true);
  const [newModelsNextDisabled, setNewModelsNextDisabled] = useState(false);

  const [hotPrevDisabled, setHotPrevDisabled] = useState(true);
  const [hotNextDisabled, setHotNextDisabled] = useState(false);

  const newModelsRef = useRef<HTMLDivElement | null>(null);
  const hotPricesRef = useRef<HTMLDivElement | null>(null);

  const cartContext = React.useContext(CartContext);
  const isInCart = (productId: string) => {
    return cartContext?.items.some(item => item.id === productId);
  };

  const favouritesContext = React.useContext(FavouritesContext);
  const isInFavourites = (productId: string) => {
    return favouritesContext?.favItems.some(item => item.itemId === productId);
  };

  const updateButtonsState = (
    ref: React.RefObject<HTMLDivElement>,
    setPrev: (v: boolean) => void,
    setNext: (v: boolean) => void,
  ) => {
    if (!ref.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    setPrev(scrollLeft === 0);
    setNext(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'prev' | 'next',
  ) => {
    if (!ref.current) {
      return;
    }

    const firstCard = ref.current.children[0] as HTMLElement;
    const gap = 16;
    const offset = firstCard.offsetWidth + gap;

    ref.current.scrollBy({
      left: direction === 'prev' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateButtonsState(
      newModelsRef,
      setNewModelsPrevDisabled,
      setNewModelsNextDisabled,
    );

    updateButtonsState(hotPricesRef, setHotPrevDisabled, setHotNextDisabled);
  }, []);

  const getNewestReleaseYear = () => {
    const years: number[] = [];

    products.map(product => years.push(product.year));
    years.sort((a, b) => a - b);

    return years[years.length - 1];
  };

  const newModelsYear = getNewestReleaseYear();
  const newModels = products.filter(product => product.year === newModelsYear);
  const hotPrisesModels = [...products].sort(
    (a, b) => b.fullPrice - a.fullPrice,
  );

  return (
    <main className={styles.main}>
      <section className={styles.models}>
        <div className={styles['models__title-container']}>
          <h2 className={styles['section-title']}>
            Brand new <br className={styles['title-break']} />
            models
          </h2>
          <div className={styles.models__buttons}>
            <button
              className={`${styles.models__button} ${styles['models__button--left']}`}
              onClick={() => scroll(newModelsRef, 'prev')}
              disabled={newModelsPrevDisabled}
            ></button>

            <button
              className={`${styles.models__button} ${styles['models__button--right']}`}
              onClick={() => scroll(newModelsRef, 'next')}
              disabled={newModelsNextDisabled}
            ></button>
          </div>
        </div>
        <div
          className={styles.models__container}
          ref={newModelsRef}
          onScroll={() =>
            updateButtonsState(
              newModelsRef,
              setNewModelsPrevDisabled,
              setNewModelsNextDisabled,
            )
          }
        >
          {newModels.map(newModel => (
            <div key={newModel.id} className={styles['product-card']}>
              <div className={styles['inner-wrapper']}>
                <Link to={`/product/${newModel.itemId}`}>
                  <img
                    className={styles['product-card__image']}
                    src={newModel.image}
                    alt="model-image"
                  />
                </Link>
                <Link
                  to={`/product/${newModel.itemId}`}
                  className={styles.product__link}
                >
                  <h4 className={styles['product-card__name']}>
                    {newModel.name}
                  </h4>
                </Link>
              </div>
              <h3
                className={styles['product-card__price']}
              >{`$${newModel.price}`}</h3>
              <div className={styles['product-card__line']}></div>
              <div className={styles['product-card__details']}>
                <h4 className={styles['product-card__details__name']}>
                  Screen
                </h4>
                <h4 className={styles['product-card__details__value']}>
                  {newModel.screen}
                </h4>
              </div>
              <div className={styles['product-card__details']}>
                <h4 className={styles['product-card__details__name']}>
                  Capacity
                </h4>
                <h4 className={styles['product-card__details__value']}>
                  {newModel.capacity}
                </h4>
              </div>
              <div className={styles['product-card__details']}>
                <h4 className={styles['product-card__details__name']}>RAM</h4>
                <h4 className={styles['product-card__details__value']}>
                  {newModel.ram}
                </h4>
              </div>
              <div className={styles['product-card__buttons']}>
                <button
                  className={styles['product-card__buttons__cart']}
                  onClick={() => cartContext?.addItem(newModel)}
                  disabled={isInCart(newModel.itemId)}
                >
                  {isInCart(newModel.itemId) ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  className={classNames(
                    styles['product-card__buttons__favourites'],
                    {
                      [styles['product-card__buttons__favourites--red']]:
                        isInFavourites(newModel.itemId),
                    },
                  )}
                  onClick={() =>
                    isInFavourites(newModel.itemId)
                      ? favouritesContext?.deleteItem(newModel.itemId)
                      : favouritesContext?.addItem(newModel)
                  }
                ></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.categories__container}>
          <h2 className={styles['section-title']}>Shop by category</h2>

          <div className={`${styles.category} ${styles['category--phones']}`}>
            <NavLink
              className={`${styles.category__image} ${styles['category__image--phones']}`}
              to="/phones"
            ></NavLink>
            <div className={styles.category__info}>
              <h3 className={styles.category__name}>Mobile phones</h3>
              <h4
                className={styles['category__number-of-items']}
              >{`${phones.length} models`}</h4>
            </div>
          </div>
          <div className={`${styles.category} ${styles['category--tablets']}`}>
            <NavLink
              className={`${styles.category__image} ${styles['category__image--tablets']}`}
              to="/tablets"
            ></NavLink>
            <div className={styles.category__info}>
              <h3 className={styles.category__name}>Tablets</h3>
              <h4
                className={styles['category__number-of-items']}
              >{`${tablets.length} models`}</h4>
            </div>
          </div>
          <div
            className={`${styles.category} ${styles['category--accessories']}`}
          >
            <NavLink
              className={`${styles.category__image} ${styles['category__image--accessories']}`}
              to="/accessories"
            ></NavLink>
            <div className={styles.category__info}>
              <h3 className={styles.category__name}>Accessories</h3>
              <h4
                className={styles['category__number-of-items']}
              >{`${accessories.length} models`}</h4>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['hot-prices']}>
        <div className={styles['models__title-container']}>
          <h2 className={styles['section-title']}>Hot prices</h2>
          <div className={styles.models__buttons}>
            <button
              className={`${styles.models__button} ${styles['models__button--left']}`}
              onClick={() => scroll(hotPricesRef, 'prev')}
              disabled={hotPrevDisabled}
            ></button>

            <button
              className={`${styles.models__button} ${styles['models__button--right']}`}
              onClick={() => scroll(hotPricesRef, 'next')}
              disabled={hotNextDisabled}
            ></button>
          </div>
        </div>
        <div
          className={styles.models__container}
          ref={hotPricesRef}
          onScroll={() =>
            updateButtonsState(
              hotPricesRef,
              setHotPrevDisabled,
              setHotNextDisabled,
            )
          }
        >
          {hotPrisesModels.map(hotPriseModel => (
            <div key={hotPriseModel.id} className={styles['product-card']}>
              <div className={styles['inner-wrapper']}>
                <Link to={`/product/${hotPriseModel.itemId}`}>
                  <img
                    className={styles['product-card__image']}
                    src={hotPriseModel.image}
                    alt="model-image"
                  />
                </Link>
                <Link
                  to={`/product/${hotPriseModel.itemId}`}
                  className={styles.product__link}
                >
                  <h4 className={styles['product-card__name']}>
                    {hotPriseModel.name}
                  </h4>
                </Link>
              </div>
              <div className={styles['product-card__prices']}>
                <h3
                  className={styles['product-card__price']}
                >{`$${hotPriseModel.price}`}</h3>
                <h3
                  className={styles['product-card__full-price']}
                >{`$${hotPriseModel.fullPrice}`}</h3>
              </div>
              <div className={styles['product-card__line']}></div>
              <div className={styles['product-card__details']}>
                <h4 className={styles['product-card__details__name']}>
                  Screen
                </h4>
                <h4 className={styles['product-card__details__value']}>
                  {hotPriseModel.screen}
                </h4>
              </div>
              <div className={styles['product-card__details']}>
                <h4 className={styles['product-card__details__name']}>
                  Capacity
                </h4>
                <h4 className={styles['product-card__details__value']}>
                  {hotPriseModel.capacity}
                </h4>
              </div>
              <div className={styles['product-card__details']}>
                <h4 className={styles['product-card__details__name']}>RAM</h4>
                <h4 className={styles['product-card__details__value']}>
                  {hotPriseModel.ram}
                </h4>
              </div>
              <div className={styles['product-card__buttons']}>
                <button
                  className={styles['product-card__buttons__cart']}
                  onClick={() => cartContext?.addItem(hotPriseModel)}
                  disabled={isInCart(hotPriseModel.itemId)}
                >
                  {isInCart(hotPriseModel.itemId)
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <button
                  className={classNames(
                    styles['product-card__buttons__favourites'],
                    {
                      [styles['product-card__buttons__favourites--red']]:
                        isInFavourites(hotPriseModel.itemId),
                    },
                  )}
                  onClick={() =>
                    isInFavourites(hotPriseModel.itemId)
                      ? favouritesContext?.deleteItem(hotPriseModel.itemId)
                      : favouritesContext?.addItem(hotPriseModel)
                  }
                ></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
