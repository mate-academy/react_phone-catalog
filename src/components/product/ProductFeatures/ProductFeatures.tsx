import './ProductFeatures.scss';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  screen: string;
  capacity: string;
  ram: string;
  resolution?: string;
  showTopLine?: boolean;
}

const firstTwoWords = (str: string) => str.split(' ').slice(0, 2).join(' ');

export const ProductFeatures: React.FC<Props> = ({
  screen,
  capacity,
  ram,
  resolution,
  showTopLine = true,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`product-features ${!showTopLine ? 'product-features--no-line' : ''}`}
    >
      <p className="product-features__item">
        <span className="product-features__name">{t('product.screen')}</span>
        <span className="product-features__value">{firstTwoWords(screen)}</span>
      </p>
      {resolution && (
        <p className="product-features__item">
          <span className="product-features__name">
            {t('product.resolution', 'Resolution')}
          </span>
          <span className="product-features__value">
            {firstTwoWords(resolution)}
          </span>
        </p>
      )}
      <p className="product-features__item">
        <span className="product-features__name">{t('product.capacity')}</span>
        <span className="product-features__value">
          {firstTwoWords(capacity)}
        </span>
      </p>
      <p className="product-features__item">
        <span className="product-features__name">{t('product.ram')}</span>
        <span className="product-features__value">{firstTwoWords(ram)}</span>
      </p>
    </div>
  );
};
