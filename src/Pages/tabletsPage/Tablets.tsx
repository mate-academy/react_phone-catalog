import './Tablets.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TabletsCatalog from '../../components/CatalogTablets/TabletsCatalog';

const Tablets: React.FC = () => {
  return (
    <>
      <Header />
      <TabletsCatalog />
      <Footer />
    </>
  );
};

export default Tablets;
