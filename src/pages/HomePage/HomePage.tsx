import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line
import { FirstScreenSlider } from '../../components/FirstScreenSlider/FirstScreenSlider';
import { BrandNewSlider } from '../../components/BrandNewSlider/BrandNewSlider';
import { CatalogContext } from '../../CatalogContext';
import { useMediaQuery } from 'react-responsive';
import { Product } from '../../types/Product';
import { CategoryCart } from '../../components/CategoryCart/CategoryCart';
// eslint-disable-next-line
import { HotPricesSlider } from '../../components/HotPricesSlider/HotPricesSlider';
// eslint-disable-next-line
import { ProductSliderButtons } from '../../components/ProductSliderButtons/ProductSliderButtons';
import { useUnique } from '../../utils/useUnique';

export const HomePage: React.FC = () => {
  const { productsFromServer, hotPrisModels, brandNewModels } =
    useContext(CatalogContext);
  const [categories, setCategories] = useState<string[]>([]);
  const newModelForShow = [...useUnique(brandNewModels)];
  const hotMOdelForShow = [...useUnique(hotPrisModels)];

  useEffect(() => {
    const scrollPosition = localStorage.getItem('scrollPosition');

    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (productsFromServer) {
      const uniqueCategories = Array.from(
        new Set(
          productsFromServer?.map((product: Product) => product.category),
        ),
      );

      setCategories(uniqueCategories);
    }
  }, [productsFromServer]);

  const isTablet = useMediaQuery({ query: '(min-width: 640px)' });
  const isDesctop = useMediaQuery({ query: '(min-width: 1200px)' });

  const slidesPerView = () => {
    if (isDesctop) {
      return 4;
    }

    if (isTablet) {
      return 2;
    }

    return 1;
  };

  return (
    <>
      <section className="first-screen home__first-screen">
        <div className="container">
          <h1 className="first-screen__title main-title home__main-title">
            Welcome to Nice Gadgets store!
          </h1>
          <FirstScreenSlider />
        </div>
      </section>
      <section className="brand-new">
        <div className="container">
          <div className="brand-new__title-box product__title-box">
            <h2 className="title brand-new__title">Brand new models</h2>
            <ProductSliderButtons
              products={newModelForShow}
              section="brand-new"
              slides={slidesPerView()}
            />
          </div>

          <BrandNewSlider />
        </div>
      </section>
      <section className="categories">
        <div className="container">
          <h2 className="categories__title title">Shop by category</h2>
          <div className="categories__box">
            {categories &&
              categories.map((category, index) => (
                <CategoryCart key={index} category={category} />
              ))}
          </div>
        </div>
      </section>
      <section className="hot-prices">
        <div className="container">
          <div className="hot-prices__title-box product__title-box">
            <h2 className="title hot-prices__title">Hot prices</h2>
            {hotPrisModels && (
              <ProductSliderButtons
                products={hotMOdelForShow}
                section="hot-prices"
                slides={slidesPerView()}
              />
            )}
          </div>

          <HotPricesSlider />
        </div>
      </section>
    </>
  );
};
