import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { HomeIcon } from '../HomeIcon/HomeIcon';
import { ProductCard } from '../ProductCard/ProductCard';
import { Search } from '../Search/Search';
import './Favourites.scss';

export const Favourites = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery]
  = useState(searchParams.get('query') || '');
  const favouritesPhones
    = useAppSelector(state => state.favourites.favouritesPhones);

  return (
    <section>
      <Search
        query={query}
        setQuery={setQuery}
      />

      <HomeIcon title="Favourites" />

      <h1>Favourites</h1>
      <p>
        {`${favouritesPhones.length} items `}
      </p>

      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>

      { favouritesPhones.length === 0 && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
        className="phones__list"
      >
        {favouritesPhones.map((phone) => (
          <li
            className="phones__item"
            data-cy="item"
            key={phone.id}
          >
            <ProductCard phone={phone} />
          </li>
        ))}
      </ul>
    </section>
  );
};
