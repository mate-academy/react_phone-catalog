import React from 'react';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import useLanguageStore from '../../stores/useLanguageStore';
import { translateDynamicValue } from '../../utils/constants';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
import { ProductActions } from '../ProductActions/ProductActions';
import { SpecsDisplay } from '../SpecsDisplay/SpecsDisplay';
import { SpecItem } from '../../types/SpecItem';
import styles from './ProductCard.module.scss';
import useAllProductsStore from '../../stores/useAllProductsStore';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { currentLanguage } = useLanguageStore();
  const { isLoading } = useAllProductsStore();
  const navigate = useNavigate();
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const linkPath = `/${category}/${itemId}`;

  const handleViewDetailsClick = () => {
    navigate(linkPath);
  };

  const cardSpecs: SpecItem[] = [
    { labelKey: 'card_screen', value: screen || '' },
    { labelKey: 'card_capacity', value: capacity || '' },
    { labelKey: 'card_ram', value: ram || '' },
  ].filter(spec => spec.value);

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className={styles['product-card']} onClick={handleViewDetailsClick}>
      <div className={styles['product-card__image-container']}>
        <img className={styles['product-card__image']} src={image} alt={name} />
      </div>

      <div className={styles['product-card__main-info']}>
        <p className={styles['product-card__title']}>
          {translateDynamicValue(name, currentLanguage)}
        </p>

        <PriceDisplay price={price} fullPrice={fullPrice} size="small" />

        <div className={styles['product-card__divider']}></div>

        <div className={styles['product-card__specs-display']}>
          <SpecsDisplay specs={cardSpecs} size={'small'} />
        </div>

        <ProductActions product={product} />
      </div>
    </div>
  );
};
