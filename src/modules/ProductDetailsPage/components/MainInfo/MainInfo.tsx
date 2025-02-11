import React from 'react';
import classNames from 'classnames';

import { ProductDetails } from '@sTypes/ProductDetails';
import { ProductCategory } from '@sTypes/ProductCategory';

import { ProductId } from '../ProductId';
import { Price } from '@components/Price';
import { AddToCard } from '@components/AddToCard';
import { Characteristics } from '@components/Characteristics';

import styles from './MainInfo.module.scss';

type Props = {
  className: string;
  details: ProductDetails;
  category: ProductCategory;
};

export const MainInfo: React.FC<Props> = ({ className, details, category }) => {
  const { priceDiscount, priceRegular, screen, resolution, processor, ram } =
    details;

  const characteristics: [string, string][] = [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', processor],
    ['Ram', ram],
  ];

  return (
    <section className={classNames(className, styles['main-info'])}>
      <ProductId itemId={details.id} category={category} />

      <div className={styles['main-info__content']}>
        <div className={styles['main-info__otherModels']}>
          {/* <div className={styles['main-info__hr']}></div>
        <div className={styles['main-info__hr']}></div> */}
        </div>

        <div className={styles['main-info__price']}>
          <Price fullPrice={priceRegular} discountPrice={priceDiscount} />
          <AddToCard itemId={details.id} />
        </div>

        <Characteristics characteristics={characteristics} />
      </div>
    </section>
  );
};
