import { useEffect, useState } from 'react';
import productsData from '/public/api/products.json';
import './PhonesPage.scss';
import { SortSection } from '../SortSection/SortSection';
import { CardHP } from '../CardHP/CardHP';
import { useNavigate, useSearchParams } from 'react-router-dom';

type PhonesPageProps = {
  favourites: string[];
  addToFav: (product: any) => void;
};

export const PhonesPage: React.FC<PhonesPageProps> = ({
                                                        favourites,
                                                        addToFav,
                                                      }) => {
  type sortType = 'alpha' | 'cheap' | 'newest';

  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read state from URL search params, providing fallbacks
  const sortBy = (searchParams.get('sortBy') as sortType) || 'newest';
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 16;
  const currentPage = Number(searchParams.get('page')) || 1;

  const [phones, setPhones] = useState<(typeof productsData)[0][]>([]);
  const totalPages = Math.ceil(phones.length / itemsPerPage);

  useEffect(() => {
    const onlyPhones = productsData.filter(
      product => product.category === 'phones',
    );
    setPhones(onlyPhones);
  }, []);

  // 2. Helper function to update the URL parameters
  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);

    // Reset to page 1 if sorting or items per page change
    if (key !== 'page') {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

  const navigateTo = (productId: string) => {
    navigator(productId, { relative: 'path' });
  };

  const sortedPhones = [...phones]
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

  return (
    <div className="phones-page">
      <SortSection
        total={phones.length}
        sortBy={sortBy}
        itemsPerPage={itemsPerPage}
        onSortChange={(value) => updateSearchParam('sortBy', value)}
        onItemsChange={(value) => updateSearchParam('itemsPerPage', value.toString())}
      />

      <div className="phones-page__list">
        {sortedPhones.map(phone => (
          <CardHP
            onClick={() => navigateTo(`/phones/${phone.itemId}`)}
            key={phone.id}
            product={phone}
            favourites={favourites}
            addToFav={addToFav}
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
