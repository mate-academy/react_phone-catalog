import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './Checkout.scss';

export const Checkout: React.FC = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="checkout">
          <h2 className="checkout__title">Ooops!</h2>

          <p
            className="checkout__message"
          >
            We are sorry, but this feature is not implemented yet!
          </p>

          <Link
            className="checkout__button"
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
