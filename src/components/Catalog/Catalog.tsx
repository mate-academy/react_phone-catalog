import classNames from 'classnames';
import { Product } from '../../types/Product';
import style from './Catalog.module.scss';
import { BreadCrumbs } from '../BreadCrumbs';
import { SortFilter } from '../SortFilter';
import { ProductCard } from '../ProductCard';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { catalogHelper } from '../../utils/catalogHelper';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { getProductItems } from '../../utils/getProductItems';
import { Loader } from '../Loader';

type Props = {
  title: string;
  products: Product[];
  sortPerPageEnable?: boolean;
};
export const Catalog: React.FC<Props> = ({
  title,
  products,
  sortPerPageEnable = true,
}) => {
  const [searchParams] = useSearchParams();
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<Product[][]>([[]]);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    const category = products ? products[0].category : undefined;

    if (category) {
      setLoading(true);
      getProductItems
        .fetchByCategory(category)
        .finally(() => setLoading(false));
    }
  }, [products]);

  useEffect(() => {
    setSortedProducts(() =>
      catalogHelper.sort(searchParams.get(SearchParams.order), products),
    );

    setCurPage(() => catalogHelper.getCurrenPageParam(searchParams) - 1);
  }, [searchParams, products]);

  useEffect(() => {
    setPages(() =>
      catalogHelper.perPage(
        searchParams.get(SearchParams.perPage),
        sortedProducts,
      ),
    );
  }, [sortedProducts, searchParams, products]);

  return (
    <div className={classNames(style.catalog_container)}>
      {loading ? (
        <Loader />
      ) : products ? (
        <>
          <div className={classNames(style.container_breadcrubs)}>
            <BreadCrumbs />
          </div>

          <div className={classNames(style.container_title)}>
            <h1 className={classNames(style.container_title_text)}>{title}</h1>
            <p className={classNames(style.container_title_count)}>
              {products.length !== 1
                ? `${products.length} models`
                : 'no models'}
            </p>
          </div>

          <div className={classNames(style.container_search_filter)}>
            {sortPerPageEnable && <SortFilter />}
          </div>

          <div className={classNames(style.container_catalog)}>
            {pages[curPage] &&
              pages[curPage].map(product => {
                return (
                  <div
                    key={product.id}
                    className={classNames(style.container_product)}
                  >
                    <ProductCard product={product} />
                  </div>
                );
              })}
          </div>

          <div className={classNames(style.container_pagination)}>
            {pages.length > 1 && <Pagination pages={pages} />}
          </div>
        </>
      ) : (
        <div className={style.products_not_found_container}>
          <h3>Sorry Products Not Found</h3>
          <div className={style.img}></div>
        </div>
      )}
    </div>
  );
};
