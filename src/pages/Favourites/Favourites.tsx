import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../store';
import './Favourites.scss';
import { TypeCard } from '../../types/TypeCard';

export const Favourites = () => {
  // const urlParams = new URLSearchParams(window.location.search);
  // const queryValue: string = urlParams.get('query') || '';
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('query') || '';

  // const phones = useAppSelector(
  //   (state) => state.phones.items,
  // );

  const { favouritesPhones } = useAppSelector(
    (state) => state.favouritesPhones,
  );

  const [fav, setFav] = useState<TypeCard[]>(
    JSON.parse(localStorage.getItem('favourites') || ''),
  );

  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem('favourites') || ''));
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

      <ul className="Cards__list">
        {favourites.map(phone => (
          <li className="Cards__item" key={phone.name}>
            <ProductCard card={phone} />
          </li>
        ))}
      </ul>

      {/* <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      /> */}
    </div>
  );
};
