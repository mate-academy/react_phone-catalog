//#region imports
import { FC } from 'react';
import { ProductList } from '../../../shared/components/ProductList';
import { Product } from '../../../shared/types/Product';
import { PageTitle } from '../../../shared/components/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import baseStyles from './base.module.scss';
import styles from './FavoritesContent.module.scss';
//#endregion

type Props = {
  products: Product[];
};

export const FavoritesContent: FC<Props> = ({ products }) => {
  const { t } = useTranslation('favorites');

  return (
    <div className={`${baseStyles.favorites} ${styles.favorites}`}>
      <PageTitle
        title={capitalizeFirstWord(t('favorites'))}
        count={t('items', { count: products.length })}
      />

      <ProductList products={products} category={t('products')} />
    </div>
  );
};
