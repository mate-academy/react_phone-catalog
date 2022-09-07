import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="NotFoundPage">
        <h1 className="title">Page not found</h1>
        <Link to="/" className="link">Home page</Link>
      </div>
    </div>
  );
};
