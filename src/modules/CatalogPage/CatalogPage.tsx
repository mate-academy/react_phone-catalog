import { Breadcrumbs } from '../Shared/Breadcrumbs/Breadcrumbs';
import { Catalog } from './Catalog/Catalog';
import { Pagination } from './Pagination/Pagination';
import { PhonesTitle } from '../Shared/PhonesTitle/Phones-title';
import { Sort } from './Sort/Sort';
import useCatalogData from '../Hooks/UseCatalogData';
import { useState, useEffect } from 'react';
import { Phone, SortType } from '../../Types/type';
import { Loading } from '../Shared/Loading/Loading';
import { ErrorPage } from '../Shared/ErrorPage/ErrorPage';

interface CatalogProps {
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favouriteButton: Set<string>;
}

export const CatalogPage = ({
  toggleInCart,
  toggleFavourite,
  favouriteButton,
}: CatalogProps) => {
  const [sortNumber, setSortNumber] = useState(16);
  const [sortType, setSortType] = useState<SortType>('');
  const {
    itemsOnPage,
    setItemsOnPage,
    products,
    setProducts,
    loading,
    error,
    reload,
  } = useCatalogData();

  useEffect(() => {
    if (products.length > 0) {
      if (sortNumber >= products.length) {
        setItemsOnPage(products);
      } else {
        setItemsOnPage(products.slice(0, sortNumber));
      }
    }
  }, [sortNumber, products, setItemsOnPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage onReload={reload} />;
  }

  if (products.length === 0) {
    return (
      <>
        <Breadcrumbs />
        <PhonesTitle />
        <div>No products found</div>
      </>
    );
  }

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

  const showPagination = sortNumber < products.length;

  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Sort
        sortNumber={sortNumber}
        setSortNumber={setSortNumber}
        onSortChange={handleSort}
        products={products}
      />
      <Catalog
        itemsOnPage={itemsOnPage}
        toggleFavourite={toggleFavourite}
        toggleInCart={toggleInCart}
        favouriteButton={favouriteButton}
      />

      {showPagination && (
        <Pagination
          products={products}
          sortNumber={sortNumber}
          setItemsOnPage={setItemsOnPage}
        />
      )}
    </>
  );
};
