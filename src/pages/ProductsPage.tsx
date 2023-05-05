import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { Selector } from '../components/Selector';
import { Pagination } from '../components/Pagination';
import { NoResults } from '../components/NoResults';
import { Message } from '../components/Message';
import { Breadcrumbs } from '../components/Breadcrumbs';

type Props = {
  getProductsOfType: (products: Product[]) => Product[],
  pageTitle: string;
};

export const ProductsPage: React.FC<Props> = ({
  getProductsOfType,
  pageTitle,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase();

  const sortItems = [
    { text: 'Newest', value: 'age' },
    { text: 'Alphabetically', value: 'name' },
    { text: 'Cheapest', value: 'price' },
  ];
  const paginationItems = [
    { text: '4', value: '4' },
    { text: '8', value: '8' },
    { text: '16', value: '16' },
    { text: 'all', value: 'all' },
  ];

  const defaultSort = 'age';
  const defaultPerPage = '4';
  const sortBy = searchParams.get('sort') || defaultSort;
  const perPage = searchParams.get('perPage') || defaultPerPage;
  const page = searchParams.get('page') || '1';

  const priceWithDiscount = (product: Product) => {
    return product.price - (product.price * product.discount) / 100;
  };

  const products = getProductsOfType(allProducts);

  const foundProducts = query
    ? products.filter(item => item.name.toLowerCase().includes(query))
    : [...products];

  const getPerPage = () => {
    return perPage === 'all' ? foundProducts.length : +perPage;
  };

  const beginItem = getPerPage() * +page - getPerPage();
  const endItem = (getPerPage() * +page > foundProducts.length)
    ? foundProducts.length
    : getPerPage() * +page;

  const getVisibleProducts = () => {
    switch (sortBy) {
      case 'name':
        foundProducts.sort((productA, productB) => {
          return productA.name.localeCompare(productB.name);
        });
        break;

      case 'price':
        foundProducts.sort((productA, productB) => {
          const a = productA.discount
            ? priceWithDiscount(productA)
            : productA.price;
          const b = productB.discount
            ? priceWithDiscount(productB)
            : productB.price;

          return a - b;
        });
        break;

      default:
        foundProducts.sort((productA, productB) => {
          return productA.age - productB.age;
        });
    }

    return foundProducts.slice(beginItem, endItem);
  };

  const visibleProducts = getVisibleProducts();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getProducts()
      .then(loadedProducts => setAllProducts(loadedProducts))
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageTitle]);

  return (
    <div className="products-page">
      <div className="products-page__breadcrumbs">
        <Breadcrumbs />
      </div>
      <h1 className="products-page__title">{pageTitle}</h1>
      <div className="products-page__quantity">{`${products.length} models`}</div>

      {!isError && !isLoading && !!foundProducts.length && (
        <section>
          <div className="products-page__filters">
            <div className="products-page__sort">
              <p className="products-page__filters-title">Sort by</p>
              <Selector
                items={sortItems}
                filterName="sort"
                defaultValue={defaultSort}
              />
            </div>
            <div className="products-page__items-on-page">
              <p className="products-page__filters-title">Items on page</p>
              <Selector
                items={paginationItems}
                filterName="perPage"
                defaultValue={defaultPerPage}
              />
            </div>
          </div>
          <div className="products-page__products-container">
            <ProductsList products={visibleProducts} />
          </div>
          <div className="products-page__pagination-container">
            <Pagination
              quantity={foundProducts.length}
              perPage={getPerPage()}
              page={page}
            />
          </div>
        </section>
      )}
      {isError && (
        <Message message="Failed to load products" isError />
      )}
      {isLoading && (
        <Loader />
      )}
      {!isError && !isLoading && !foundProducts.length && !!products.length && (
        <Message message="No search results" isError={false} />
      )}
      {!isError && !isLoading && !products.length && (
        <NoResults categoryName={pageTitle} />
      )}
    </div>
  );
};
