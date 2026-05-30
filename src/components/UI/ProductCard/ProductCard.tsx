import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/types/product';

import { Link } from 'react-router-dom';
import { ProductPrice } from '@/components/UI/ProductPrice';
import { ProductCardButtons } from '../ProductCardButtons';
import { ProductCharacteristics } from '../ProductCharacteristics';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  isShowFullPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isShowFullPrice }) => {
  const { t } = useTranslation();
  const translatedName = t(`products.${product.itemId}.name`, product.name);

  const characteristics: { key: keyof Product; name: string }[] = [
    { key: 'screen', name: 'screen' },
    { key: 'capacity', name: 'capacity' },
    { key: 'ram', name: 'ram' },
  ];

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productLink}
      >
        <img
          src={product.image}
          alt={translatedName}
          className={styles.productImage}
        />
        <p className={styles.productName}>{translatedName}</p>
      </Link>

      <ProductPrice isShowFullPrice={isShowFullPrice} product={product} />

      <ProductCharacteristics
        product={product}
        characteristics={characteristics}
      />

      <ProductCardButtons product={product} />
    </div>
  );
};
