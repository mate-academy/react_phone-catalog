import { Link } from 'react-router-dom';
import './ProductNotFound.scss';

export const ProductNotFound = () => {
  return (
    <main className="page-not-found__main">
      <div className="page-not-found__content">
        <div className="page-not-found__img--wrapper">
          <img
            className="page-not-found__img"
            src="img/page-not-found.png"
            alt=""
          />
        </div>
        <div className="page-not-found__title">
          ProductNotFound
          <Link to={'/'} className="page-not-found__home-link">
            <div className="page-not-found__home">Home</div>
          </Link>
        </div>
      </div>
    </main>
  );
};
