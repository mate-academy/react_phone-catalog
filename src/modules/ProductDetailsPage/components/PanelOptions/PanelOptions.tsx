import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ProductDetail } from '../../../../types/productDetail';
import styles from './PanelOptions.module.scss';
import classNames from 'classnames';
import HeartIco from '../../../../components/Icons/Heart/Heart';
import { storage, StorageKey } from '../../../../app/localStorage';
import { useEffect, useState } from 'react';
import { toggleFavourite } from '../../../../features/favouritesSlice';
import { toggleCartItem } from '../../../../features/cartSlice';
import { CartType } from '../../../../types/cart';

const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  gold: '#FFD700',
  yellow: '#FFFF00',
  green: '#008000',
  midnightgreen: '#004953',
  silver: '#C0C0C0',
  spacegray: '#717378',
  red: '#FF0000',
  white: '#FFFFFF',
  purple: '#800080',
  coral: '#FF7F50',
  rosegold: '#B76E79',
  midnight: '#011635',
  spaceblack: '#323233',
  blue: '#0000FF',
  pink: '#FFC0CB',
  sierrablue: '#BFDAF7',
  graphite: '#41424C',
  'space gray': '#717378',
  'space-gray': '#717378',
  'rose gold': '#b76e79',
  'sky-blue': '#87CEEB',
  starlight: '#bcc0cc',
};

type Option = 'capacity' | 'color';

const getLink = (
  products: ProductDetail[],
  query: string,
  curOption: string,
  type: Option,
): string => {
  let founded;

  switch (type) {
    case 'capacity':
      founded = products.find(
        product => product.capacity === query && product.color === curOption,
      );

      if (!founded) {
        products.find(product => product.capacity === query);
      }

      return founded ? founded.id : '';
    case 'color':
      founded = products.find(
        product => product.color === query && product.capacity === curOption,
      );

      if (!founded) {
        products.find(product => product.color === query);
      }

      return founded ? founded.id : '';
  }
};

type Props = {
  similar: ProductDetail[];
  current: ProductDetail;
};

const inLocalStorage = (key: StorageKey, id: string) => {
  if (key === 'cart') {
    return (
      storage.getAllItems<CartType>(key)?.some(el => el.id === id) || false
    );
  }

  return storage.getAllItems<string>(key)?.includes(id) || false;
};

export const PanelOptions: React.FC<Props> = ({ similar, current }) => {
  const products = useAppSelector(state => state.store.products);
  const id = products.find(product => product.itemId === current.id)?.id;
  const favourites = useAppSelector(state => state.favourite);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const [isInCart, setIsInCart] = useState<boolean>(
    inLocalStorage('cart', current.id),
  );
  const [isInFavourites, setIsInFavourites] = useState<boolean>(
    inLocalStorage('favourites', current.id),
  );

  useEffect(() => {
    setIsInFavourites(inLocalStorage('favourites', current.id));
  }, [current.id, favourites]);

  useEffect(() => {
    setIsInCart(inLocalStorage('cart', current.id));
  }, [current.id, cart]);
  // useEffect(() => {
  //   const handleStorageUpdate = (e: StorageEvent | CustomEvent) => {
  //     if (e instanceof StorageEvent) {
  //       if (e.key === 'favourites') {
  //         setIsInFavourites(inLocalStorage('favourites', current.id));
  //       }

  //       if (e.key === 'cart') {
  //         setIsInCart(inLocalStorage('cart', current.id));
  //       }
  //     }

  //     if (e instanceof CustomEvent && e.type === 'localStorageChange') {
  //       const { key } = e.detail;

  //       if (key === 'favourites') {
  //         setIsInFavourites(inLocalStorage('favourites', current.id));
  //       }

  //       if (key === 'cart') {
  //         setIsInCart(inLocalStorage('cart', current.id));
  //       }
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageUpdate);
  //   window.addEventListener(
  //     'localStorageChange',
  //     handleStorageUpdate as EventListener,
  //   );

  //   return () => {
  //     window.removeEventListener('storage', handleStorageUpdate);
  //     window.removeEventListener(
  //       'localStorageChange',
  //       handleStorageUpdate as EventListener,
  //     );
  //   };
  // }, [current.id]);

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleCartItem(current.id));
  };

  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavourite(current.id));
  };

  return (
    <div className={styles.PanelOptions}>
      <div className={styles.PanelOptions__option}>
        <p>Available colors</p>
        <span>{`ID: ${id?.toString().padStart(8, '0')}`}</span>

        <ul className={styles.PanelOptions__colorsList}>
          {current.colorsAvailable.map(color => (
            <li key={color}>
              <Link
                to={`../${getLink(similar, color, current.capacity, 'color')}`}
                className={classNames(styles.PanelOptions__color, {
                  [styles.PanelOptions__color_active]: color === current.color,
                })}
                style={{ backgroundColor: COLOR_MAP[color] }}
              ></Link>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      <div className={styles.PanelOptions__option}>
        <p>Select capacity</p>

        <div className={styles.PanelOptions__capacityList}>
          {current.capacityAvailable.map(capacity => (
            <Link
              key={capacity}
              to={`../${getLink(similar, capacity, current.color, 'capacity')}`}
              className={classNames(styles.PanelOptions__capacity, {
                [styles.PanelOptions__capacity_active]:
                  capacity === current.capacity,
              })}
            >
              {capacity}
            </Link>
          ))}
        </div>
      </div>

      <hr />

      <h3 className={styles.PanelOptions__price}>
        {`$${current.priceDiscount}`}
        <span>{`$${current.priceRegular}`}</span>
      </h3>

      <div className={styles.PanelOptions__buttons}>
        <button
          className={classNames(styles.PanelOptions__cart, {
            [styles.PanelOptions__cart_active]: isInCart,
          })}
          onClick={handleAddToCartClick}
        >
          {isInCart ? `Remove` : `Add to cart`}
        </button>
        <button
          className={styles.PanelOptions__favourite}
          onClick={handleFavouriteClick}
        >
          <HeartIco active={isInFavourites} />
        </button>
      </div>

      <ul className={styles.PanelOptions__details}>
        <li>
          <span>Screen</span>
          <p>{current.screen}</p>
        </li>

        <li>
          <span>Resolution</span>
          <p>{current.resolution}</p>
        </li>

        <li>
          <span>Processor</span>
          <p>{current.processor}</p>
        </li>

        <li>
          <span>RAM</span>
          <p>{current.ram}</p>
        </li>
      </ul>
    </div>
  );
};
