import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { BannerSlider } from '../../components/BannerSlider';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Slider } from '../../types/Slider';
import { scrollToTop } from '../../utils/scrollToTop';

export const HomePage = () => {
  const { loaded } = useAppSelector(state => state.products);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <BannerSlider />

          <ProductsSlider type={Slider.HOTPRICES} />

          <ShopByCategory />

          <ProductsSlider type={Slider.BRANDNEW} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
