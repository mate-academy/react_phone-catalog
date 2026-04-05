import './Basket.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BasketMain from '../../components/BasketMain/BasketMain';
import { Product } from '../../types/Product';

type BasketProps = {
  favorites: Product[];
};

const Basket = ({ favorites }: BasketProps) => {
  return (
    <div className="basket">
      <Header favorites={favorites} />
      <BasketMain />
      <Footer />
    </div>
  );
};

export default Basket;
