import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../styles/common.scss';

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <h2 className="page-not-found-title">Page not found</h2>
      <img src="/img/page-not-found.png" alt="" />
      <Footer />
    </>
  );
};
