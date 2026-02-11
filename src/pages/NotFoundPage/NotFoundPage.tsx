import './NotFoundPage.scss';
import notFoundImg from '../../assets/page-not-found.png';
import { ButtonBack } from '../../components/ButtonBack';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="container">
        <ButtonBack />
        <div className="not-found__content">
          <div className="not-found__image">
            <img src={notFoundImg} alt="not-found-image" />
          </div>
          <span className="not-found__title">
            Page not found
          </span>
        </div>
      </div>
    </div>
  );
}
