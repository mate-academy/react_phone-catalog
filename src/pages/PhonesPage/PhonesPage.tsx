import { useEffect, useState } from 'react';
import './phonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { getData } from '../../api/data';
import { Phones } from '../../types/Phones';
import { ProductList } from '../../components/ProductList';
// import { PaginationSearchParams }
//   from '../../components/Pagination/PaginationSearchParams';
// import { DataFilters } from '../../components/DataFilters';
// import { ItemsOnPage } from '../../components/ItemsOnPage';
// import { ProductList } from '../../components/ProductList';
// import { Pagination } from '../../components/Pagination';
import { getSearchWith } from '../../utils/searchHelper';
import { PaginationSearchParams }
  from '../../components/Pagination/PaginationSearchParams';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const PhonesPage = () => {
  const [dataPhones, setDataPhones] = useState<Phones[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const indexOflastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOflastItem - itemsPerPage;
  // let paginatedData = dataPhones.slice(indexOfFirstItem, indexOflastItem);

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

  const updatedPerPage = () => {
    if (itemsOnPage !== 'All') {
      setItemsPerPage(+itemsOnPage);
    }
  };

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

  const getSelectedPage = () => {
    const paramsToUpdate = {
      page: currentPage.toString(),
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const getPhones = async () => {
    try {
      // setIsPhonesDataLoading(true);
      const dataProducts = await getData();
      const phones
        = dataProducts.filter(product => product.category === 'phones');

      setDataPhones(phones);
    } catch (error) {
      // setIsPhonesDataLoading(false);
    } finally {
      // setIsPhonesDataLoading(false);
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  useEffect(() => {
    updatedPerPage();
  }, [itemsOnPage]);

  useEffect(() => {
    getSelectedPage();
  }, [currentPage]);

  const countMobilePhones = dataPhones.length;

  return (
    <>
      <Breadcrumbs />
      <h1 className="phonesPage__title">Mobile phones</h1>
      <p className="phonesPage__description">{`${countMobilePhones} models`}</p>

      {/* <DataFilters
          dataPhones={dataPhones}
          setFiltredPhones={setFiltredPhones}
        />
        <ItemsOnPage
          setItemsPerPage={handleChangeItemsPerPage}
          // dataPhones={dataPhones}
          dataLength={dataPhones.length}
        /> */}

      <ProductList
        dataPhones={paginatedData}
      />
      {itemsOnPage !== 'All' && (
        <PaginationSearchParams
          countDatas={sortedPhoneList.length} // totalCount
          itemsPerPage={itemsPerPage} // pageSize
          onPageChange={handlePageChange}// onPageChange
          currentPage={+currentPage}
        />
      )}
      {/* {itemsOnPage !== 'All' && (
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          countDatas={countMobilePhones}
          onPageChange={onPageChange}
          setCurrentPage={setCurrentPage}
        />
      )} */}

    </>
  );
};
