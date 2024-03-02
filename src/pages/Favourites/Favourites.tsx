import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../store';
import './Favourites.scss';
import { TypeCard } from '../../types/TypeCard';

export const Favourites = () => {
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('query') || '';

  const favouritesPhones = useAppSelector(
    (state) => state.favouritesPhones.favouritesPhones,
  );

  const [fav, setFav] = useState<TypeCard[]>(
    favouritesPhones,
  );

  useEffect(() => {
    setFav(favouritesPhones);
  }, [favouritesPhones]);

  const favourites = fav.filter(phone => phone.name
    .toLocaleLowerCase().trim().includes(queryValue
      .toLocaleLowerCase().trim()));

  return (
    <div className="Favourites">
      <div className="top-link" data-cy="breadCrumbs">
        <Link to="/">
          <img
            src="img/Home.png"
            alt="Home"
            className="top-link__img"
          />
        </Link>

        <img
          src="img/UpperLink.png"
          alt="ArrowRight"
          className="top-link__img"
        />

        <p>Favourites</p>
      </div>

      <h1 className="Favourites__header">Favourites</h1>

      <p>{`${favourites.length} models`}</p>

      {favourites.length ? (
        <ul className="Cards__list">
          {favourites.map(phone => (
            <li className="Cards__item" key={phone.name}>
              <ProductCard card={phone} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="Cards__list">Nothing found</div>
      )}
    </div>
  );
};
