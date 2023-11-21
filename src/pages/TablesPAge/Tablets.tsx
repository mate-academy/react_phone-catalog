import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { Navigation } from '../../components/Navigation/Navigation';
import './Tablets.scss';

type Props = {
  isLoading: boolean;
};

export const TabletsPage: React.FC<Props> = ({ isLoading }) => {
  return (
    <>
      <Navigation />
      <main>
        {isLoading && <Loader />}

        {!isLoading && (
          <section className="tablets">
            <div className="breadcrumbs">
              <Link
                to="/"
                className="breadcrumbs__button breadcrumbs__icon"
              />
              <div className="breadcrumbs__arrow breadcrumbs__icon" />
              <p>Tablets</p>
            </div>
            <div className="title">
              <h1>Tablets</h1>

              <p className="title__p">{`${0} items`}</p>
            </div>

            <div className="tablets__description">
              <h1 className="tablets__description--h1">Oops!</h1>
              <p className="tablets__description--title">
                Not Tablets!!!
              </p>

              <Link
                to="/"
                className="tablets__description--home"
              >
                Home page
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
};
