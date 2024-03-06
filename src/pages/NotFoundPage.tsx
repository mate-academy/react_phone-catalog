import { NavLink } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <div className="not-found__title-image">
          <img src="img/404.jpg" className="not-found__img" alt="404" />
          <div className="not-found__info">
            <h1 className="not-found__title">Page not found</h1>
            <NavLink to="/" className="not-found__link">Return Home</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
