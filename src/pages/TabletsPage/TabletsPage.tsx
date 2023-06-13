import React, { useContext, useEffect, useState } from 'react';
import './tabletsPage.scss';
import { getData } from '../../api/data';
import { Phones } from '../../types/Phones';
import { DataFilters } from '../../components/DataFilters/DataFilters';
import { ItemsOnPage } from '../../components/ItemsOnPage/ItemsOnPage';
import ProductList from '../../components/ProductList/ProductList';

export const TabletsPage = () => {
  const [isTabletsDataLoading, setIsTabletsDataLoading] = useState(false);
  const [dataTablets, setDataTablets] = useState<Phones[]>([]);
  const [filtredTablets, setFiltredTablets] = useState<Phones[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(dataTablets.length);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const countTablets = dataTablets.length;

  const handleChangeItemsPerPage = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const getTablets = async () => {
    try {
      setIsTabletsDataLoading(true);
      const dataProducts = await getData();
      const dataTablets = dataProducts.filter(product => product.category === 'tablets');

      setDataTablets(dataTablets);
    } catch (error) {
      setIsTabletsDataLoading(false);
    } finally {
      setIsTabletsDataLoading(false);
    }
  };

  useEffect(() => {
    getTablets();
  }, []);

  return (
    <>
      <h1 className="tabletsPage__title">Tablets</h1>
      <p className="tabletsPage__description">{`${countTablets} models`}</p>
      <div className="tabletsPage__sortContainer">
        <DataFilters
          dataPhones={dataTablets}
          setFiltredPhones={setFiltredTablets}
        />
        <ItemsOnPage
          setItemsPerPage={handleChangeItemsPerPage}
        />
      </div>
      <ProductList
        dataPhones={filtredTablets}
      />
    </>
  );
};
