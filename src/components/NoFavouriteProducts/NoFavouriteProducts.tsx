import { Link } from 'react-router-dom';
import './NoFavouriteProducts.scss';

export const NoFavouriteProducts: React.FC = () => {
  return (
    <div className="noFavouriteProducts">
      <h2 className="noFavouriteProducts__title">Ooops!</h2>

      <p
        className="noFavouriteProducts__message"
      >
        You have no favourite products!
      </p>

      <Link
        className="noFavouriteProducts__button"
        to="/"
      >
        Back to home page
      </Link>
    </div>
  );
};
