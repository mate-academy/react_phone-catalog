/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import s from './ModelsPage.module.scss';
import { getProducts } from '../../httpClient';
import { Card } from '../../components/Card';
import { Product } from '../../types/Product';
import { SortBy, SortByKeys } from '../../constants';
import { useParams, useSearchParams } from 'react-router-dom';
import { getFilteredData } from '../../services/getProducts';
import { capitalize } from 'lodash';
import { ModelFilter } from '../../components/ModelPageParts/ModelFilter';
import { ModelPagination } from '../../components/ModelPageParts/ModelPagination';
import { PageTop } from '../../components/PageTop';

export const ModelsPage: React.FC = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const sortBy = (searchParams.get('sortBy') || SortBy.newest) as SortByKeys;
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 16;

  const last = perPage * page;
  const start = last - perPage;
  const productsToShow = products.slice(start, last);

  useEffect(() => {
    document.title = `Nice Gadgets | ${capitalize(category)}`;
    setProducts([]);

    getProducts().then((data: Product[]) => {
      const filteredData = getFilteredData(data, category as string, sortBy);

      setProducts(filteredData);
    });
  }, [category]);

  useEffect(() => {
    const filteredData = getFilteredData(products, category as string, sortBy);

    setProducts(filteredData);
  }, [sortBy]);

  return (
    <div className={s.ModelsPage}>
      <div className={s.ModelsPage__currentPage}>
        <PageTop
          category={category as string}
          productsLength={products.length}
        />
      </div>

      <ModelFilter sortField="sortBy" />
      <ModelFilter sortField="perPage" />

      <div className={s.ModelsPage__cards}>
        {productsToShow.map(p => (
          <div key={p.id} className={s.ModelsPage__card}>
            <Card product={p} isHot />
          </div>
        ))}
      </div>
      <ModelPagination
        productLength={products.length}
        perPage={perPage}
        page={page}
      />
    </div>
  );
};
