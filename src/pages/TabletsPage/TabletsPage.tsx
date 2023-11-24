import {
  Link, Outlet, useParams, useSearchParams,
} from 'react-router-dom';
import useDebounce from '../../helpers/fuctions/useDebonce';

export const TabletsPage = () => {
  const { selectedProductId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const appliedQury = useDebounce(query, 500);

  return (
    <section className="App__phones-page phones-page">
      <div className="phones-page__container _container">
        {appliedQury === '' && (
          <div className="page-navigation">
            <Link to="/" className="page-navigation__home-link" />
            <Link
              to="/tablets"
              className="page-navigation__current-page-link"
              style={{
                pointerEvents: `${selectedProductId === '' ? 'none' : 'initial'}`,
              }}
            >
              Tablets
            </Link>

            {selectedProductId !== '' && (
              <Link
                to="/tablets"
                className="page-navigation__current-page-link"
                style={{
                  pointerEvents: 'none',
                }}
              >
                {selectedProductId}
              </Link>
            )}
          </div>
        )}

        <Outlet />
      </div>
    </section>
  );
};
