import { FC, useState } from 'react';

import { ProductList } from '../products-list/ProductList';
import { Arrows } from '@components/home/banner/slider/arrows/Arrows';

import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';

import { TProduct } from '@utils/types/product.type';

import styles from './ProductsSlider.module.scss';

type TProps = {
  title: string;
  products: TProduct[];
  discount?: boolean;
};

export const ProductsSlider: FC<TProps> = ({
  title,
  products,
  discount = false,
}) => {
  const [productIndex, setProductIndex] = useState(0);

  const itemsToShow = 1;

  const showNextProduct = () => {
    setProductIndex(index =>
      index + itemsToShow < products.length ? index + itemsToShow : 0,
    );
  };

  const showPrevProduct = () => {
    setProductIndex(index =>
      index - itemsToShow >= 0
        ? index - itemsToShow
        : products.length - itemsToShow,
    );
  };

  const isPrevDisabled = productIndex === 0;
  const isNextDisabled = productIndex + itemsToShow >= products.length;

  return (
    <div className={styles.products}>
      <div className={styles.wrapper}>
        <h2>{title}</h2>
        <div className={styles.arrows}>
          <Arrows
            slider={showPrevProduct}
            label={'Previous Image'}
            disabled={isPrevDisabled}
          >
            <ArrowLeftIcon />
          </Arrows>

          <Arrows
            slider={showNextProduct}
            label={'Next Image'}
            disabled={isNextDisabled}
          >
            <ArrowRightIcon />
          </Arrows>
        </div>
      </div>

      <div className={styles.list}>
        {products.slice(productIndex, productIndex + 4).map(product => (
          <ProductList key={product.id} product={product} discount={discount} />
        ))}
      </div>
    </div>
  );
};
