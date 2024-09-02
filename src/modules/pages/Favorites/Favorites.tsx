import { useContext, useEffect } from 'react';
import './Favorites.scss';
import { Card } from '../Home/components/NewPhones/components';
import { ProductsContext } from '../../../PageContext';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const { favItems } = useContext(ProductsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="favorites-layout">
      <div className="fav-link">
        <Link to="/" className="favIcon">
          <img src="./uploadedImg/home.svg"></img>
        </Link>
        <a className="favIcon">
          <img src="./uploadedImg/right.svg"></img>
        </a>
        <p className="fav-link-p">Favorites</p>
      </div>
      <h1 className="favorites-h1">Favourites</h1>
      <p className="favorites-p">{`${favItems.length} items`}</p>
      <div className="card-container-block">
        {favItems.length > 0 ? (
          favItems.map(favItem => <Card phone={favItem} key={favItem.id} />)
        ) : (
          <div className="fav-is-empty">Your Favorites is empty</div>
        )}
      </div>
    </div>
  );
};
