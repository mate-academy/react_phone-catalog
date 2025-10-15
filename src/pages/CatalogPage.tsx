import { Breadcrumbs } from '../components/Breadcrumbs/breadcrumbs';
import { Catalog } from '../components/Catalog/catalog';
import { Pagination } from '../components/Pagination/pagination';
import { PhonesTitle } from '../components/PhonesTitle/phones-title';
import { Sort } from '../components/Sort/sort';
import useCatalogData from '../components/Hook/UseCatalogData';
import { useState } from 'react';
import { SortType } from '../Types/type';

export const CatalogPage = () => {
  const [sortNumber, setSortNumber] = useState(16);
  const [sortType, setSortType] = useState<SortType>('');
  const { itemsOnPage, setItemsOnPage, products, setProducts } = useCatalogData();

  const handleSort = (type: SortType) => {
    if (products.length === 0) return;
    
    let sortedProducts = [...products];
    
    if (type === 'expensive') {
      sortedProducts.sort((a, b) => b.priceRegular - a.priceRegular);
    } else if (type === 'cheaper') {
      sortedProducts.sort((a, b) => a.priceRegular - b.priceRegular);
    } else if (type === 'discount') {
      sortedProducts.sort((a, b) => b.priceDiscount - a.priceDiscount);
    }
    
    setProducts(sortedProducts);
    setSortType(type);
  };

  if (products.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Sort
        sortNumber={sortNumber}
        setSortNumber={setSortNumber}
        onSortChange={handleSort}
      />
      <Catalog itemsOnPage={itemsOnPage} />
      <Pagination
        products={products}
        sortNumber={sortNumber}
        setItemsOnPage={setItemsOnPage}
      />
    </>
  );
};