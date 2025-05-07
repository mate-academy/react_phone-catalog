import NewBrand from '../../Functional/HomeSwiperPhone/NewBrand';
import ShopByCategory from '../../Functional/ByCategory/ShopByCategory';
import HotPrices from '../../Functional/HomeSwiperPhone/HotPrices';
import ImageSlider from '../../Functional/ImageSlider/ImageSlider';
import './Main.scss';

export const Main = () => {
  return (
    <main>
      <div className="main">
        <h2 className="main__title">Welcome to Nice Gadgets store!</h2>
      </div>
      <ImageSlider />
      <NewBrand />
      <ShopByCategory />
      <HotPrices />
    </main>
  );
};
