import { useEffect, useState } from 'react';
import './accessoriesPage.scss';
import { getData } from '../../api/data';
import { Phones } from '../../types/Phones';
import { DataFilters } from '../../components/DataFilters/DataFilters';
import { ItemsOnPage } from '../../components/ItemsOnPage/ItemsOnPage';
import { ProductList } from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination';

export const AccessoriesPage = () => {
  // const [isAccesoriesDataLoading, setIsAccesoriesDataLoading] = useState(false);
  const [dataAccessories, setDataAccessories] = useState<Phones[]>([]);
  const [filtredAccessories, setFiltredAccessories] = useState<Phones[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(dataAccessories.length);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const countAccessories = dataAccessories.length;

  const handleChangeItemsPerPage = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const getAccessories = async () => {
    try {
      // setIsAccesoriesDataLoading(true);
      const dataProducts = await getData();
      const dataAccessories = dataProducts.filter(product => product.category === 'accessories');

      setDataAccessories(dataAccessories);
    } catch (error) {
      // setIsAccesoriesDataLoading(false);
    } finally {
      // setIsAccesoriesDataLoading(false);
    }
  };

  useEffect(() => {
    getAccessories();
  }, []);

  return (
    <>
      <h1 className="accessoriesPage__title">Accessories</h1>
      <p className="accessoriesPage__description">{`${countAccessories} models`}</p>
      <div className="accessoriesPage__sortContainer">
        <DataFilters
          dataPhones={dataAccessories}
          setFiltredPhones={setFiltredAccessories}
        />
        <ItemsOnPage
          setItemsPerPage={handleChangeItemsPerPage}
        />
      </div>
      <ProductList
        dataPhones={filtredAccessories}
      />
    </>
  );
};
