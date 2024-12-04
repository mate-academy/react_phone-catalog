import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import BreadCrumbs from '../shared/BreadCrumbs';
import styles from './CardPage.module.scss';
import Back from '../shared/Back';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContextProvider';
import { DataType, getData, getId } from '../../data/httpClient';
import classNames from 'classnames';
import { CartContext } from '../../contexts/CartContextProvider';
import { LikeContext } from '../../contexts/LikeContextProvider';
import ProductLine from '../shared/ProductLine';

export type SwitchProp = 'COLOR' | 'SIZE';

export const CardPage = () => {
  const { pathname, state } = useLocation();
  const { itemId } = useParams();

  const { cards } = useContext(ProductContext);

  const [dataId, setDataId] = useState(0);
  const [data, setData] = useState<DataType>({
    id: '',
    color: '',
    colorsAvailable: [],
    images: [],
    priceRegular: 0,
    priceDiscount: 0,
    capacityAvailable: [],
    capacity: '',
    resolution: '',
    screen: '',
    zoom: '',
    cell: [],
    ram: '',
    processor: '',
    camera: '',
    description: [],
    category: '',
  });

  const {
    images,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    ram,
    processor,
    camera,
    cell,
    zoom,
    description,
    category,
  } = data;

  const colorsDefault: { [key: string]: string } = {
    midnight: '#1a222b',
    sierrablue: '#9db9d2',
    graphite: '#4d4c48',
  };

  const [currentImage, setCurrentImage] = useState('');

  const { cartCards, setCartCards } = useContext(CartContext);
  const { likeCards, setLikeCards } = useContext(LikeContext);

  const activeCards = cards.find(card => card.itemId === itemId) || null;

  useEffect(() => {
    if (itemId) {
      getData({
        url: `api/${state.category}.json`,
        method: 'GET',
        itemId: itemId || '',
      }).then(response => {
        setData(response);

        setCurrentImage(response.images[0]);
      });

      getId({
        url: 'api/products.json',
        method: 'GET',
        itemId: itemId || '',
      }).then(response => {
        setDataId(response);
      });
    }
  }, [itemId, state.category]);

  const isInCart = cartCards.some(card => card.itemId === itemId);
  const isLiked = likeCards.some(card => card.itemId === itemId);

  const textBtn = isInCart ? 'Added to cart' : 'Add to cart';

  const addToCart = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      setCartCards([
        ...cartCards,
        { ...cards.filter(card => card.itemId === itemId)[0], count: 1 },
      ]);
    } else {
      setCartCards(cartCards.filter(card => card.itemId !== itemId));
    }
  };

  const addToLike = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      setLikeCards(likeCards.filter(card => card.itemId !== itemId));
    } else {
      setLikeCards([
        ...likeCards,
        cards.filter(card => card.itemId === itemId)[0],
      ]);
    }
  };

  const getLink = (arg: string, type: SwitchProp) => {
    if (itemId) {
      switch (type) {
        case 'COLOR': {
          const splittedId = itemId.split('-');

          const lastIndex = splittedId.length - 1;

          splittedId[lastIndex] = arg.toLowerCase();

          const newItemId = splittedId
            .reduce((prev, curr) => prev + curr + '-', '')
            .slice(0, -1);

          return `/${category}/${newItemId}`;
        }

        case 'SIZE': {
          const splittedId = itemId.split('-');

          const lastIndex = splittedId.length - 2;

          splittedId[lastIndex] = arg.toLowerCase();

          const newItemId = splittedId
            .reduce((prev, curr) => prev + curr + '-', '')
            .slice(0, -1);

          return `/${category}/${newItemId}`;
        }
      }
    }

    return '';
  };

  if (activeCards === null) {
    return <Navigate to={state.pathname || '/'} state={state} replace />;
  }

  const name = activeCards?.name || '';

  return (
    <main className={styles.cardPage}>
      <section className={styles.cardPage__crumbs}>
        <BreadCrumbs pathname={pathname} />

        <Back />
      </section>

      <h1 className={styles.cardPage__title}>{name}</h1>

      <section className={styles['cardPage__image-container']}>
        <div className={styles.cardPage__image}>
          <div className={styles['cardPage__image-wrapper']}>
            <img className={styles['cardPage__image-src']} src={currentImage} />
          </div>
        </div>

        <div className={styles.cardPage__images}>
          {images &&
            images.map((img, ind) => {
              return (
                <div
                  key={ind + img}
                  className={classNames(styles.cardPage__imgs, {
                    [styles['cardPage__imgs--active']]: img === currentImage,
                  })}
                  onClick={() => setCurrentImage(img)}
                >
                  <div className={styles['cardPage__image-preview-wrapper']}>
                    <img
                      src={img}
                      className={styles['cardPage__image-preview']}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <section className={styles.cardPage__props}>
        <div className={styles['cardPage__props-main']}>
          <p className={styles['cardPage__colors-title']}>Available colors</p>

          <p className={styles.cardPage__id}>ID: {dataId}</p>
        </div>

        <div className={styles.cardPage__colors}>
          {colorsAvailable.map((c, ind) => {
            return (
              <Link
                to={`${getLink(c, 'COLOR')}`}
                state={state}
                key={c + ind}
                className={classNames(styles.cardPage__color, {
                  [styles['cardPage__color--active']]: c === color,
                })}
              >
                <div
                  className={styles['cardPage__color-inner']}
                  style={{
                    backgroundColor: colorsDefault[c] || c,
                  }}
                ></div>
              </Link>
            );
          })}
        </div>

        <div className={styles.cardPage__sizes}>
          <h3 className={styles['cardPage__size-title']}>Select capacity</h3>

          {capacityAvailable.map((cap, ind) => (
            <Link
              to={`${getLink(cap, 'SIZE')}`}
              key={cap + ind}
              state={state}
              className={classNames(styles['cardPage__size-item'], {
                [styles['cardPage__size-item--active']]: cap === capacity,
              })}
            >
              {cap}
            </Link>
          ))}
        </div>

        <div className={styles.cardPage__purchase}>
          <p className={styles['cardPage__purchase-price']}>
            <span>${priceDiscount}</span>{' '}
            <span
              className={`${styles['cardPage__purchase-price']} ${styles['cardPage__purchase-price--striked']}`}
            >
              ${priceRegular}
            </span>
          </p>
        </div>

        <div className={styles.cardPage__buttons}>
          <a
            className={classNames(
              `${styles.cardPage__btn} ${styles['cardPage__btn--buy']}`,
              {
                [styles['cardPage__btn--active']]: isInCart,
              },
            )}
            onClick={addToCart}
          >
            {textBtn}
          </a>

          <a
            className={classNames(
              `${styles.cardPage__btn} ${styles['cardPage__btn--like']}`,
              { [styles['cardPage__btn--active-link']]: isLiked },
            )}
            onClick={addToLike}
          ></a>
        </div>

        <div className={styles.cardPage__features}>
          <ul className={styles['cardPage__features-list']}>
            <li className={styles.cardPage__feature}>
              <p className={styles['cardPage__feature-title']}>Screen</p>
              <p className={styles['cardPage__feature-value']}>{screen}</p>
            </li>

            <li className={styles.cardPage__feature}>
              <p className={styles['cardPage__feature-title']}>Resolution</p>
              <p className={styles['cardPage__feature-value']}>{resolution}</p>
            </li>

            <li className={styles.cardPage__feature}>
              <p className={styles['cardPage__feature-title']}>Processor</p>
              <p className={styles['cardPage__feature-value']}>{processor}</p>
            </li>

            <li className={styles.cardPage__feature}>
              <p className={styles['cardPage__feature-title']}>RAM</p>
              <p className={styles['cardPage__feature-value']}>{ram}</p>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.cardPage__description}>
        <h2
          className={`${styles.cardPage__title} ${styles['cardPage__title--under']}`}
        >
          About
        </h2>

        {description.map((desc, ind) => {
          return (
            <div
              className={styles['cardPage__desc-item']}
              key={desc.title + ind}
            >
              <h3 className={styles['cardPage__desc-title']}>{desc.title}</h3>

              <p className={styles['cardPage__desc-text']}>{desc.text}</p>
            </div>
          );
        })}
      </section>

      <section className={styles.cardPage__specs}>
        <h2
          className={`${styles.cardPage__title} ${styles['cardPage__title--under']}`}
        >
          Tech specs
        </h2>

        <div className={styles.cardPage__features}>
          <ul className={styles['cardPage__features-list']}>
            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                Screen
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {screen}
              </p>
            </li>

            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                Resolution
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {resolution}
              </p>
            </li>

            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                Processor
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {processor}
              </p>
            </li>

            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                RAM
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {ram}
              </p>
            </li>

            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                Built in memory
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {capacity}
              </p>
            </li>

            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                Camera
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {camera}
              </p>
            </li>

            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                Zoom
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {zoom}
              </p>
            </li>

            <li className={styles.cardPage__feature}>
              <p
                className={`${styles['cardPage__feature-title']} ${styles['cardPage__feature-title--high']}`}
              >
                Cell
              </p>
              <p
                className={`${styles['cardPage__feature-value']} ${styles['cardPage__feature-value--high']}`}
              >
                {cell
                  .reduce((prev, current) => prev + current + ', ', '')
                  .slice(0, -2)}
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.cardPage__productLine}>
        <ProductLine
          title="You may also like"
          cards={cards
            .sort(
              (a, b) =>
                Math.abs(a.price - priceDiscount) -
                Math.abs(b.price - priceDiscount),
            )
            .slice(0, 4)}
          isResetTitleWidth
        />
      </section>
    </main>
  );
};
