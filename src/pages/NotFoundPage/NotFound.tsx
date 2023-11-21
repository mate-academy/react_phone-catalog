import { Link } from 'react-router-dom';
import './NotFound.scss';

export const NotFound = () => {
  return (
    <>
      <div className="error">
        <h1 className="error__404">404</h1>

        <h1>Oops, page not found!</h1>

        <p className="error__subtitle">
          Sorry, but the requested page is not found. Recheck the address!
          <br />
        </p>

        <p className="error__desc">
          Maybe you want to go back to
          <Link to="/home" className="error__link"> Home page </Link>
          ?
        </p>
      </div>
    </>
  );
};
