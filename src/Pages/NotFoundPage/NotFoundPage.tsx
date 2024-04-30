import { LOCAL_URL } from '../../api/apiProducts';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <div className="container">
    <div className="not-found-page">
      <h1 className="not-found-page__title">Page Not Found</h1>

      <img
        src={`${LOCAL_URL}/img/page-not-found.png`}
        alt="Page not found"
        className="not-found-page__image"
      />
    </div>
  </div>
);
