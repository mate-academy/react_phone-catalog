import React, { useEffect } from 'react';
import { ItemsOnPageOptions } from '../../types/ItemsOnPageOptions';
import { Product } from '../../types/Product';
import { ProductsCategory } from '../../types/ProductsCategory';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useValues } from '../../store/ProductContext';
import { SortOptions } from '../../types/SortOptions';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { SelectionDropdown } from '../SelectionDropdown.tsx';
import { Card } from '../Card';
import { Pagination } from '../Pagination/Pagination';

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

  if (productsOnPage !== ItemsOnPageOptions.ALL) {
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
    searchParams.get('itemsOnPage' as ItemsOnPageOptions) ||
    ItemsOnPageOptions.ALL;
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
    if (field === ItemsOnPageOptions.ALL) {
      return { page: null, itemsOnPage: null };
    }

    return { page: DEFAULT_PAGE, itemsOnPage: field };
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
          className={classNames('products__list', {
            noPagination: itemsOnPage === ItemsOnPageOptions.ALL,
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
              options={Object.values(ItemsOnPageOptions)}
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

          {itemsOnPage !== ItemsOnPageOptions.ALL && (
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
