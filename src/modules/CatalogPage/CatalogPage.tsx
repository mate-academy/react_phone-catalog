import { useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { CategoriesContext } from '../../Context/CategoriesContext';
import { ProductsContext } from '../../Context/ProductsContext';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Dropdown } from './Dropdown';
import { Loader } from '../../components/Loader';

import s from './CatalogPage.module.scss';

export const CatalogPage = () => {
  const { pathname } = useLocation();
  const categories = useContext(CategoriesContext);
  const products = useContextSelector(ProductsContext, ctx => ctx.products);
  const isLoading = useContextSelector(ProductsContext, ctx => ctx.isLoading);
  const [searchParams] = useSearchParams();

  const page = +(searchParams.get('page') || 1) - 1;
  const sort = searchParams.get('sort') || 'newest';

  const perPageParam = searchParams.get('perpage') || 'all';
  const prodsPerPage: number | 'all' =
    perPageParam === 'all' ? 'all' : +(perPageParam ?? 8);

  const pageTitle =
    categories.find(
      category => category.name.toLowerCase() === pathname.slice(1),
    )?.longName || 'Catalog';

  const catalogProds = products.filter(item => {
    return item.category === pathname.slice(1);
  });

  const visibleProductsSort = () => {
    switch (sort) {
      case 'newest':
        return [...catalogProds].sort(
          (itemA, itemB) => itemB.year - itemA.year,
        );
      case 'price':
        return [...catalogProds].sort(
          (itemA, itemB) => itemA.price - itemB.price,
        );
      case 'alphabet':
        return [...catalogProds].sort((itemA, itemB) =>
          itemA.name.localeCompare(itemB.name, undefined, {
            sensitivity: 'base',
          }),
        );

      default:
        return catalogProds;
    }
  };

  const visibleProducts = visibleProductsSort();

  const productsToRender =
    prodsPerPage === 'all'
      ? visibleProducts
      : visibleProducts.slice(
          page * prodsPerPage,
          page * prodsPerPage + prodsPerPage,
        );

  const pages =
    prodsPerPage === 'all'
      ? 1
      : Math.ceil(visibleProducts.length / +prodsPerPage);

  return (
    <>
      <Breadcrumb />

      <h1 className="title is-size-3-mobile is-size-1 mb-2">{pageTitle}</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className={`${s.items_info}`}>
            {catalogProds.length} item{catalogProds.length === 1 ? '' : 's'}
          </p>

          <Dropdown />

          <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen mb-0 catalog">
            <div className="grid">
              {productsToRender.map(item => (
                <div className="cell" key={item.id}>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
          {prodsPerPage !== 'all' && <Pagination pages={pages} type="full" />}
        </>
      )}
    </>
  );
};
