import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';
import './ProductList.scss';
// eslint-disable-next-line max-len
import { SelectSortBy } from '../../modules/PhonesPage/components/SelectSortBy/SelectSortBy';
// eslint-disable-next-line max-len
import { SelectPerPage } from '../../modules/PhonesPage/components/SelectPerPage/SelectPerPage';
// eslint-disable-next-line max-len
import { ButtonPrevNext } from '../../modules/PhonesPage/components/ButtonPrevNext/ButtonPrevNext';

type Props = {
  category: string;
};

export const ProductList: React.FC<Props> = ({ category }) => {
  const [productOfCategory, setProductOfCategory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchParams] = useSearchParams();

  const [cart, setCart] = useState<Product[]>(() => {
    const saved = localStorage.getItem('CartStore');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }

    return [];
  });

  const [favorite, setFavorite] = useState<Product[]>(() => {
    const saved = localStorage.getItem('FavoriteStore');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('CartStore', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('FavoriteStore', JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load products');
        }

        return res.json();
      })
      .then(data =>
        setProductOfCategory(
          data.filter((product: Product) => product.category === category),
        ),
      )
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category, reloadKey]);

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const page = searchParams.get('page') || '1';

  const sortedPhones = useMemo(() => {
    return [...productOfCategory].sort((a, b) => {
      switch (sort) {
        case 'alphabetically':
          return a.name.localeCompare(b.name);
        case 'cheapest':
          return a.price - b.price;
        default:
          return b.year - a.year;
      }
    });
  }, [productOfCategory, sort]);

  const numberOfPages = perPage
    ? Math.ceil(sortedPhones.length / Number(perPage))
    : 1;
  const currentPage = Number(page);

  let phonesOnPage: Product[] = [];

  if (!perPage || perPage === 'all') {
    phonesOnPage = sortedPhones;
  } else {
    const start = Number(perPage) * (currentPage - 1);
    const end = start + Number(perPage);

    phonesOnPage = sortedPhones.slice(start, end);
  }

  if (isLoading) {
    return (
      <div className="product-list__content">
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="product-list__content">
        <div className="product-list__message">
          <p className="text-h3">Something went wrong</p>
          <button
            type="button"
            className="button product-list__reload-button text-button"
            onClick={() => setReloadKey(key => key + 1)}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (productOfCategory.length === 0) {
    return (
      <div className="product-list__content">
        <div className="product-list__message">
          <p className="text-h3">There are no {category} yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list__content">
      <div className="product-list__header">
        <div className="product-list__select-sort-by">
          <p className="text-small secondary">Sort by</p>
          <SelectSortBy />
        </div>

        <div className="product-list__select-items-on-page">
          <p className="text-small secondary">Items on page</p>
          <SelectPerPage />
        </div>
      </div>

      <div className="product-list__main">
        {phonesOnPage.map(phone => (
          <ProductCard
            key={phone.id}
            currentProduct={phone}
            discount={true}
            setCart={setCart}
            setFavorite={setFavorite}
          />
        ))}
      </div>

      {numberOfPages > 1 && <ButtonPrevNext numberOfPages={numberOfPages} />}
    </div>
  );
};
