import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { HotPrices } from '../HotPrices/HotPrices';
import { BrandNew } from '../BrandNew/BrandNew';
import { Slider } from '../Slider/Slider';

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />

      <div className="container">
        <>
          <Slider />
          <HotPrices />
          <ShopByCategory />
          <BrandNew />
        </>
      </div>

      <Footer />
    </>
  );
};
