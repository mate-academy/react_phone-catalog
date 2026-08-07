// RightColumn.tsx

import styles from './RightColumn.module.scss';
import { Link } from 'react-router-dom';
import type { ProductDetails } from '../../../../types/ProductDetails';
import { BtnAdd } from '../../../../components/BtnAdd';
import { BtnHeart } from '../../../../components/BtnHeart';

interface RightColumnProps {
  product: ProductDetails;
  category: string;
}

const getNewProductId = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const formattedCapacity = capacity.toLowerCase();
  const formattedColor = color.toLowerCase().replace(/\s+/g, '-');

  return `${namespaceId}-${formattedCapacity}-${formattedColor}`;
};

export const RightColumn = ({ product, category }: RightColumnProps) => {
  const {
    namespaceId,
    color: currentColor,
    capacity: currentCapacity,
    colorsAvailable,
    capacityAvailable,
  } = product;

  const COLOR_MAP: Record<string, string> = {
    black: '#1c1c1e',
    green: '#aee1cd',
    yellow: '#ffe680',
    white: '#f9f6ef',
    purple: '#d1cdda',
    red: '#ba0c2e',
  };

  return (
    <article>
      {/* Available colors */}
      <div className={styles.top}>
        <div className={styles.header}>
          <p className={styles.text}>Available colors</p>
          <p className={styles.id}>ID: {product.namespaceId}</p>
        </div>

        <div className={styles.block}>
          <div className={styles.rowBtn}>
            {colorsAvailable.map(item => {
              const isColor = item === currentColor;
              const newProductId = getNewProductId(
                namespaceId,
                currentCapacity,
                item,
              );

              return (
                <Link
                  key={item}
                  to={`/${category}/${newProductId}`}
                  className={`${styles.border} ${isColor ? styles.borderActive : ''}`}
                >
                  <span
                    className={styles.color}
                    style={{ backgroundColor: COLOR_MAP[item] || item }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Select capacity */}
      <div className={styles.select}>
        <div className={styles.block}>
          <p className={styles.text}>Select capacity</p>
          <div className={styles.rowBtn}>
            {capacityAvailable.map(item => {
              const isActive = item === currentCapacity;
              const newProductId = getNewProductId(
                namespaceId,
                item,
                currentColor,
              );

              return (
                <Link
                  key={item}
                  to={`/${category}/${newProductId}`}
                  className={`${styles.gb} ${isActive ? styles.activeGb : ''}`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price block */}
      <div className={styles.price}>
        <div className={styles.blocks}>
          <div className={styles.priceBlock}>
            <p className={styles.priceText}>${product.priceDiscount}</p>
            <p className={styles.oldPrice}>${product.priceRegular}</p>
          </div>
          <div className={styles.blockAdd}>
            <BtnAdd productId={product.id} />
            <BtnHeart productId={product.id} />
          </div>
        </div>
      </div>

      {/* Tech info */}
      <div className={styles.info}>
        <div className={styles.blocks}>
          <div className={styles.list}>
            <div className={styles.element}>
              <p className={styles.text}>Screen</p>
              <p className={styles.textInfo}>{product.screen}</p>
            </div>
            <div className={styles.element}>
              <p className={styles.text}>Resolution</p>
              <p className={styles.textInfo}>{product.resolution}</p>
            </div>
            <div className={styles.element}>
              <p className={styles.text}>Processor</p>
              <p className={styles.textInfo}>{product.processor}</p>
            </div>
            <div className={styles.element}>
              <p className={styles.text}>RAM</p>
              <p className={styles.textInfo}>{product.ram}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
