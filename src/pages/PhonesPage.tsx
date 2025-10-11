import { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/breadcrumbs';
import { Catalog } from '../components/Catalog/catalog';
import { Pagination } from '../components/Pagination/pagination';
import { PhonesTitle } from '../components/PhonesTitle/phones-title';
import { Sort } from '../components/Sort/sort';
import useCatalogData from '../../src/components/Hook/UseCatalogData'

interface PhonesPageProps {
}

export const PhonesPage = () => {
  const { itemsOnPage, setItemsOnPage } = useCatalogData();

  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Sort />
      <Catalog itemsOnPage={itemsOnPage} />
      <Pagination
        itemsOnPage={itemsOnPage}
        setItemsOnPage={setItemsOnPage}
      />
    </>
  );
};
