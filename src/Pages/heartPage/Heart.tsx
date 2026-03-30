import CatalogFavorites from '../../components/CatalogFavorites/CatalogFavorites';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Heart.scss';

const Heart = () => {
  return (
    <div className="heart">
      <Header />
      <CatalogFavorites />
      <Footer />
    </div>
  );
};

export default Heart;
