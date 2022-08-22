import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';
// import { Product } from '../../react-app-env';
import './HomePage.scss';

// export interface Props {
//   currentFavor: Product[],
//   setCurrentFavor: (arg: Product[]) => void
// }

export const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
