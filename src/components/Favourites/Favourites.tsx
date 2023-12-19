import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { HomeIcon } from '../HomeIcon/HomeIcon';
import { ProductCard } from '../ProductCard/ProductCard';
import { Search } from '../Search/Search';
import './Favourites.scss';

export const Favourites = () => {
  const [searchParams] = useSearchParams();
  const query
  = searchParams.get('query') || '';
  const favouritesPhones
    = useAppSelector(state => state.favourites.favouritesPhones);

  const searchInPhones = favouritesPhones
    .filter((product) => product.name
      .toLowerCase()
      .includes(query.trim()
        .toLowerCase()));

  return (
    <main>
      <section>
        <div className="container">
          <HomeIcon title="Favourites" />

          {searchInPhones.length > 0 && (
            <>
              <h1>Favourites</h1>
              <p>
                {`${favouritesPhones.length} items `}
              </p>
              <div className="favourites__search">
                <Search />
              </div>
            </>
          )}

          { searchInPhones.length === 0 && !query && (
            <h2>
              The favourites is empty
            </h2>
          )}

          { searchInPhones.length === 0 && query && (
            <>
              <div className="favourites__search">
                <Search />
              </div>
              <h3>
                There are not models in favourites
                <br />
                whith name includse
                {` '${query}'`}
              </h3>
            </>
          )}

          <ul
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
    </main>
  );
};
