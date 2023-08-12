import { FC, useContext, useMemo } from 'react';
import { Banner } from '../../components/Banner/Banner';

import './HomePage.scss';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';
import { ProductsList } from '../../components/Products/Products';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { SectionNames } from '../../types/SectionNames';
import { Loader } from '../../components/Loader';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

export const HomePage: FC = () => {
  const { products } = useContext(PhoneCatalogContext);

  const hotPriceProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const absoluteAPrice = a.fullPrice - a.price;
      const absoluteBPrice = b.fullPrice - b.price;

      return absoluteBPrice - absoluteAPrice;
    });
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...products].filter((phone) => {
      return phone.year > 2018;
    });
  }, [products]);

  return (
    <div className="home-page">
      <section className="home-page__section banner">
        <Banner />
      </section>

      <section className="home-page__section hot-prices">
        {hotPriceProducts.length ? (
          <ProductsSlider
            title={SectionNames.HotPrice}
            itemsLength={hotPriceProducts.length}
          >
            <ProductsList
              sectionTitle={SectionNames.HotPrice}
              products={hotPriceProducts}
            />
          </ProductsSlider>
        ) : (
          <Loader />
        )}
      </section>

      <section className="home-page__section shop-by-category">
        <ShopByCategory />
      </section>

      <section className="home-page__section brand-new">
        {hotPriceProducts.length ? (
          <ProductsSlider
            title={SectionNames.BrandNew}
            itemsLength={brandNewProducts.length}
          >
            <ProductsList
              sectionTitle={SectionNames.BrandNew}
              products={brandNewProducts}
            />
          </ProductsSlider>
        ) : (
          <Loader />
        )}
      </section>
    </div>
  );
};
