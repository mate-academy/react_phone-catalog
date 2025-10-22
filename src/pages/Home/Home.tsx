import Category from '../../components/Category';
import ProductCarousel from '../../components/ProductCarousel';
import HeroBanner from '../../components/Slider/HeroBanner';
import './Home.scss';

const Home = () => {
  return (
    <>
      <section className="section__hero">
        <HeroBanner />
      </section>
      
      <ProductCarousel title="Brand new models" showDiscount={false} isNewModels={true} />

      <Category />
      <div className="hot-prices">
        <ProductCarousel title="Hot prices" showDiscount={true} isHotPrices={true} />
      </div>
    </>
  );
};

export default Home;
