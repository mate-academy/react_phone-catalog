import { Outlet, useSearchParams } from 'react-router-dom';
import { CurrentPath } from '../../components/CurrentPath/CurrentPath';
import { useContext, useEffect } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { GetPoroductsForView } from '../../utils/GetProductsForView';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { FilterProduct } from '../../components/FilterProduct/FilterProduct';
import { SortParametr } from '../../components/FilterProduct/FilterProduct';
import { Pagination } from '../../components/Pagination/Pagination';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

export const AccessoriesPage = () => {
  const { accessoriesFromServer } = useContext(CatalogContext);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');

  let accessoriesForShow: Phone[] | Tablet[] | Accessory[] = [];

  if (accessoriesFromServer) {
    accessoriesForShow = [...GetPoroductsForView(accessoriesFromServer)];
  }

  let sortedProducts: Phone[] | Tablet[] | Accessory[] = [
    ...accessoriesForShow,
  ];

  if (accessoriesFromServer && page && perPage) {
    const startItem = +page * +perPage - +perPage;
    const endItem = Math.min(+page * +perPage, accessoriesForShow.length);

    switch (sort) {
      case SortParametr.NAME:
        sortedProducts = sortedProducts
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(startItem, endItem);
        break;
      case SortParametr.PRICE:
        sortedProducts = sortedProducts
          .sort((a, b) => a.priceRegular - b.priceRegular)
          .slice(startItem, endItem);
        break;
      case SortParametr.DATE:
        // sortedProducts = sortedProducts.sort((a, b) => b.year - a.year).slice(startItem, endItem)
        break;
      default:
        sortedProducts = [...accessoriesForShow].slice(startItem, endItem);
        break;
    }
  }

  useEffect(() => {
    if (page && perPage) {
      const startItem = +page * +perPage - +perPage;
      const endItem = Math.min(+page * +perPage, accessoriesForShow.length);

      sortedProducts.slice(startItem, endItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, perPage]);

  return (
    <section className="first-screen">
      <div className="container">
        <CurrentPath />
        <h1 className="main-title">Accessories</h1>
        <p className="phones__number page__number-info">
          {accessoriesForShow &&
            accessoriesForShow.length > 0 &&
            `${accessoriesForShow.length} models`}
        </p>
        <FilterProduct />
        <div className="phones__grid page__grid">
          {sortedProducts.length > 0 &&
            sortedProducts.map(item => (
              <ProductItem key={item.id} product={item} section="phones" />
            ))}
        </div>
        <Outlet />
        {accessoriesForShow.length > 0 &&
          perPage &&
          accessoriesForShow.length > +perPage && ( // eslint-disable-next-line
          <Pagination itemsNumber={accessoriesForShow.length} />)}
      </div>
    </section>
  );
};
