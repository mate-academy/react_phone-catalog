import s from './CatalogHeader.module.scss';
import React from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Products';
import { CatalogHeaderPath } from '../CatalogHeaderPath';
import { useTranslation } from 'react-i18next';

type Props = {
  products: Product[];
  title: string;
};

export const CatalogHeader: React.FC<Props> = ({ products, title }) => {
  const { t } = useTranslation('HomePage');
  const productsPhoneLength = products.length;

  return (
    <div className={classNames(s.header__wrapper, 'container')}>
      <CatalogHeaderPath />
      <div className={s.header__title_wrapper}>
        <div className={s.header__title}>
          <h1>{title}</h1>
        </div>
        <div className={s.header__title_quantity}>
          {productsPhoneLength} {t('models')}
        </div>
      </div>
    </div>
  );
};
