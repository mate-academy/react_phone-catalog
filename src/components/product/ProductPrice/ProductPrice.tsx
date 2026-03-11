import './ProductPrice.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/formatPrice';

interface Props {
  currentPrice: number;
  fullPrice: number;
}

export const ProductPrice: React.FC<Props> = ({ currentPrice, fullPrice }) => {
  const { i18n } = useTranslation();
  const hasDiscount = currentPrice < fullPrice;

  return (
    <p className="product-price">
      <span className="product-price__current">
        {formatPrice(currentPrice, i18n.language)}
      </span>

      {hasDiscount && (
        <span className="product-price__full">
          {formatPrice(fullPrice, i18n.language)}
        </span>
      )}
    </p>
  );
};
