import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Arrows } from '@components/home/banner/slider/';

import { Icons, Title } from '@ui/index';

import { useProductNavigation } from '@hooks/useProductNavigation';

import { TProduct } from '@utils/types/product.type';

import { ProductList } from '../index';
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
  const productsLength = products.length;
  const {
    productIndex,
    showPrevProduct,
    showNextProduct,
    isNextDisabled,
    isPrevDisabled,
  } = useProductNavigation({ productsLength });

  const displayedProducts = useMemo(
    () => products.slice(productIndex, productIndex + 4),
    [productIndex, products],
  );
  const { t } = useTranslation();

  const localPrevious = t('home.banner.slider.previous');
  const localNext = t('home.banner.slider.next');

  return (
    <div className={styles.products}>
      <div className={styles.wrapper}>
        <Title level={2}>{title}</Title>

        <div className={styles.arrows}>
          <Arrows
            onClick={showPrevProduct}
            label={localPrevious}
            disabled={isPrevDisabled}
          >
            <Icons.ArrowLeftIcon />
          </Arrows>

          <Arrows
            onClick={showNextProduct}
            label={localNext}
            disabled={isNextDisabled}
          >
            <Icons.ArrowRightIcon />
          </Arrows>
        </div>
      </div>

      <div className={styles.list}>
        {displayedProducts.map(product => (
          <ProductList key={product.id} product={product} discount={discount} />
        ))}
      </div>
    </div>
  );
};
