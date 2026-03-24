import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import '../homePage/Home.scss';

const Home: React.FC = () => {
  return (
    <>
      <div className="home">
        <Header />
        <Main />
        <Footer />{' '}
      </div>
    </>
  );
};

export default Home;


