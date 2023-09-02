import { useContext, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TitleOfPage } from '../components/TitleOfPage';
import { ProductCard } from '../components/ProductCard';
import '../components/ProductList/ProductList.scss';
import { StoragesContext } from '../Context/StoragesContext';

export const Favorites = () => {
  const { likesStorage } = useContext(StoragesContext);
  const isArrow = useRef(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const currentFavorites = useMemo(() => {
    if (query) {
      return likesStorage.filter(phone => phone.name
        .toLowerCase().includes(query.trim().toLocaleLowerCase()));
    }

    return likesStorage;
  }, [query, likesStorage]);

  return (
    <div className="page__container">
      {!query && <Breadcrumbs />}

      <div className="page__section">
        <TitleOfPage
          title="Favorites"
          phonesLen={currentFavorites.length}
          visiblePhonesLen={currentFavorites.length}
          backArrow={isArrow.current}
        />
      </div>

      <div className="cataloge" data-cy="productList">
        {currentFavorites.map(phone => (
          <ProductCard
            phone={phone}
            key={phone.id}
          />
        ))}
      </div>
    </div>
  );
};
