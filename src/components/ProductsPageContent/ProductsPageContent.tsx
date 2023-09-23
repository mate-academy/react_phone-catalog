import React, { useEffect, useState } from 'react';
import './ProductsPageContent.scss';
import { useSearchParams } from 'react-router-dom';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { DisplayOptions } from '../DisplayOptions/DisplayOptions';
import { Pagination } from '../Pagination/Pagination';
import { ProductsList } from '../ProductsList/ProductsList';
import { PageData } from '../../types/PageData';
import { Product } from '../../types/Product';
import { getProductsUnderLimit } from '../../helpers/getProductUnderLimit';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { defaultSearchParams } from '../../data/defaultSearchParams';
import { getPageData } from '../../helpers/getPageData';
import { getFoundProducts } from '../../helpers/getFoundProducts';
import { NoProductsYet } from '../NoProductsYet/NoProductsYet';

const MAX_PAGE_COUNT = 5;

type Props = {
  data: PageData,
  products: Product[],
};

export const ProductsPageContent: React.FC<Props> = ({ data, products }) => {
  const { navName, name, link } = data;
  const countModels = products.length;
  const countText = countModels > 1 ? 'models' : 'model';

  const isFavourites = link === 'favourites';

  const breadcrumbsData = {
    category: { name: navName, url: link },
  };

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [pageData, setPageData] = useState<number[]>([]);
  const [fullPageCount, setFullPageCount] = useState(0);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || defaultSearchParams.sort;
  const limit = searchParams.get('limit') || defaultSearchParams.limit;
  const page = searchParams.get('page') || defaultSearchParams.page;
  const query = searchParams.get('query') || defaultSearchParams.query;

  const isLimit = limit !== 'all' && Number.isInteger(+limit);

  useEffect(() => {
    const sortedProducts = getSortedProducts(sort, products);
    const foundProducts = query
      ? getFoundProducts(query, sortedProducts)
      : sortedProducts;

    setAvailableProducts(foundProducts);

    const limitedProduct = isLimit
      ? getProductsUnderLimit(+limit, +page, foundProducts)
      : foundProducts;

    setVisibleProducts(limitedProduct);

    const pageLimit = isLimit
      ? +limit
      : 0;

    const newPageData = getPageData(
      pageLimit,
      foundProducts.length,
      +page,
      MAX_PAGE_COUNT,
    );

    const newFullPageCount = Math.ceil(foundProducts.length / +limit);

    setFullPageCount(newFullPageCount);
    setPageData(newPageData);
  }, [limit, page, sort, query, products]);

  const findProductsText = availableProducts.length === 1
    ? 'result'
    : 'results';

  const isShow = {
    products: products.length > 0,
    top: !query,
    displayOptions: !isFavourites,
    pagination: isLimit && (Math.ceil(availableProducts.length / +limit) > 1),
    findProductsCount: query,
  };

  return (
    <>
      {isShow.findProductsCount
        && (
          <span className="products-page__search-results">
            {`${availableProducts.length} ${findProductsText}`}
          </span>
        )}
      {isShow.top && (
        <>
          <div className="products-page__breadcrumbs">
            <Breadcrumbs data={breadcrumbsData} />
          </div>
          <h1 className="products-page__title">{name}</h1>
          {isShow.products && (
            <>
              <p className="products-page__description">{`${countModels} ${countText}`}</p>
              {isShow.displayOptions && (
                <section className="products-page__display-options">
                  <DisplayOptions />
                </section>
              )}
            </>
          )}
        </>
      )}
      {isShow.products ? (
        <TransitionGroup
          component="section"
          className="products-page__products"
        >
          <CSSTransition
            key={`${new Date()}`}
            timeout={200}
            classNames="products-page__item"
            exit={false}
            enter={!isFavourites}
          >
            <ProductsList products={visibleProducts} />
          </CSSTransition>
        </TransitionGroup>
      )
        : <NoProductsYet />}
      {isShow.pagination && (
        <div className="products-page__pagination">
          <Pagination pageData={pageData} fullPageCount={fullPageCount} />
        </div>
      )}
    </>
  );
};
