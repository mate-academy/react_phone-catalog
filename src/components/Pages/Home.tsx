import BrandNewSection from 'components/BrandNew/BrandNew';
import Category from 'components/Category/Category';
import Header from 'components/Header/Header';
import HotPrice from 'components/HotPrice/HotPrice';
import '@/App.scss';

const Home = () => {
  return (
    <>
      <Header />
      <BrandNewSection />
      <Category />
      <HotPrice />
      <h1 className="not-shown">Product Catalog</h1>
    </>
  );
};

export default Home;
