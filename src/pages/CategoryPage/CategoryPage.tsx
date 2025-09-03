import { useContext, useMemo } from 'react';
import { ApiContext } from '../../context/ApiContext';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { ProductPagination } from '../../components/ProductPagination';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageNotFound } from '../PageNotFound';

type FillterTypes = 'newest' | 'lowest' | 'highest';

const allowedCategories = ['phones', 'tablets', 'accessories'] as const;

type Category = (typeof allowedCategories)[number];

export const CategoryPage: React.FC = () => {
  const productsAll = useContext(ApiContext) as ProductType[];

  const { category } = useParams();

  const title = category
    ? category[0].toUpperCase() + category.slice(1)
    : 'False category';

  const [searchParams] = useSearchParams();

  const sort = (searchParams.get('sort') || 'newest') as FillterTypes;
  const limit = +(searchParams.get('limit') || 16);
  const page = +(searchParams.get('page') || 1);

  const products = useMemo(
    () => productsAll.filter(p => p.category === category),
    [productsAll, category],
  );

  const productsFiltered = useMemo(() => {
    return [...products].sort((item1: ProductType, item2: ProductType) => {
      switch (sort) {
        case 'newest':
          return item2.year - item1.year;
        case 'highest':
          return item2.price - item1.price;
        case 'lowest':
          return item1.price - item2.price;
        default:
          return item2.year - item1.year;
      }
    });
  }, [products, sort]);

  const PAGES = Math.ceil(productsFiltered.length / limit);

  const arrayOfPages = Array.from({ length: PAGES }, (_, index) => index + 1);

  const START_VALUE = page === 1 ? 0 : limit * (page - 1);
  const END_VALUE = page === 1 ? limit : limit * page;

  const isValidCategory = allowedCategories.includes(category as Category);

  return (
    <div className="container">
      {!isValidCategory ? (
        <PageNotFound />
      ) : (
        <>
          <Breadcrumbs />
          <h1 className="title title-mobile"> {title}</h1>
          <ProductFilter />
          <ProductCatalog
            models={productsFiltered.slice(START_VALUE, END_VALUE)}
          />
          <ProductPagination pages={arrayOfPages} />
        </>
      )}
    </div>
  );
};
