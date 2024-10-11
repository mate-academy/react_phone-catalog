import React from 'react';
import { ProductMore } from '../../../type/Product';
import './Tech.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  product: ProductMore;
  isBigBlock: boolean;
};

export const Tech: React.FC<Props> = ({ product, isBigBlock }) => {
  const { t } = useTranslation();
  const textClass = classNames('list__line', {
    'text--body': isBigBlock,
    'text--small': !isBigBlock,
  });

  return (
    <li className="list">
      <ul className={textClass}>
        <p className="list__title">{t('techText.0')}</p>
        <p className="list__value">{product.screen}</p>
      </ul>
      <ul className={textClass}>
        <p className="list__title">{t('techText.1')}</p>
        <p className="list__value">{product.resolution}</p>
      </ul>
      <ul className={textClass}>
        <p className="list__title">{t('techText.2')}</p>
        <p className="list__value">{product.processor}</p>
      </ul>
      <ul className={textClass}>
        <p className="list__title">{t('techText.3')}</p>
        <p className="list__value">{product.ram}</p>
      </ul>
      {isBigBlock && (
        <>
          <ul className={textClass}>
            <p className="list__title">{t('techText.4')}</p>
            <p className="list__value">{product.capacity}</p>
          </ul>

          {product.camera && (
            <ul className={textClass}>
              <p className="list__title">{t('techText.5')}</p>
              <p className="list__value">{product.camera}</p>
            </ul>
          )}

          {product.zoom && (
            <ul className={textClass}>
              <p className="list__title">{t('techText.6')}</p>
              <p className="list__value">{product.zoom}</p>
            </ul>
          )}
        </>
      )}
    </li>
  );
};
