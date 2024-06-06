import { TypeAnimation } from 'react-type-animation';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { useAppSelector } from '../app/hooks';
import { getCheckQuery } from '../helper';
import { Breadcrumbs } from '../components/Bredcrambs';
import { Favourites } from '../components/Favourites';
import {
  selectFavouritesProduct,
} from '../features/favouritesSlices';

import '../components/Favourites/Favourites.scss';

export const FavouritesPage = () => {
  const favouritesPhones = useAppSelector(selectFavouritesProduct);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavouritesProducts = useMemo(() => {
    return favouritesPhones.filter((phone) => getCheckQuery(phone.name, query));
  }, [query, favouritesPhones]);

  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, left: 0 }), 0);
  }, []);

  return (
    <>
      {query.length > 0 ? (
        <>
          <p
            style={{ marginTop: '24px' }}
            className="favourites__itemLength"
          >
            {`${filteredFavouritesProducts.length} results`}
          </p>
          <Favourites favouritesProducts={filteredFavouritesProducts} />
        </>
      ) : (
        <>
          <Breadcrumbs />
          <h1 className="favourites__title">Favourites</h1>
          <p className="favourites__itemLength">{`${filteredFavouritesProducts.length} items`}</p>

          {!favouritesPhones.length ? (
            <TypeAnimation
              sequence={["You don't have favourites products", 1000]}
              style={{
                fontSize: '3em',
                display: 'flex',
                fontWeight: '700',
                padding: '32px 0',
                color: '#313237',
              }}
            />
          ) : (
            <Favourites favouritesProducts={filteredFavouritesProducts} />
          )}
        </>
      )}
    </>
  );
};
