import { Link } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import './tablets.scss';

export const TabletsPage: React.FC = () => {
  return (
    <>
      <Navigation />
      <main>

        <div className="tablets">
          <div className="breadcrumbs">
            <Link
              to="/"
              className="breadcrumbs__button breadcrumbs__icon"
            />
            <div className="breadcrumbs__arrow breadcrumbs__icon" />
            <p>
              Tablets
            </p>
          </div>
          <div className="title">
            <h1>Tablets</h1>

            <p className="title__p">{`${0} items`}</p>
          </div>

          <div className="tablets__description">
            <h1 className="tablets__description--h1">Oops!</h1>

            <p className="tablets__description--title">
              Apologies for the inconvenience, but tablets are
              <br />
              not available yet! We appreciate your
              <br />
              understanding. Maybe you want to go back to
              <br />
            </p>

            <Link to="/" className="tablets__description--home">
              Home page
            </Link>
          </div>
        </div>

      </main>
    </>
  );
};
