import {
  useContext, memo, useMemo, useEffect,
} from 'react';
import { Categories } from './Categories';
import { CustomSlider } from './CustomSlider';
import { Loader } from './Loader';
import { ProductsContext } from './ProductsContext';
import { ProductSlider } from './ProductSlider';

const hotPricesSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

const brandNewSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  swipeToSlide: true,
  nextArrow: false,
  prevArrow: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

export const Home = memo(() => {
  const { products, isLoading } = useContext(ProductsContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const getHotPriceProducts = () => {
    return [...products].filter(product => product.discount !== 0);
  };

  const getHotBrandNewProducts = () => {
    return [...products].filter(product => product.age > 10);
  };

  const hotPriceProducts = useMemo(getHotPriceProducts, [products]);

  const brandNewProducts = useMemo(getHotBrandNewProducts, [products]);

  return (
    <section className="app__section">
      {isLoading
        ? <Loader />
        : (
          <>
            <ProductSlider
              products={products.slice(0, 5)}
            />

            <CustomSlider
              products={hotPriceProducts}
              settings={hotPricesSettings}
              title="Hot Prices"
            />

            <Categories />

            <CustomSlider
              products={brandNewProducts}
              settings={brandNewSettings}
              title="Brand New Models"
            />
          </>
        )}
    </section>
  );
});
