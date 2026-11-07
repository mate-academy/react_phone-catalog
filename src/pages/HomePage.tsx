import { useMemo } from 'react';
import { PromoCarousel } from '../components/organisms/Carousels/PromoCarousel/PromoCarousel';
import { BANNERS } from '../constants/banners';
import { ProductsCarousel } from '../components/organisms/Carousels/ProductsCarousel/ProductsCarousel';
import { SQUARE_BANNERS } from '../constants/squareBanners';
import { ShopByCategory } from '../components/organisms/ShopByCategory';
import { HomeLayout } from '../components/templates/HomeLayout';
import { useAppState } from '../store/store';
import { getLimitedProducts } from '../utils/limitedProducts';
import type { CarouselConfig } from '../types/carouselConfig';
import { useCarouselParams } from '../hooks/useCarouselParams';
import { CATEGORY_IMAGES } from '../constants/categoryImages';

const carouselConfig: CarouselConfig = {
  mobile: {
    slides: 1.4,
    height: 439,
  },
  tablet: {
    slides: 2.5,
    height: 512,
  },
  desktop: {
    slides: 4,
    height: 506,
  },
};

export const HomePage: React.FC = () => {
  const phones = useAppState((state) => state.phones);
  const tablets = useAppState((state) => state.tablets);
  const accessories = useAppState((state) => state.accessories);

  const productsData = useMemo(() => {
    return [...phones, ...tablets, ...accessories];
  }, [phones, tablets, accessories]);

  const carouselParams = useCarouselParams(carouselConfig);

  const newProducts = useMemo(() => {
    return getLimitedProducts(
      [...productsData].sort((a, b) => b.year - a.year),
    );
  }, [productsData]);

  const hotPriceProducts = useMemo(() => {
    const allHotProducts = [...productsData]
      .filter(
        (p) =>
          p.priceRegular && p.priceDiscount && p.priceDiscount < p.priceRegular,
      )
      .sort(
        (a, b) =>
          b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
      );

    return getLimitedProducts(allHotProducts);
  }, [productsData]);

  return (
    <HomeLayout
      heroSlider={
        <PromoCarousel
          banners={BANNERS}
          squareBanners={SQUARE_BANNERS}
        />
      }
      brandNewCarousel={
        <ProductsCarousel
          title="Brand new models"
          products={newProducts}
          productCardHeight={carouselParams.height}
          displayedSlides={carouselParams.slides}
        />
      }
      shopByCategory={
        <ShopByCategory
          categories={[
            {
              title: 'Mobile phones',
              image: CATEGORY_IMAGES.phones,
              count: phones.length,
              to: '/phones',
            },
            {
              title: 'Tablets',
              image: CATEGORY_IMAGES.tablets,
              count: tablets.length,
              to: '/tablets',
            },
            {
              title: 'Accessories',
              image: CATEGORY_IMAGES.accessories,
              count: accessories.length,
              to: '/accessories',
            },
          ]}
        />
      }
      hotPricesCarousel={
        <ProductsCarousel
          title="Hot prices"
          products={
            hotPriceProducts.length > 0 ? hotPriceProducts : productsData
          }
          productCardHeight={carouselParams.height}
          displayedSlides={carouselParams.slides}
        />
      }
    />
  );
};
