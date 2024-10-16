import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import './PagesNotFound.scss';

export const PagesNotFound = () => {
  return (
    <>
      <Navigation />
      <h1 className="pagesnotfound__empty-card--title">Page not found :)</h1>
      <div className="pagesnotfound__empty-card--image"></div>
      <Footer />
    </>
  );
};
