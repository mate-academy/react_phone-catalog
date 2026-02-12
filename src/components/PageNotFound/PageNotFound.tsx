import { Link } from 'react-router-dom';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="PageNotFound container">
      <h1>Page Not Found</h1>
      <img src="img/page-not-found.png" alt="Page not found" />
      <Link to="/" className="go-home-button">
        Go back to main page
      </Link>
    </div>
  );
};

export default PageNotFound;
