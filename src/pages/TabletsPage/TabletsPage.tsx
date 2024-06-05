import { useEffect, useState } from 'react';
import './tabletsPage.scss';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../../components/ProductList/ProductList';
import { DropDown } from '../../components/DropDown';
// eslint-disable-next-line max-len
import { PaginationSearchParams } from '../../components/Pagination/PaginationSearchParams';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { getSearchWith } from '../../utils/searchHelper';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Products } from '../../types/Products';
import { NoSearchResults } from '../../components/NoSearchResults';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/products/productsSlice';
import { Loader } from '../../components/Loader';

export const TabletsPage = () => {
  const [dataTablets, setDataTablets] = useState<Products[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsOnPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);

  const loadProductsData = (data: string) => {
    dispatch(fetchProducts(data));
  };

  const firstPageIndex = (+currentPage - 1) * itemsPerPage;
  const lastPageIndex = firstPageIndex + itemsPerPage;

  const sortedTabletsList = getSortedProducts(dataTablets, sort, query);

  let paginatedData = sortedTabletsList.slice(firstPageIndex, lastPageIndex);

  paginatedData =
    itemsOnPage === 'All' ? (paginatedData = sortedTabletsList) : paginatedData;

  const handlePageChange = (page: number) => {
    const paramsToUpdate = {
      page: page.toString(),
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const getTablets = () => {
    const tabletsData = products.filter(
      product => product.category === 'tablets',
    );

    setDataTablets(tabletsData);
  };

  useEffect(() => {
    if (status === 'idle') {
      loadProductsData('products');
    }
  }, [dispatch, status]);

  useEffect(() => {
    getTablets();
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

  const countTablets = dataTablets.length;

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <main className="tabletsPage">
              <Breadcrumbs />
              <h1 className="tabletsPage__title">Tablets</h1>
              <p className="tabletsPage__description">{`${countTablets} models`}</p>
              {sortedTabletsList.length === 0 && query.length > 0 ? (
                <NoSearchResults />
              ) : (
                <>
                  <div className="tabletsPage__sortContainer">
                    <DropDown type="sort-by" />
                    <DropDown type="items-on-page" />
                  </div>
                  <ProductList dataProducts={paginatedData} />

                  {itemsOnPage !== 'All' && (
                    <PaginationSearchParams
                      countDatas={sortedTabletsList.length} // totalCount
                      itemsPerPage={itemsPerPage} // pageSize
                      onPageChange={handlePageChange} // onPageChange
                      currentPage={+currentPage}
                    />
                  )}
                </>
              )}
            </main>
          </div>
        </>
      )}
    </>
  );
};
