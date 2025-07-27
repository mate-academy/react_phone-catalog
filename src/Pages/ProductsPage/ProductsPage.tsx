import './ProductsPage.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Outlet, useSearchParams } from 'react-router-dom';
import { ProductList } from '../../Components/ProductList';
import { Pagination } from '../../Components/Pagination';
import { useProductForCategories } from '../../hooks/useProductsForCategories';
import { UrlWay } from '../../Components/UrlWay';
import type { SortType } from '../../types/sortType';
import { sortVariants, sortVariantsValues } from '../../constans/sortVariants';
import { helperToSortProducts } from '../../utils/helperToSortProducts';
import { Dropdown } from '../../ui/Dropdown';
import type { Category } from '../../types/category/сategory';
import { useTranslationState } from '../../stateManagers/languageState';
import { ProductSearchInput } from '../../Components/ProductSearchInput';
import { NotFoundPage } from '../NotFoundPage';
import { useThemeState } from '../../stateManagers/themeState';

export const ProductsPage = () => {
  const {
    itemId,
    category,
    products,
    loading,
    amountProduct,
    selectedCategory,
  } = useProductForCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  const { translate } = useTranslationState();
  const { theme } = useThemeState();

  const perPage = Number(searchParams.get('perPage')) || 16;
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = (searchParams.get('sort') as SortType) || sortVariants.Newest;

  const categoryVariables = ['phones', 'tablets', 'accessories'];
  const titleVariables: Record<Category, string> = {
    phones: 'Mobile phones',
    tablets: 'tablets',
    accessories: 'accessories',
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const sortedProducts = helperToSortProducts(products, sortBy);
  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const paginationVariantsValues = ['3', '5', '10', '16'];

  const handleSortChange = (value: string) => {
    const newSort = value as SortType;
    searchParams.set('sort', newSort);
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (value: string) => {
    const newPerPage = +value;
    searchParams.set('perPage', newPerPage.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  if (!categoryVariables.includes(selectedCategory)) {
    return <NotFoundPage />;
  }

  return (
    <>
      <section className="products-page">
        {itemId ?
          <Outlet />
        : <>
            <div className="products-page__url-way">
              <UrlWay category={translate(`${category}`)} />
            </div>
            <div className="products-page__header">
              {category && (
                <h1>{translate(`${titleVariables[category as Category]}`)}</h1>
              )}
            </div>
            <p className="products-page__count body-text">
              {loading ?
                <SkeletonTheme
                  baseColor={theme === 'dark' ? '#161827' : '#efefefff'}
                  highlightColor={theme === 'dark' ? '#1a1c2eff' : '#e2e2e2ff'}
                >
                  <Skeleton
                    height={21}
                    width={100}
                  />
                </SkeletonTheme>
              : <>
                  {amountProduct} {translate('models')}
                </>
              }
            </p>
            <div className="products-page__filter-panel">
              <Dropdown
                title={translate('Sort by')}
                value={sortBy}
                onChange={handleSortChange}
                variants={sortVariantsValues}
                cl="sort"
              />

              <Dropdown
                title={translate('Items on page')}
                value={perPage}
                onChange={handlePerPageChange}
                variants={paginationVariantsValues}
                cl="paginator"
              />

              <ProductSearchInput products={sortedProducts} />
            </div>
            <ProductList
              visibleProducts={visibleProducts}
              loading={loading}
            />
            <div className="products-page__pagination-wrapper">
              <Pagination
                amountProduct={amountProduct}
                perPage={perPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        }
      </section>
    </>
  );
};
