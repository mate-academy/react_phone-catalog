import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import './ProductsPage.scss';
import { Filter } from '../FilterForItems';
import { useEffect, useState } from 'react';
import { Catalog } from '../Catalog';
import { ProductItem } from '../types/Phone';
import { NavigationInPage } from '../NavigationInPage/NavigationInPage';
import { CountItem } from '../CountItem';

interface Props {
  pageName: string;
}

export const ProductPage: React.FC<Props> = ({ pageName }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ProductItem[]>([]);
  const [filteredItemsInPage, setFilteredItemsInPage] = useState<ProductItem[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const { phoneId } = useParams();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const sorting = searchParams.get('sort') || '';
  const countOfItems = parseInt(searchParams.get('items') || '16', 10);
  const pageOfItems = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    setIsLoading(true);
    fetch('./api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка при завантаженні даних');
        }

        return response.json();
      })
      .then((data: ProductItem[]) => {
        setProducts(data);
        setError(null);
      })
      .catch(() => {
        setError('Сталася помилка при завантаженні даних');
        setProducts([]);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 700),
      );
  }, []);

  useEffect(() => {
    let filtered = [...products];

    switch (pageName) {
      case 'phone':
        filtered = filtered.filter(item => item.category === 'phones');
        break;
      case 'tablets':
        filtered = filtered.filter(item => item.category === 'tablets');
        break;
      case 'accessories':
        filtered = filtered.filter(item => item.category === 'accessories');
        break;
    }

    switch (sorting) {
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'cheapest':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'most_capacity':
        filtered.sort((a, b) => {
          const capA = parseInt(a.capacity.replace(/\D/g, ''), 10);
          const capB = parseInt(b.capacity.replace(/\D/g, ''), 10);

          return capB - capA;
        });
        break;
    }

    setFilteredItems(filtered);

    const startIndex = (pageOfItems - 1) * countOfItems;
    const endIndex = startIndex + countOfItems;
    const currentPageItems = filtered.slice(startIndex, endIndex);

    setFilteredItemsInPage(currentPageItems);
  }, [products, searchParams, pageName]);

  return (
    <div className="phones-page">
      <NavigationInPage />
      {!phoneId ? (
        <h1 className="title main__text">
          {pageName === 'phone'
            ? 'Mobile phones'
            : pageName.charAt(0).toUpperCase() + pageName.slice(1)}
        </h1>
      ) : (
        ''
      )}

      {!error ? (
        <>
          {' '}
          {phoneId ? (
            <Outlet />
          ) : (
            <>
              <div className="count">
                <CountItem count={filteredItems.length} />
              </div>
              <Filter />

              <Catalog
                filteredItemsInPage={filteredItemsInPage}
                filteredItems={filteredItems}
                loading={isLoading}
              />
            </>
          )}
        </>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};
