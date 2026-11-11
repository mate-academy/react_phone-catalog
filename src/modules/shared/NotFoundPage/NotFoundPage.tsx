import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="inline-container not-found">
      <img
        src="/img/page-not-found.png"
        alt="404"
        className="not-found--image"
      />
      <h1 className="page-title not-found--title">Page not found</h1>
      <Link to="/home" className="not-found--link">
        Go to Home
      </Link>
    </div>
  );
};
