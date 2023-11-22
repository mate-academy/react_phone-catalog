import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="Parentcontainer">
      <div className="notfound">
        <Link to="/" className="notfound_backlink">
          <p className="notfound_backlink_arrow" />
          <p className="notfound_backlink_title">Back</p>
        </Link>
        <h1 className="notfound_title">
          Sorry! Page not found. Try again Later.
        </h1>
      </div>
    </div>
  );
};
