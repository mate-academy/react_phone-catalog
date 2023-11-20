import { Footer } from './Footer';
import { Header } from './Header';
import '../styles/pageNotFound.scss';

export const PageNotFound:React.FC = () => {
  return (
    <>
      <Header />
      <main className="pageNotFound">
        Page not found...
      </main>
      <Footer />
    </>
  );
};
