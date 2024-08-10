import { ProductsSlider } from '../components/ProductsSlider';
import {
  getAmountOfProducts,
  getBrandNewModels,
  getHotPriceProducts,
} from '../api/products';
import categoryPhonesImg from '../images/category-phones.webp';
import categoryTabletsImg from '../images/category-tablets.webp';
import categoryAccessoriesImg from '../images/category-accessories.webp';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../components/Loader';
import { ArrowButton } from '../components/ArrowButton';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getBanner } from '../api/banner';

export const HomePage: React.FC = () => {
  const {
    isLoading: productsAmountLoading,
    data: productsAmount = {
      accessories: 0,
      phones: 0,
      tablets: 0,
    },
  } = useQuery({
    queryKey: ['productsAmount'],
    queryFn: getAmountOfProducts,
  });

  const { isLoading: brandNewModelsLoading, data: brandNewModels = [] } =
    useQuery({
      queryKey: ['brandNewModels'],
      queryFn: getBrandNewModels,
    });

  const { isLoading: hotPriceProductsLoading, data: hotPriceProducts = [] } =
    useQuery({
      queryKey: ['hotPriceProducts'],
      queryFn: getHotPriceProducts,
    });

  const { isLoading: bannerLoading, data: banner } = useQuery({
    queryKey: ['banner'],
    queryFn: getBanner,
  });

  return (
    <main className="flex flex-col items-center gap-16 pb-16 pt-6">
      {bannerLoading ? (
        <Loader />
      ) : (
        <section
          className="content-padding flex flex-col
        gap-6 max-md:px-0 md:gap-8 lg:gap-14"
        >
          <h1 className="content-padding m-0 md:px-0">
            Welcome to Nice Gadgets store!
          </h1>
          {!!banner?.length && (
            <div className="flex flex-col gap-2">
              <div className="flex md:h-48 md:gap-x-5 lg:h-100 lg:gap-x-4">
                <ArrowButton
                  id="home-page-banner-prevEl"
                  className="hidden h-full md:flex"
                  position="left"
                />

                <Swiper
                  pagination={{
                    el: '#banner-container-of-bullets',
                    type: 'bullets',
                    bulletClass: 'h-1 w-3.5 bg-elements cursor-pointer',
                    bulletActiveClass: 'bg-primary',
                    clickable: true,
                  }}
                  navigation={{
                    prevEl: '#home-page-banner-prevEl',
                    nextEl: '#home-page-banner-nextEl',
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  slidesPerView="auto"
                  loop
                  className="flex w-full"
                  autoplay
                >
                  {banner.map(item => (
                    <SwiperSlide className="w-full" key={item}>
                      <img
                        src={item}
                        alt="Banner"
                        className="aspect-square w-full object-cover
                      md:aspect-auto md:h-full"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <ArrowButton
                  id="home-page-banner-nextEl"
                  className="hidden h-full md:flex"
                  position="right"
                />
              </div>
              <div
                id="banner-container-of-bullets"
                className="flex justify-center gap-2.5 px-1 py-2.5"
              ></div>
            </div>
          )}
        </section>
      )}

      {brandNewModelsLoading ? (
        <Loader />
      ) : (
        <ProductsSlider
          className="content-padding"
          discount={false}
          title="Brand new models"
          slides={brandNewModels}
        />
      )}

      {productsAmountLoading ? (
        <Loader />
      ) : (
        <section className="content-padding flex w-full flex-col gap-6">
          <h2>Shop by category</h2>

          <div className="flex w-full flex-col gap-8 md:flex-row md:gap-4">
            <div className="flex w-full flex-col gap-6">
              <Link to="/phones">
                <div
                  className="aspect-square w-full overflow-hidden bg-[#6D6474]
                  transition hover:scale-110
                  hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.102)]"
                >
                  <img
                    className="translate-x-16 translate-y-16"
                    src={categoryPhonesImg}
                    alt="Category phones"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <h4>Mobile phones</h4>
                <p className="text-secondary">{`${productsAmount.phones} models`}</p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6">
              <Link to="/tablets">
                <div
                  className="aspect-square w-full overflow-hidden bg-[#8D8D92]
                  transition hover:scale-110
                  hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.102)]"
                >
                  <img
                    className="translate-x-16 translate-y-16"
                    src={categoryTabletsImg}
                    alt="Category phones"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <h4>Tablets</h4>
                <p className="text-secondary">{`${productsAmount.tablets} models`}</p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6">
              <Link to="/accessories">
                <div
                  className="aspect-square w-full overflow-hidden bg-[#973D5F]
                  transition hover:scale-110
                  hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.102)]"
                >
                  <img
                    className="translate-x-16 translate-y-16"
                    src={categoryAccessoriesImg}
                    alt="Category phones"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <h4>Accessories</h4>
                <p className="text-secondary">{`${productsAmount.accessories} models`}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {hotPriceProductsLoading ? (
        <Loader />
      ) : (
        <ProductsSlider
          className="content-padding"
          title="Hot prices"
          slides={hotPriceProducts}
        />
      )}
    </main>
  );
};
