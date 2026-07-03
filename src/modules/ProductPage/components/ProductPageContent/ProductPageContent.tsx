//#region imports
import { PageTitle } from '../../../shared/components/PageTitle/PageTitle';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { ProductList } from '../../../shared/components/ProductList';
import { Product } from '../../../shared/types/Product';
import { SortParams } from '../../types/SortParams';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { usePageParam } from '../../hooks/usePageParam';
import { usePerPageParam } from '../../hooks/usePerPageParam';
import { useSortByParam } from '../../hooks/useSortByParam';
import { getVisibleProducts } from '../../services/getVisibleProducts';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import { Category } from '../../../shared/constants/categories';
import baseStyles from './base.module.scss';
import styles from './ProductPageContent.module.scss';
//#endregion

type Props = {
  category: Category;
  products: Product[];
};

export const ProductPageContent: React.FC<Props> = ({ category, products }) => {
  //#region translation
  const { t } = useTranslation('productPage');
  const { t: tCategories } = useTranslation('categories');
  //#endregion

  //#region sortParams
  const { sortBy, sortOptions, setSortBy } = useSortByParam();
  const { perPage, perPageOptions, setPerPage } = usePerPageParam();
  const { page, setNewPage } = usePageParam();
  //#endregion

  //#region consts
  const pageNumber = +page;
  const perPageNumber = +perPage;
  const showPagination = perPage !== 'all';

  const visibleProducts = useMemo(
    () => getVisibleProducts(products, sortBy, perPage, page),
    [products, sortBy, perPage, page],
  );
  //#endregion

  return (
    <div className={styles.productPage}>
      <div className={baseStyles.titleWrapper}>
        <PageTitle
          title={capitalizeFirstWord(
            tCategories(`categoriesNames.${category}`),
          )}
          count={t('models', { count: products.length })}
        />
      </div>

      <div className={baseStyles.dropdowns}>
        <div className={baseStyles.sortDropdown}>
          <Dropdown
            name={t('sortBy')}
            options={sortOptions}
            selected={sortBy}
            setSelected={value => setSortBy(value as SortParams)}
          />
        </div>

        <div className={baseStyles.perPageDropdown}>
          <Dropdown
            name={t('itemsOnPage')}
            options={perPageOptions}
            selected={perPage}
            setSelected={setPerPage}
          />
        </div>
      </div>

      <ProductList
        products={visibleProducts}
        category={tCategories(`categoriesGen.${category}`)}
      />

      {showPagination && (
        <div className={styles.pagination}>
          <Pagination
            total={products.length}
            page={pageNumber}
            perPage={perPageNumber}
            onPageChange={setNewPage}
          />
        </div>
      )}
    </div>
  );
};
