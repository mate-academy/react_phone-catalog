import { Link } from 'react-router-dom';
import './NotFoundProduct.scss';

export const NotFoundProduct: React.FC = () => {
  return (
    <div className="notFoundProduct">
      <h2 className="notFoundProduct__title">Ooops!</h2>

      <p
        className="notFoundProduct__message"
      >
        Product was not found!
      </p>

      <Link
        className="notFoundProduct__button"
        to="/"
      >
        Back to home page
      </Link>
    </div>
  );
};
