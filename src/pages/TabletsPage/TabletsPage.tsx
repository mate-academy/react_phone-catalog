import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';

export const TabletsPage = () => {
  return (
    <section className="cart-page">
      <header className="phones-page__header">
        <div className="phones-page__breadcrumb">
          <BreadCrumbs />
        </div>

        <h1 className="phones-page__title">Tablets</h1>

        <p className="phones-page__counter">{`${0} models`}</p>
      </header>
      <main>
        <h2>Oops!</h2>
        <p>There are currently no products on this page.</p>
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
