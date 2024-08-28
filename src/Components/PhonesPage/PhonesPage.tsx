import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import './PhonesPage.scss';

export const PhonesPage = () => {
  return (
    <>
      <Navigation />
      <div className="phonespage">
        <Link to="/home" className="phonespage__breadcrumbs--link">
          <div className="phonespage__breadcrumbs--image"></div>
        </Link>

        <h1 className="phonespage__header">Mobile phones</h1>
      </div>
      <Footer />
    </>
  );
};
