import { Breadcrumbs } from "../components/Breadcrumbs/breadcrumbs";
import { Catalog } from "../components/Catalog/catalog";
import useCatalogData from '../../src/components/Hook/UseCatalogData'
import { Sort } from "../components/Sort/sort";
import { PhonesTitle } from "../components/PhonesTitle/phones-title";
import { Pagination } from "../components/Pagination/pagination";

export const TabletsPage = () => {
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
}