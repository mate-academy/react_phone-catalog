import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="notFoundPage">
    <h2>404: Page Not Found</h2>
    <img
      src="img/page-not-found.png"
      alt="page not found"
      className="notFoundPage__img"
    />
    <Link to={`/home`} className="notFoundPage__box">
      <div className="notFoundPage__img-box" />

      <p className="notFoundPage__back">Go back to home</p>
    </Link>
  </div>
);
