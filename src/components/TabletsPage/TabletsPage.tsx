import React, { useEffect, useState } from 'react';
import productsData from '/public/api/products.json';
import './TabletsPage.scss';
import { SortSection } from '../SortSection/SortSection';
import { CardHP } from '../CardHP/CardHP';
import { useNavigate, useSearchParams } from 'react-router-dom';

type TabletsPageProps = {
  favourites: string[];
  addToFav: (product: any) => void;
};

export const TabletsPage: React.FC<TabletsPageProps> = ({
                                                          favourites,
                                                          addToFav,
                                                        }) => {
  type sortType = 'alpha' | 'cheap' | 'newest';

  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sortBy') as sortType) || 'newest';
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 16;
  const currentPage = Number(searchParams.get('page')) || 1;

  const [tablets, setTablets] = useState<(typeof productsData)[0][]>([]);

  useEffect(() => {
    const tabletsOnly = productsData.filter(
      product => product.category === 'tablets',
    );
    setTablets(tabletsOnly);
  }, []);

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);

    if (key !== 'page') {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

  const navigateTo = (productId: string) => {
    navigator(productId, { relative: 'path' });
  };

  const sortedTablets = [...tablets]
    .sort((a, b) => {
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
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(tablets.length / itemsPerPage);

  return (
    <div className="tablets-page">
      <SortSection
        total={tablets.length}
        sortBy={sortBy}
        itemsPerPage={itemsPerPage}
        onSortChange={(value) => updateSearchParam('sortBy', value)}
        onItemsChange={(value) => updateSearchParam('itemsPerPage', value.toString())}
      />
      <div className="tablets-page__list">
        {sortedTablets.map(tablet => (
          <CardHP
            onClick={() => navigateTo(`/tablets/${tablet.itemId}`)}
            favourites={favourites}
            addToFav={addToFav}
            product={tablet}
            key={tablet.id}
          />
        ))}
      </div>
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
    </div>
  );
};
