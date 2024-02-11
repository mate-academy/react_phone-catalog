import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductsList } from '../ProductsList';
import { ProductContext } from '../../ProductContext';

export const Favourites = () => {
  const { favourites } = useContext(ProductContext);

  return (
    <section className="favourites">
      <div className="container">
        <div className="details__url" data-cy="breadCrumbs">
          <NavLink
            to="/"
            className="details__url__home"
          >
            <img src="./icon/Home.svg" alt="home" />
          </NavLink>

          <img src="./icon/Right.svg" alt="Right" />

          <p
            className="details__url__phones"
          >
            Favourites
          </p>
        </div>

        <h1 className="favourites__title">
          Favourites
        </h1>

        <p className="favourites__count">
          {`${favourites.length} items`}
        </p>
      </div>

      <ProductsList product={favourites} />
    </section>
  );
};
