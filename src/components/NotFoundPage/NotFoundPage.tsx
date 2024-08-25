import { LOCAL_URL } from '../../api/apiProducts';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <div className="container">
    <div className="not-found">
      <h1 className="not-found__title">Page Not Found</h1>

      <img
        src={`${LOCAL_URL}/img/product-not-found.png`}
        alt="Page Not Found"
        className="not-found__image"
      />
    </div>
  </div>
);
