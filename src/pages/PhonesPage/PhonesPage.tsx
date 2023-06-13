import { Link, Outlet, useParams } from 'react-router-dom';

export const PhonesPage = () => {
  const { selectedProductId = '' } = useParams();

  return (
    <section className="App__phones-page phones-page">
      <div className="phones-page__container _container">
        <div className="page-navigation">
          <Link to="/" className="page-navigation__home-link" />
          <Link
            to="/phones"
            className="page-navigation__current-page-link"
            style={{
              pointerEvents: `${selectedProductId === '' ? 'none' : 'initial'}`,
            }}
          >
            Phones
          </Link>

          {selectedProductId !== '' && (
            <Link
              to="/phones"
              className="page-navigation__current-page-link"
              style={{
                pointerEvents: 'none',
              }}
            >
              {selectedProductId}
            </Link>
          )}
        </div>

        <Outlet />
      </div>
    </section>
  );
};
