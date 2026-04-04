import './Basket.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BasketMain from '../../components/BasketMain/BasketMain';

const Basket = () => {
  return (
    <div className="basket">
      <Header />
      <BasketMain />
      <Footer />
    </div>
  );
};

export default Basket;
