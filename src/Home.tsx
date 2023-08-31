import { useLocation } from 'react-router-dom';
import { PhotosSlider } from './PhotosSlider';
import { ProductsSlider } from './ProductsSlider';
import { ShopBy } from './ShopBy';

export const Home = () => {
  const { pathname } = useLocation();

  return (
    <div className="home">
      <PhotosSlider />
      <ProductsSlider
        pathname={pathname}
        title="Hot prices"
        dicount
        random={false}
      />
      <ShopBy />
      <ProductsSlider
        pathname={pathname}
        title="Brand new models"
        dicount={false}
        random={false}
      />
    </div>
  );
};
