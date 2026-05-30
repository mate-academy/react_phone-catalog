import React, { useEffect, useState } from 'react';
import productsData from '/public/api/products.json';
import './AccessoriesPage.scss';
import { SortSection } from '../SortSection/SortSection';
import { CardHP } from '../CardHP/CardHP';
import { useNavigate, useSearchParams } from 'react-router-dom';

type AccessoriesPageProps = {
  favourites: string[];
  addToFav: (product: any) => void;
};

export const AccessoriesPage: React.FC<AccessoriesPageProps> = ({
                                                                  favourites,
                                                                  addToFav,
                                                                }) => {
  type sortType = 'alpha' | 'cheap' | 'newest';

  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sortBy') as sortType) || 'newest';
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 16;
  const currentPage = Number(searchParams.get('page')) || 1;

  const [accessories, setAccessories] = useState<any[]>([]);

  useEffect(() => {
    const accessoriesOnly = productsData.filter(
      product => product.category === 'accessories',
    );
    setAccessories(accessoriesOnly);
  }, []);

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);

    if (key !== 'page') {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

  const sorted = [...accessories].sort((a, b) => {
    switch (sortBy) {
      case 'cheap':
        return a.price - b.price;
      case 'alpha':
        return a.name.localeCompare(b.name);
      case 'newest':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const sortedAccessories = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(accessories.length / itemsPerPage);

  const navigateTo = (productId: string) => {
    navigator(`/accessories/${productId}`);
  };

  return (
    <div className="accessories-page">
      <SortSection
        total={accessories.length}
        sortBy={sortBy}
        itemsPerPage={itemsPerPage}
        onSortChange={(value) => updateSearchParam('sortBy', value)}
        onItemsChange={(value) => updateSearchParam('itemsPerPage', value.toString())}
      />

      <div className="accessories-page__list">
        {sortedAccessories.map(accessor => (
          <CardHP
            onClick={() => navigateTo(accessor.itemId)}
            favourites={favourites}
            addToFav={addToFav}
            product={accessor}
            key={accessor.id}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="phones-page__pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={
                page === currentPage
                  ? 'phones-page__pagination__active'
                  : 'phones-page__pagination__default'
              }
              onClick={() => updateSearchParam('page', page.toString())}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
