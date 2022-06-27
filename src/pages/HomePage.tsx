import Banner from '../components/Banner';
import ShopByCategory from '../components/ShopByCategory';
import ProductSlider from '../components/ProductSlider';
import { Product } from '../types/Product';

type Props = {
  list: Product[];
};

const HomePage: React.FC<Props> = ({ list }) => {
  const hotPrices = list.sort((a, b) => b.discount - a.discount);
  const brandNew = list.filter(item => item.discount === 0)
    .sort((a, b) => b.price - a.price);

  return (
    <div>
      <Banner />
      <ProductSlider list={hotPrices} title="Hot Prices" />
      <ShopByCategory />
      <ProductSlider list={brandNew} title="Brand new models" />
    </div>
  );
};

export default HomePage;
