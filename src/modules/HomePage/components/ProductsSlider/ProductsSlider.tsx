import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../components/Button';
import styles from './ProductsSlider.module.scss';
import { ProductItem } from '../../../shared/ProductItem/ProductItem';
import classNames from 'classnames';
import { Product } from '../../../../types/productTypes';

type TitleProps = {
  title: string;
  isHot: boolean;
  isCardDetails?: boolean;
  products: Product[] | null;
};

export const ProductsSlider = ({
  title,
  isHot,
  isCardDetails,
  products,
}: TitleProps) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const firstCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstCardRef.current) {
      const card = firstCardRef.current;

      setCardWidth(card.offsetWidth + 16);
    }
  }, [products]);

  const nextImg = () => {
    if (products && startIndex < products?.length - 1) {
      setStartIndex(prev => prev + 1);
    }
  };

  const previousImg = () => {
    if (products && startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  const headerWrapper = classNames(styles.headerSlider, {
    [styles['headerSlider--size']]: isCardDetails,
  });

  const sectionWrapper = classNames(styles.sectionNewModels, {
    [styles['sectionNewModels--margin']]: isCardDetails,
  });

  return (
    <section className={sectionWrapper}>
      <div className={styles.containerSlider}>
        <div className={headerWrapper}>
          <h2 className={styles.headerSlider__title}>{title}</h2>
          <div className={styles.headerSlider__items}>
            <Button
              onClick={previousImg}
              rotation={180}
              disabled={startIndex === 0}
            />
            <Button
              onClick={nextImg}
              disabled={products ? startIndex >= products?.length - 1 : true}
            />
          </div>
        </div>
        <div className={styles.mainSlider}>
          <div
            className={styles.mainSlider__track}
            style={{
              transform: `translateX(-${startIndex * cardWidth}px)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {products &&
              products?.map((item: Product, index) => (
                <div key={item.id} ref={index === 0 ? firstCardRef : null}>
                  <ProductItem item={item} isHot={isHot} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
