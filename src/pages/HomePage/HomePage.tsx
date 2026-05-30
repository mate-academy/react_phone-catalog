import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useGlobalContext } from '../../context/GlobalContext';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const { hotPrices, brandNew, loading, error } = useGlobalContext();

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div>
      <div className="container">
        <h1 style={{ display: 'none' }}>Product Catalog</h1>
        <h2 className="homepage__title">Welcome to Nice Gadgets store!</h2>

        <BannerSlider />

        <section className="homepage__sections">
          <ProductsSlider
            title="Brand new models"
            products={brandNew}
            displayType="fullPrice"
          />
        </section>

        <ShopByCategory />

        <ProductsSlider
          title="Hot prices"
          products={hotPrices}
          displayType="with-discount"
        />
      </div>
    </div>
  );
};
