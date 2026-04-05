import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import { useLocalStorage } from '../../api';
import { Product } from '../../types/Product';
import '../homePage/Home.scss';

const Home: React.FC = () => {
  const [favorites] = useLocalStorage<Product[]>('favorites', []);

  return (
    <>
      <div className="home">
        <Header favorites={favorites} />
        <Main />
        <Footer />{' '}
      </div>
    </>
  );
};

export default Home;
