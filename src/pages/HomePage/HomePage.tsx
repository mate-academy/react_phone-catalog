import { FC, useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Banner } from '../../components/Banner/Banner';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { SectionName } from '../../types/SectionName';
import { Loader } from '../../components/Loader';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Notification } from '../../components/Notification/Notification';
import { NotificationMessage } from '../../types/NotificationMessage';

import './HomePage.scss';

export const HomePage: FC = () => {
  const {
    products,
    isLoading,
    hasError,
  } = useAppSelector(store => store.products);

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
        {isLoading && <Loader />}

        {hasError
          && <Notification message={NotificationMessage.FetchError} />}

        {!isLoading && !hasError && !!hotPriceProducts.length && (
          <ProductsSlider
            title={SectionName.HotPrice}
            itemsLength={hotPriceProducts.length}
          >
            <ProductsList
              sectionTitle={SectionName.HotPrice}
              products={hotPriceProducts}
            />
          </ProductsSlider>
        )}
      </section>

      <section className="home-page__section shop-by-category">
        <ShopByCategory />
      </section>

      <section className="home-page__section brand-new">
        {isLoading && <Loader />}

        {hasError
          && <Notification message={NotificationMessage.FetchError} />}

        {!isLoading && !hasError && !!brandNewProducts.length && (
          <ProductsSlider
            title={SectionName.BrandNew}
            itemsLength={brandNewProducts.length}
          >
            <ProductsList
              sectionTitle={SectionName.BrandNew}
              products={brandNewProducts}
            />
          </ProductsSlider>
        )}
      </section>
    </div>
  );
};
