import { Link } from 'react-router-dom';
import './NotFoundPage.scss';
import { Icon } from '../../components/Icon';
import { IconType } from '../../types/IconTypes';

export const NotFoundPage = () => (
  <section className="not-found-page">
    <div className="not-found-page__container">
      <img
        src="./img/content-images/oops.svg"
        alt="oops!"
        className="not-found-page__oops"
      />

      <p className="not-found-page__text">You are lost</p>
    </div>

    <img
      src="./img/content-images/space.svg"
      alt="space"
      className="not-found-page__illustration"
    />

    <Link to="/" className="not-found-page__link">
      <Icon iconType={IconType.windingArrowLeft} />

      <p className="not-found-page__go-home">Go home</p>
    </Link>
  </section>
);
