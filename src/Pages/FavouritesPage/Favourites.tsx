import { Link } from 'react-router-dom';
import { Loader, ProductCard } from '../../Components';
import { Navigation } from '../../Components/Navigation/Navigation';

import './favourites.scss';
import { Phone } from '../../Type/Phone';

type Props = {
  isLoading: boolean;
  favouritesPhones: Phone[];
};

export const FavouritesPage: React.FC<Props> = ({
  isLoading,
  favouritesPhones,
}) => {
  const isShowerSearch = true;
  const nameSearch = 'favourites';

  const testPhones = favouritesPhones.slice(12, 19);

  return (
    <>
      <Navigation isShower={isShowerSearch} nameSearch={nameSearch} />

      {isLoading && <Loader />}

      {!isLoading && (
        <main className="favourites">
          <section>
            <div className="breadcrumbs">
              <Link
                to="/"
                className="breadcrumbs__button breadcrumbs__icon"
              />
              <div className="breadcrumbs__arrow breadcrumbs__icon" />
              <p>
                Favourites
              </p>
            </div>
            <div className="title">
              <h1>Favourites</h1>

              <p className="title__p">{`${testPhones.length} models`}</p>
            </div>
          </section>

          <section className="container--list phones__list">
            {testPhones.map(phone => (
              <ProductCard phone={phone} key={phone.id} />
            ))}
          </section>
        </main>
      )}
    </>
  );
};
