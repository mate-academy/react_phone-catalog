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

  const searchInPhones = favouritesPhones
    .filter((product) => product.name
      .toLowerCase()
      .includes(query.trim()
        .toLowerCase()));

  return (
    <section>
      <div className="container">
        <HomeIcon title="Favourites" />

        {searchInPhones.length > 0 && (
          <>
            <h1>Favourites</h1>
            <p>
              {`${favouritesPhones.length} items `}
            </p>
            <Search
              query={query}
              setQuery={setQuery}
            />
          </>
        )}

        { searchInPhones.length === 0 && (
          <h2>
            The favourites is empty
          </h2>
        )}

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
          className="phones__list"
        >
          {searchInPhones.map((phone) => (
            <li
              className="phones__item"
              data-cy="item"
              key={phone.id}
            >
              <ProductCard phone={phone} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
