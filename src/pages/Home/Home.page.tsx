// eslint-disable-next-line max-len
import { useContext } from 'react';
// eslint-disable-next-line max-len
import { ProductSlider } from '../../components/base/ProductSlider/ProductSlider.component';
// eslint-disable-next-line max-len
import { ShopByCategory } from '../../components/ShopByCategories/ShopByCategory.component';
import { Welcome } from '../../components/Welcome/Welcome.component';
import { StatesContext } from '../../store/GlobalStateProvider';

export const HomePage = () => {
  const { products } = useContext(StatesContext);
  const productsSortByYear = [...products].sort((a, b) => b.year - a.year);
  const productsSortByDiscount = [...products].sort(
    (a, b) =>
      ((b.fullPrice - b.price) / 100) * 100 -
      ((a.fullPrice - a.price) / 100) * 100,
  );

  return (
    <div className="home-page">
      <Welcome />
      <ProductSlider
        title={'Brand new models'}
        products={productsSortByYear}
        showDiscount={false}
      />
      <ShopByCategory />
      <ProductSlider
        title={'Hot prices'}
        products={productsSortByDiscount}
        showDiscount={true}
      />
    </div>
  );
};
