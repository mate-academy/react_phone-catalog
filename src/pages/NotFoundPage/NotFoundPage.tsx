import { Link } from 'react-router-dom';
import './NotFoundPage.scss';
import { ButtonMain } from '../../components/ButtonMain';
import { notFoundPageIcon } from '../../helpers/constants';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page_title title">Page not found</h1>

      <img src={notFoundPageIcon} alt="" className="not-found-page__icon" />

      <Link to="/" className="not-found-page__link">
        <ButtonMain text="Go back Home" />
      </Link>
    </div>
  );
};
