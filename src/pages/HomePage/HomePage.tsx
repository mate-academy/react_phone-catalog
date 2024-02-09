import { useContext } from 'react';
import './HomePage.scss';
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { GlobalContext } from '../../GlobalContext';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const { productsList, isLoading } = useContext(GlobalContext);

  const hotProducts = [...productsList]
    .filter(p => p.fullPrice >= p.price)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));

  const newProducts = [...productsList]
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className="HomePage">
        <Banner />

        <div className="hot-prices">
          <ProductsSlider
            products={hotProducts}
            title="Hot prices"
          />
        </div>

        <div className="ShopByCategories">
          <ShopByCategory />
        </div>

        <div className="BrandNewModels">
          <ProductsSlider
            products={newProducts}
            title="Brand new models"
          />
        </div>
      </div>
    )
  );
};
