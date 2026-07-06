/* eslint-disable max-len */
//#region imports
import { ProductCard } from '../ProductCard';
import { SearchInput } from './components/SearchInput';
import { useMemo } from 'react';
import { useUrlParam } from '../../../ProductPage/hooks/useUrlParam';
import { useTranslation } from 'react-i18next';
import { getSearchedProducts } from './components/SearchInput/services/getSearchedProducts';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  products: Product[];
  category: string;
};

export const ProductList: React.FC<Props> = ({ products, category }) => {
  const { t } = useTranslation('shared');
  const { value: query, setValue: setQuery } = useUrlParam<string | null>(
    'query',
    null,
  );

  const visibleProducts = useMemo(
    () => getSearchedProducts(products, query),
    [products, query],
  );

  return (
    <div className={baseStyles.productsListBlock}>
      <SearchInput placeholder={t('searchProduct')} onParamChange={setQuery} />

      {visibleProducts.length > 0 ? (
        <ul className={baseStyles.productsList}>
          {visibleProducts.map(product => (
            <li key={product.id} className={baseStyles.product}>
              <ProductCard product={product} withFullPrices={true} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className={styles.noMatch}>
          {t('noMatch', { category: category })}
        </h2>
      )}
    </div>
  );
};
