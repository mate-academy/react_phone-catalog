/* eslint-disable no-constant-condition */
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { typographyStyle } from '../CustomStyles/Typography';
import { appContext } from '../Contexts/AppContext';
import { ProductCard } from '../components/ProductCard';

export const Favourites = () => {
  const { favorites } = useContext(appContext);

  return (
    <>
      <hr className="col-span-full mb-6 border-0" />

      <div
        className={`col-span-full flex h-4 items-center gap-x-2 text-Secondary ${typographyStyle.smallText}`}
      >
        <Link to="/">
          <img src="./Icons/Home.svg" alt="home" />
        </Link>

        <img src="./Icons/Chevron (Arrow Right).svg" alt="home" />

        <Link className="capitalize" to="/favourites">
          favourites
        </Link>
      </div>

      <hr className="col-span-full mb-10 border-0" />

      <h1 className={`col-span-full capitalize ${typographyStyle.h1}`}>
        favourites
      </h1>

      <p className={`col-span-full text-Secondary ${typographyStyle.bodyText}`}>
        {`${favorites.length} ${favorites.length === 1 ? 'model' : 'models'}`}
      </p>

      <hr className="col-span-full mb-6 border-0" />

      {!favorites.length ? (
        <div className="col-span-full">
          Products you chose as favourites will appear here
        </div>
      ) : (
        <div className="col-span-full grid grid-cols-4 gap-4">
          {favorites
            .sort((a, b) => b.year - a.year)
            .slice(0, 5)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};
