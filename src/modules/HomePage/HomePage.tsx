import { Footer } from '../shared/components/Footer/Footer';
import { Header } from '../shared/components/Header';
import { ProductSection } from '../shared/components/ProductSection';
import { Banner } from './components/Banner/Banner';
import { CategorySection } from './components/Category';
import './../../styles/global.scss';
import './../../styles/global.scss';

export const HomePage = () => {
  return (
    <div className="page">
      <Header />
      <main className="main">
        <div className="container">
          <Banner />
          <ProductSection title={'Brand new models'} type={'new'} />
          <CategorySection />
          <ProductSection title={'Hot models'} type={'hot'} />
        </div>
      </main>
      <Footer />
    </div>
  );
};
