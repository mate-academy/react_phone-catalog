import { BASE_URL } from '../../helpers/constants';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <section className="not-found-page">
    <h1 className="not-found-page__title">Page not found</h1>

    <img
      src={`${BASE_URL}/img/page-not-found.png`}
      alt="products were not found"
      className="not-found-page__image"
    />
  </section>
);
