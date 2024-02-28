import { Link } from 'react-router-dom';
import './PageNotFound.scss';
import { ButtonMain } from '../../components/ButtonMain';
import { pageNotFoundImage } from '../../helpers/constants';

export const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title title">Page not found</h1>

      <img
        src={pageNotFoundImage}
        alt=""
        className="page-not-found__image"
      />

      <Link to="/" className="page-not-found__link">
        <ButtonMain text="Go back Home" />
      </Link>
    </div>
  );
};
