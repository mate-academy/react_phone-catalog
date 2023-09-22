import { Link } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';

import './accessories.scss';
import '../../style/main.scss';

export const AccessoriesPage = () => {
  return (
    <>
      <Navigation />
      <main>

        <div className="accessories">
          <div className="breadcrumbs">
            <Link
              to="/"
              className="breadcrumbs__button breadcrumbs__icon"
            />
            <div className="breadcrumbs__arrow breadcrumbs__icon" />
            <p>
              Accessories
            </p>
          </div>
          <div className="title">
            <h1>Accessories</h1>

            <p className="title__p">{`${0} items`}</p>
          </div>

          <div className="accessories__description">
            <h1 className="accessories__description--h1">Oops!</h1>

            <p className="accessories__description--title">
              Apologies for the inconvenience, but accessories
              <br />
              are not available yet! We appreciate your
              <br />
              understanding. Maybe you want to go back to
              <br />
            </p>

            <Link to="/" className="accessories__description--home">
              Home page
            </Link>
          </div>
        </div>

      </main>
    </>

  );
};
