import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="container">
    <p className="text">Page not found</p>

    <Link className="link" to="/">
      Go to HomePage
    </Link>
  </div>
);
