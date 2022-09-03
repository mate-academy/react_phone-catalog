import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
