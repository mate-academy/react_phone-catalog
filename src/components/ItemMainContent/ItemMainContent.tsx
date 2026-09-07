import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { Item } from '../../types/Item';
import styles from './ItemMainContent.module.scss';
import { useEffect } from 'react';
import itemSlice from '../../features/product/itemSlice';
import { AddToCartFromItem } from '../AddToCartFromItem/AddToCartFromItem';

type Props = {
  item: Item | null;
};

const colors: Record<string, string> = {
  black: '#282a2e',
  rosegold: '#f0c8c1',
  gold: '#e5c7ab',
  silver: '#dbdadd',
  purple: '#e7dceb',
  yellow: '#fae56c',
  midnight: '#1d242d',
  green: '#afe2cc',
  white: '#fffaf7',
  red: '#c61b37',
  spacegray: '#292b2f',
  coral: '#ff6452',
  spaceblack: '#2c2928',
  sierrablue: '#9bb5ce',
  graphite: '#464541',
  blue: '#215e7c',
  pink: '#f9dcd6',
};

export const ItemMainContent: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onColorSelect = (color: string) => {
    dispatch(itemSlice.actions.selectColor(color));
  };

  const onCapacitySelect = (capacity: string) => {
    dispatch(itemSlice.actions.selectCapacity(capacity));
  };

  useEffect(() => {
    navigate(`/products?category=${item?.category}&item=${item?.name}`);
  }, [item]);

  return (
    <div className={styles.container}>
      <div className={styles.colorContainer}>
        <p>Available colors</p>
        <ul>
          {item?.colorsAvailable.map(color => (
            <li
              className={
                item.color === color
                  ? `${styles.activeColor} ${styles.color}`
                  : styles.color
              }
              key={color}
            >
              <button
                style={{
                  backgroundColor: colors[color] || 'gray',
                }}
                onClick={() => {
                  onColorSelect(color);
                }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <span className={styles.line}></span>
      <div className={styles.colorContainer}>
        <p>Select capacity</p>
        <ul>
          {item?.capacityAvailable.map(capacity => (
            <li key={capacity}>
              <button
                className={
                  item.capacity === capacity
                    ? `${styles.activeCapacity} ${styles.capacity}`
                    : styles.capacity
                }
                onClick={() => onCapacitySelect(capacity)}
              >
                {capacity}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <span className={styles.line}></span>
      <div className={styles.price}>
        {item?.priceDiscount && <h2>${item.priceDiscount}</h2>}
        <h2 className={item?.priceDiscount ? styles.discount : ''}>
          ${item?.priceRegular}
        </h2>
      </div>
      {item && <AddToCartFromItem product={item} />}
      <div className={styles.characteristic}>
        <p>Screen</p>
        <h6>{item?.screen}</h6>
      </div>
      <div className={styles.characteristic}>
        <p>Resolution</p>
        <h6>{item?.resolution}</h6>
      </div>
      <div className={styles.characteristic}>
        <p>Processor</p>
        <h6>{item?.processor}</h6>
      </div>
      <div className={styles.characteristic}>
        <p>RAM</p>
        <h6>{item?.ram}</h6>
      </div>
    </div>
  );
};
