import { useEffect, useState } from 'react';
import './phonesPage.scss';
import { getData } from '../../api/data';
import { Phones } from '../../types/Phones';
import { DataFilters } from '../../components/DataFilters/DataFilters';
import { ItemsOnPage } from '../../components/ItemsOnPage/ItemsOnPage';
import ProductList from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination';

export const PhonesPage = () => {
  // const [isPhonesDataLoading, setIsPhonesDataLoading] = useState(false);
  const [dataPhones, setDataPhones] = useState<Phones[]>([]);
  const [filtredPhones, setFiltredPhones] = useState<Phones[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(dataPhones.length);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangeItemsPerPage = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const getPhones = async () => {
    try {
      // setIsPhonesDataLoading(true);
      const dataProducts = await getData();
      const dataPhones = dataProducts.filter(product => product.category === 'phones');

      setDataPhones(dataPhones);
    } catch (error) {
      // setIsPhonesDataLoading(false);
    } finally {
      // setIsPhonesDataLoading(false);
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  // const mobilePhones = productsData.filter(product => product.category === 'phones');
  const countMobilePhones = dataPhones.length;

  return (
    <>
      <h1 className="phonesPage__title">Mobile phones</h1>
      <p className="phonesPage__description">{`${countMobilePhones} models`}</p>
      <div className="phonesPage__sortContainer">
        <DataFilters
          dataPhones={dataPhones}
          setFiltredPhones={setFiltredPhones}
        />
        <ItemsOnPage
          setItemsPerPage={handleChangeItemsPerPage}
        />
      </div>

      <ProductList
        dataPhones={filtredPhones}
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        dataPhones={dataPhones}
        onPageChange={onPageChange}
        setCurrentPage={setCurrentPage}
      />

    </>
  );
};
