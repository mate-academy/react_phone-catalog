import { Link } from 'react-router-dom';
import './PageComingSoon.scss';
import { ButtonMain } from '../../components/ButtonMain';
import { pageComingSoonImage } from '../../helpers/constants';

export const PageCommingSoon = () => {
  return (
    <div className="page-coming-soon">
      <h1 className="page-coming-soon__title title">
        Products are
      </h1>
      <img
        src={pageComingSoonImage}
        alt=""
        className="page-coming-soon__image"
      />

      <Link to="/" className="page-coming-soon__link">
        <ButtonMain text="Back to Home" />
      </Link>
    </div>
  );
};
