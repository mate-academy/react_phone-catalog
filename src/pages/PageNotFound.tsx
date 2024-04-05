import { Link } from 'react-router-dom';
import '../style/not-found.scss';

export const PageNotFound = () => {
  return (
    <div>
      <div className="brandcrumbs not-found ">
        <h2 className="title not-found__tite">Page is not found</h2>
        <Link to="/" className="not-found__link">
          <p className="not-found__text">Go to home page</p>
          <img src="icons/Home.svg" alt="home" className="not-found__home" />
        </Link>
      </div>
    </div>
  );
};
