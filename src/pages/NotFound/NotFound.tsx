import './notFound.scss';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <section className="not-found">

      <h1 className="not-found__title">
        Oops!
      </h1>

      <p className="not-found__message">
        Page Not Found
      </p>

      <p className="not-found__description">
        Something went wrong and the page you&apos;re looking for
        <br />
        cannot be found.
      </p>

      <Link className="not-found__to-home" to="/">
        Home Page
      </Link>
    </section>
  );
};
