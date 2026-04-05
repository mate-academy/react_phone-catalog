import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import { Product } from '../../types/Product';
import '../homePage/Home.scss';

type HomeProps = {
  favorites: Product[];
};

const Home = ({ favorites }: HomeProps) => {
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
