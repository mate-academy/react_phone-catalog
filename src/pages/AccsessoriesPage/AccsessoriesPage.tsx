import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Navigation/Navigation';

import './Accsessories.scss';
import '../../style/main.scss';
import { Loader } from '../../components/Loader/Loader';

type Props = {
  isLoading: boolean;
};

export const AccessoriesPage: React.FC<Props> = ({ isLoading }) => {
  return (
    <>
      <Navigation />
      <main>

        {isLoading && <Loader />}

        {!isLoading && (
          <section className="accessories">
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
                Not Accessories!!
              </p>

              <Link to="/" className="accessories__description--home">
                Home page
              </Link>
            </div>
          </section>
        )}

      </main>
    </>

  );
};
