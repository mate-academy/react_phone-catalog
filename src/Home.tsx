import { PhotosSlider } from './PhotosSlider';
import { ProductsSlider } from './ProductsSlider';
import { ShopBy } from './ShopBy';

type Props = {
  pathname: string,
};

export const Home: React.FC<Props> = ({ pathname }) => (
  <div className="home">
    <>
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
    </>
  </div>
);
