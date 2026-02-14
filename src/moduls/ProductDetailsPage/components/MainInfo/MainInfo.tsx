import { useContext, useEffect, useState } from 'react';
import { Accessories } from '../../../../shared/types/Accessories';
import { PhonesTablets } from '../../../../shared/types/PhonesTablets';
import styles from './MainInfo.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { HeartIcon } from '../../../../shared/components/Icons/HeartIcon';
import {
  DispatchContext,
  StateContext,
} from '../../../../Provider/GadgetsContext';

const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  green: '#28a745',
  yellow: '#fff1ba',
  purple: '#c37fde',
  red: '#dc3545',
  spacegray: '#575553',
  midnightgreen: '#4a544c',
  gold: '#FCDBC1',
  white: '#f8ebe1',
  rosegold: '#ecc5bc',
  midnight: '#1a222b',
  sierrablue: '#9dbad5',
  graphite: '#464541',
};

type Props = {
  item: PhonesTablets | Accessories;
};

export const MainInfo: React.FC<Props> = ({ item }) => {
  const { cart, favourites, products } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [selectedImg, setSelectedImg] = useState(item.images[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const newImg = item.images[0];

    setSelectedImg(newImg);
  }, [item.images]);

  const handleImgSelect = (newSRC: string) => {
    setSelectedImg(newSRC);
  };

  const normalizeColor = (color: string, separator: string = '') =>
    color.trim().replace(/\s+/g, separator).toLowerCase();

  const handleSpecChange = ({
    capacity,
    color,
  }: {
    capacity?: string;
    color?: string;
  }) => {
    const normalizedColor = color ? normalizeColor(color, '-') : item.color;
    const newURL = `../${item.namespaceId}-${capacity || item.capacity}-${normalizedColor}`;

    navigate(newURL.toLowerCase());
  };

  const handleAddToFavourites = () => {
    dispatch({ type: 'toggleFavourite', payload: item.id });
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id: item.id, quantity: 1 },
    });
  };

  const isFavourite = favourites.some(fav => fav === item.id);
  const isInCart = cart.some(cartItem => cartItem.id === item.id);
  const productID = products.find(product => product.itemId === item.id)?.id;

  return (
    <section className={styles.mainInfo}>
      <div className={styles.imageSlider}>
        {item.images.map(src => (
          <img
            key={src}
            src={src}
            onClick={() => handleImgSelect(src)}
            alt=""
            className={classNames(styles.imageSlider__item, {
              [styles.isSelected]: selectedImg === src,
            })}
          />
        ))}
      </div>
      <img src={selectedImg} alt="Main photo" className={styles.mainPhoto} />
      <div className={styles.info}>
        <div className={styles.info__colorPicker}>
          <div className={styles.info__unregularText}>
            <p>Available colors</p>
            {productID && (
              <p className={styles.mainInfo__id}>ID: {productID}</p>
            )}
          </div>
          <div className={styles.colors}>
            {item.colorsAvailable.map(color => {
              const normalizedColor = normalizeColor(color);
              const colorCode = COLOR_MAP[normalizedColor] || color;

              return (
                <div
                  key={color}
                  className={classNames(styles.colors__item, {
                    [styles.selected]: color === item.color,
                  })}
                  style={{ backgroundColor: colorCode }}
                  onClick={() => handleSpecChange({ color: color })}
                ></div>
              );
            })}
          </div>
        </div>
        <hr />
        <div className={styles.info__capacityPicker}>
          <p>Select capacity</p>
          <div className={styles.capacity__list}>
            {item.capacityAvailable.map(cap => (
              <button
                key={cap}
                className={classNames(styles.capacity__item, {
                  [styles.capacity__selected]: cap === item.capacity,
                })}
                onClick={() => handleSpecChange({ capacity: cap })}
              >
                {cap.replace('GB', ' GB')}
              </button>
            ))}
          </div>
        </div>
        <hr />
        <div className={styles.price}>
          <h2 className={styles.price__main}>
            ${item.priceDiscount ? item.priceDiscount : item.priceRegular}
          </h2>
          {item.priceDiscount && (
            <p className={styles.price__cross}>${item.priceRegular}</p>
          )}
        </div>
        <div className={styles.buttons}>
          <PrimaryButton
            mainText="Add to cart"
            selectedText="Added to cart"
            onClick={handleAddToCart}
            isSelected={isInCart}
          />
          <HeartIcon
            className={styles.buttons__icon}
            isSelected={isFavourite}
            onClick={handleAddToFavourites}
          />
        </div>
        <ul className={styles.spec}>
          <li className={styles.spec__item}>
            <p>Screen</p>
            <p>
              <span>{item.screen}</span>
            </p>
          </li>
          <li className={styles.spec__item}>
            <p>Resolution</p>
            <p>
              <span>{item.resolution}</span>
            </p>
          </li>
          <li className={styles.spec__item}>
            <p>Processor</p>
            <p>
              <span>{item.processor}</span>
            </p>
          </li>
          <li className={styles.spec__item}>
            <p>RAM</p>
            <p>
              <span>{item.ram.replace('GB', ' GB')}</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
