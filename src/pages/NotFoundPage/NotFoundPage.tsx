import { Link } from 'react-router-dom';
import { arrowLeftImg, homeImg } from '../../utils/indes';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="notFoundPage__contant">
        <div className="notFoundPage__link">
          <Link to="/">
            <img src={homeImg} alt="Home" />
          </Link>
          <img src={arrowLeftImg} alt="ArrowRight" />
        </div>

        <div className="notFoundPage__description">
          <h1 className="notFoundPage__description-title">
            Oops, page not found
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
