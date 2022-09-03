import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="notfoundpage">
      <Header />
      <div className="notfoundpage__textbox">
        <h1 className="notfoundpage__text">Page not found</h1>
      </div>

      <Footer />
    </div>
  );
};
