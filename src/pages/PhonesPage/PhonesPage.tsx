import { useEffect, useState } from 'react';
import './phonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../../components/ProductList';
import { getSearchWith } from '../../utils/searchHelper';
import { PaginationSearchParams }
  from '../../components/Pagination/PaginationSearchParams';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { DropDown } from '../../components/DropDown';
import { Products } from '../../types/Products';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/products/productsSlice';
import { NoSearchResults } from '../../components/NoSearchResults';
import { Loader } from '../../components/Loader/Loader';

export const PhonesPage = () => {
  const [dataPhones, setDataPhones] = useState<Products[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(4);

  const dispatch = useAppDispatch();
  const { products, status }
    = useAppSelector(state => state.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const itemsOnPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  const firstPageIndex = (+currentPage - 1) * itemsPerPage;
  const lastPageIndex = firstPageIndex + itemsPerPage;

  const sortedPhoneList
    = getSortedProducts(dataPhones, sort, query);

  let paginatedData = sortedPhoneList.slice(firstPageIndex, lastPageIndex);

  paginatedData = itemsOnPage === 'All'
    ? paginatedData = sortedPhoneList
    : paginatedData;

  // const updatedPerPage = () => {
  //   if (itemsOnPage !== 'All') {
  //     setItemsPerPage(+itemsOnPage);
  //   }
  // };

  // const onPageChange = (page: number) => {
  //   if (page !== +currentPage) {
  //     setCurrentPage(page);
  //   }
  // };

  const handlePageChange = (page: number) => {
    const paramsToUpdate = {
      page: page.toString(),
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const loadProductsData = (data: string) => {
    dispatch(fetchProducts(data));
  };

  const getPhones = () => {
    const phones
      = products.filter(product => product.category === 'phones');

    setDataPhones(phones);
  };

  // const getSelectedPage = () => {
  //   const paramsToUpdate = {
  //     page: currentPage.toString(),
  //   };

  //   setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  // };

  // const getPhones = async () => {
  //   try {
  //     // setIsPhonesDataLoading(true);
  //     const dataProducts = await getAllData('products');
  //     const phones
  //       = dataProducts.filter(product => product.category === 'phones');

  //     setDataPhones(phones);
  //   } catch (error) {
  //     // setIsPhonesDataLoading(false);
  //   } finally {
  //     // setIsPhonesDataLoading(false);
  //   }
  // };

  useEffect(() => {
    if (status === 'idle') {
      loadProductsData('products');
    }
  }, [dispatch, status]);

  useEffect(() => {
    getPhones();
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

  const countMobilePhones = dataPhones.length;

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
          <h1 className="phonesPage__title">Mobile phones</h1>
          <p className="phonesPage__description">{`${countMobilePhones} models`}</p>

          {(sortedPhoneList.length === 0 && query.length > 0) ? (
            <NoSearchResults />
          ) : (
            <>
              <div className="phonesPage__sortContainer">
                <DropDown type="sort-by" />
                <DropDown type="items-on-page" />
              </div>
              <ProductList
                dataProducts={paginatedData}
              />
              {itemsOnPage !== 'All' && (
                <PaginationSearchParams
                  countDatas={sortedPhoneList.length} // totalCount
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
