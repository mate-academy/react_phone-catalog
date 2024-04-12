import { useEffect, useState } from 'react';
import './accessoriesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../../components/ProductList/ProductList';
import { DropDown } from '../../components/DropDown';
import { PaginationSearchParams }
  from '../../components/Pagination/PaginationSearchParams';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { getSearchWith } from '../../utils/searchHelper';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Products } from '../../types/Products';
import { NoSearchResults }
  from '../../components/NoSearchResults';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/products/productsSlice';
import { Loader } from '../../components/Loader';

export const AccessoriesPage = () => {
  const [dataAccessories, setDataAccessories] = useState<Products[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsOnPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);

  const firstPageIndex = (+currentPage - 1) * itemsPerPage;
  const lastPageIndex = firstPageIndex + itemsPerPage;

  const loadProductsData = (data: string) => {
    dispatch(fetchProducts(data));
  };

  const sortedAccessoriesList
    = getSortedProducts(dataAccessories, sort, query);

  let paginatedData
    = sortedAccessoriesList.slice(firstPageIndex, lastPageIndex);

  paginatedData = itemsOnPage === 'All'
    ? paginatedData = sortedAccessoriesList
    : paginatedData;

  const handlePageChange = (page: number) => {
    const paramsToUpdate = {
      page: page.toString(),
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const getAccessories = () => {
    const accessoriesData
      = products.filter(product => product.category === 'accessories');

    setDataAccessories(accessoriesData);
  };

  useEffect(() => {
    if (status === 'idle') {
      loadProductsData('products');
    }
  }, [dispatch, status]);

  useEffect(() => {
    getAccessories();
  }, [products]);

  useEffect(() => {
    if (itemsOnPage !== 'All') {
      setItemsPerPage(+itemsOnPage);
    }
  }, [itemsOnPage]);

  useEffect(() => {
    const paramsToUpdate = {
      page: currentPage.toString(),
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  }, [currentPage, searchParams, setSearchParams]);

  const countAccessories = dataAccessories.length;

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
          <h1 className="accessoriesPage__title">Accessories</h1>
          <p className="accessoriesPage__description">{`${countAccessories} models`}</p>
          {(sortedAccessoriesList.length === 0 && query.length > 0) ? (
            <NoSearchResults />
          ) : (
            <>
              <div className="accessoriesPage__sortContainer">
                <DropDown type="sort-by" />
                <DropDown type="items-on-page" />
              </div>
              <ProductList
                dataProducts={paginatedData}
              />

              {itemsOnPage !== 'All' && (
                <PaginationSearchParams
                  countDatas={sortedAccessoriesList.length} // totalCount
                  itemsPerPage={itemsPerPage} // pageSize
                  onPageChange={handlePageChange}// onPageChange
                  currentPage={+currentPage}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
