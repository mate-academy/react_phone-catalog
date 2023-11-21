import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { Navigation } from '../../components/Navigation/Navigation';

import './Menu.scss';

type Props = {
  isLoading: boolean;
};

export const Menu: React.FC<Props> = ({ isLoading }) => {
  return (
    <>
      <Navigation />
      <main>
        {isLoading && <Loader />}

        {!isLoading && (
          <nav className="menu">
            <Link
              to="/"
              className="menu__link"

            >
              Home
            </Link>

            <Link
              to="/Phones"
              className="menu__link"

            >
              Phones
            </Link>

            <Link
              to="/Tablets"
              className="menu__link"

            >
              Tablets
            </Link>

            <Link
              to="/Accessories"
              className="menu__link"

            >
              Accessories
            </Link>
          </nav>
        )}
      </main>
    </>
  );
};
