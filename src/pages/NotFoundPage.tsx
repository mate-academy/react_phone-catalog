import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs';

export const NotFoundPage = () => {
  return (
    <section className="cart-page">
      <header className="phones-page__header">
        <div className="phones-page__breadcrumb">
          <BreadCrumbs />
        </div>
      </header>

      <main>
        <h2>Oops!</h2>
        <p>Page not found...</p>
        <p>
          Please consider returning to the
          {' '}
          <Link to="/" style={{ color: 'black' }}>homepage</Link>
          {' '}
          for more options.
        </p>
      </main>
    </section>
  );
};
