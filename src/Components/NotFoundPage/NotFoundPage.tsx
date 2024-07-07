import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <>
      <div className="not-foundPage"></div>
      <Link to={'/'} className="page-not-found">
        Page not Found
      </Link>
    </>
  );
};
