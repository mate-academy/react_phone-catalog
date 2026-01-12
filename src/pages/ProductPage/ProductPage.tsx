import { useContext, useEffect, useMemo, useState } from 'react';
import { ProductName } from '../../types/prodName';
import { DropDown } from '../../components/Dropdown';
import { GlobalContext } from '../../context/GlobalContext';
import { SortType } from '../../types/SortType';
import { ItemsOnPage } from '../../types/ItemsOnPageType';
import { NaviLine } from '../../components/NaviLine';
import { ProductsList } from '../../components/ProductsList';
import { ErrorBlock } from '../../components/ErrorBlock';
import { Pagination } from '../../components/Pagination';
import './ProductPage.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  type: ProductName;
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  const { allProducts, productsError, reloadProducts } =
    useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sortBy = useMemo<SortType>(() => {
    const value = searchParams.get('sortBy');
    return Object.values(SortType).includes(value as SortType)
      ? (value as SortType)
      : SortType.Alphabetically;
  }, [searchParams]);

  const itemsOnPage = useMemo<ItemsOnPage>(() => {
    const value = searchParams.get('onPage');
    return Object.values(ItemsOnPage).includes(value as ItemsOnPage)
      ? (value as ItemsOnPage)
      : ItemsOnPage.all;
  }, [searchParams]);

  const page = useMemo(() => {
    const value = Number(searchParams.get('page'));
    return Number.isFinite(value) && value > 0 ? value : 1;
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => product.category === type);
  }, [type, allProducts]);

  const visibleProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];

    switch (sortBy) {
      case SortType.Newest:
        return productsCopy.sort((a, b) => b.year - a.year);
      case SortType.Cheapest:
        return productsCopy.sort((a, b) => a.price - b.price);
      default:
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filteredProducts, sortBy]);

  const handleSortChange = (value: SortType) => {
    const newParam =
      value === SortType.Alphabetically
        ? { sort: null }
        : { sort: value.toLowerCase() };
    
    setSearchParams(getSearchWith(newParam, searchParams));
  }

  const handleItemsOnPage = (value: string) => {
    const newParam =
      value === ItemsOnPage.all
        ? { onPage: null, page: null}
        : { onPage: value, page: '1' };
    
    setSearchParams(getSearchWith(newParam, searchParams));
  }

  const handlePageChange = (page: number) => {
    const newParam =
      page === 1
        ? { page: null}
        : { page: String(page) };
    
    setSearchParams(getSearchWith(newParam, searchParams));
  }

  const itemsPerPage =
    itemsOnPage === ItemsOnPage.all
      ? visibleProducts.length
      : Number(itemsOnPage);

  const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    return visibleProducts.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );
  }, [visibleProducts, page, itemsPerPage]);

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-page__content">
          <div className="product-page__navi-line">
            <NaviLine category={type} />
          </div>

          {!productsError ? (
            <>
              <h1 className="product-page__title">
                {type === 'phones'
                  ? `Mobile ${type}`
                  : type[0].toUpperCase() + type.slice(1)}
              </h1>
              <span className="product-page__desc">{`${filteredProducts.length} models`}</span>

              <div className="product-page__drop-block">
                <DropDown<SortType>
                  options={Object.values(SortType)}
                  label="Sort by"
                  selected={sortBy}
                  onSelect={handleSortChange}
                />
                <DropDown<ItemsOnPage>
                  options={Object.values(ItemsOnPage)}
                  label="Items on page"
                  selected={itemsOnPage}
                  onSelect={handleItemsOnPage}
                />
              </div>

              <ProductsList products={currentProducts} />

              <div className="product-page__pagination">
                {itemsOnPage !== ItemsOnPage.all && totalPages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                  />
                )}
              </div>
            </>
          ) : (
            <ErrorBlock message={productsError} onReload={reloadProducts} />
          )}
        </div>
      </div>
    </div>
  );
};
