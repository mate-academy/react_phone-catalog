import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="notFoundPage">
          <h2 className="notFoundPage__title">Ooops!</h2>

          <p
            className="notFoundPage__message"
          >
            Page not found
          </p>

          <Link
            className="notFoundPage__button"
            to="/"
          >
            Back to home page
          </Link>
        </div>

      </div>
      <Footer />
    </>
  );
};
