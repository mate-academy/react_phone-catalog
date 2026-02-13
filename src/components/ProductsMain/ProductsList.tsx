import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Product } from '../../types/Product';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SelectionDropdown } from '../SelectionDropdown';
import { Card } from '../Card';
import { useValues } from '../../store/ProductsContext';
import { ProductsCategory } from '../../types/ProductsCategory';
import { SortOptions } from '../../types/SortOptions';
import { ItemsOnPageOptins } from '../../types/ItemsOnPageOptins';
import { Pagination } from '../Pagination/Pagination';
import cn from 'classnames';

const getPreparedProducts = (
  productsArray: Product[],
  productsOnPage: string,
  currentPage: number,
) => {
  let preparedProducts = [...productsArray];
  const firstProduct = (currentPage - 1) * +productsOnPage;
  let lastProduct = currentPage * +productsOnPage;

  if (lastProduct > productsArray.length) {
    lastProduct = productsArray.length;
  }

  if (productsOnPage !== ItemsOnPageOptins.ALL) {
    preparedProducts = preparedProducts.slice(firstProduct, lastProduct);
  }

  return { preparedProducts };
};

type Props = {
  productsCategory: ProductsCategory;
};

export const ProductsList: React.FC<Props> = ({ productsCategory }) => {
  const DEFAULT_PAGE = 1;

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { sortedProduct, products, isLoading, isError, loadProducts } =
    useValues();
  const sort = searchParams.get('sort' as SortOptions) || SortOptions.NEWEST;
  const itemsOnPage =
    searchParams.get('itemsOnPage' as ItemsOnPageOptins) ||
    ItemsOnPageOptins.ALL;
  const currentPage = searchParams.get('page') || DEFAULT_PAGE;

  const { preparedProducts } = getPreparedProducts(
    sortedProduct,
    itemsOnPage,
    +currentPage,
  );

  const productsTitle = location.pathname.split('/')[1];

  const handleChangeSortOption = (sortField: string) => {
    if (sortField === SortOptions.NEWEST) {
      return { sort: null };
    } else if (sort !== sortField) {
      return { sort: sortField };
    }

    return { sort: null };
  };

  const handleChangeItemsOnPageOption = (field: string) => {
    if (field === ItemsOnPageOptins.ALL) {
      return { page: null, itemsOnPage: null };
    } else {
      return { page: DEFAULT_PAGE, itemsOnPage: field };
    }
  };

  const handleChangePage = (newPage: number) => {
    return { page: newPage };
  };

  useEffect(() => {
    loadProducts(productsCategory);
  }, [loadProducts, productsCategory]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !isError && (
        <div
          className={cn('products__list', {
            noPagination: itemsOnPage === ItemsOnPageOptins.ALL,
          })}
        >
          <div className="category_info">
            <h1 className="category_info__title">{productsTitle}</h1>
            <p className="category_info__description">
              {products.length} models
            </p>
          </div>
          <div className="products__options">
            <SelectionDropdown
              title={'Sort by'}
              options={Object.values(SortOptions)}
              functional={sort}
              onChange={handleChangeSortOption}
            />
            <SelectionDropdown
              title={'Items on page'}
              options={Object.values(ItemsOnPageOptins)}
              functional={itemsOnPage}
              onChange={handleChangeItemsOnPageOption}
            />
          </div>
          <div className="products__list--cards">
            {preparedProducts.map(product => (
              <div className="products__list--card" key={product.id}>
                <Card product={product} />
              </div>
            ))}
          </div>

          {itemsOnPage !== ItemsOnPageOptins.ALL && (
            <Pagination
              currentPage={+currentPage}
              itemsOnPage={+itemsOnPage}
              totalItems={products.length}
              onChange={handleChangePage}
            />
          )}
        </div>
      )}
    </>
  );
};
