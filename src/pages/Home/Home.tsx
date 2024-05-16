import { useEffect, useState } from 'react';
import './Home.scss';
import { Hero } from '../../components/Hero';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { Categories } from '../../components/Categories';
import { useAppContext } from '../../context/context';
import { getHotProducts, getLatestProducts } from '../../utils/utils';

export const Home = () => {
  const { products } = useAppContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let itemWidth = 212;
  let frameSize = 2;
  const gap = 16;
  let step = 2;

  if (screenWidth >= 640 && screenWidth < 1200) {
    itemWidth = 237;
    frameSize = 3;
    step = 3;
  } else if (screenWidth >= 1200) {
    itemWidth = 272;
    frameSize = 4;
    step = 4;
  }

  const sliderSettings = {
    itemWidth,
    frameSize,
    gap,
    step,
  };

  return (
    <>
      <Hero />
      <ProductSlider
        title={'Brand new models'}
        elements={getLatestProducts(products)}
        settings={sliderSettings}
      />
      <Categories />
      <ProductSlider
        title={'Hot prices'}
        isDiscount
        elements={getHotProducts(products)}
        settings={sliderSettings}
      />
    </>
  );
};
