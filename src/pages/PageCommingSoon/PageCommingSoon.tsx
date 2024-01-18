import { Link } from 'react-router-dom';
import './PageCommingSoon.scss';
import { ButtonMain } from '../../components/ButtonMain';
import { pageCommingSoonImage } from '../../helpers/constants';

export const PageCommingSoon = () => {
  return (
    <div className="page-comming-soon">
      <h1 className="page-comming-soon__title title">
        Products are comming soon
      </h1>
      <img
        src={pageCommingSoonImage}
        alt=""
        className="page-comming-soon__image"
      />

      <Link to="/" className="page-comming-soon__link">
        <ButtonMain text="Back to Home" />
      </Link>
    </div>
  );
};
