import { useEffect, useRef, useState } from 'react';
import { Container } from '../../shared/components/Container/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cn from 'classnames';
import './HomePage.scss';
import { CardsSlider } from '../../shared/components/CardsSlider';
import { fetchJson } from '../../api-func';
import { Product } from '../../types/types';

// images
import Phones from '../../images/Phones.png';
import Tablets from '../../images/Tablets.png';
import Accessories from '../../images/Accessories.png';

const slides = [
  {
    id: 1,
    image: 'img/banner-phones.png',
    title: 'Smartphones',
  },
  {
    id: 2,
    image: 'img/banner-accessories.png',
    title: 'Accessories',
  },
  {
    id: 3,
    image: 'img/banner-tablets.png',
    title: 'Tablets',
  },
];

export const HomePage = () => {
  const swiperRef = useRef<SwiperCore>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [newPhones, setNewPhones] = useState<Product[]>([]);

  const [hotDeals, setHotDeals] = useState<Product[]>([]);

  const getDiscount = (product: Product) => product.fullPrice - product.price;

  const handleNewPhones = (products: Product[]) => {
    const maxYear = Math.max(...products.map(product => product.year));

    return products.filter(product => product.year >= maxYear);
  };

  const handleHotDealProducts = (products: Product[]) => {
    return [...products].sort((a, b) => getDiscount(b) - getDiscount(a));
  };

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchJson('products');

      setAllProducts(products);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length) {
      setNewPhones(handleNewPhones(allProducts));
      setHotDeals(handleHotDealProducts(allProducts));
    }
  }, [allProducts]);

  return (
    <div className="home-page">
      <Container>
        <h1 className={'home-page__hidden-title'}>Product Catalog</h1>
        <h2 className={'home-page__title'}>Welcome to Nice Gadgets store!</h2>
      </Container>

      <div className={'slider__container'}>
        <button
          type="button"
          className={cn(
            'slider__container--arrow-icon',
            'slider__container--arrow-icon-left',
          )}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <div className={cn('icon', 'icon_left')} />
        </button>

        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onBeforeInit={swiper => {
            swiperRef.current = swiper;
          }}
          className={'photoSwiper'}
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className={'slider__content'}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={'slider__image'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={cn(
            'slider__container--arrow-icon',
            'slider__container--arrow-icon-right',
          )}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <div className={cn('icon', 'icon_right')} />
        </button>
      </div>

      <CardsSlider
        products={newPhones}
        discount={false}
        title="Brand new models"
      />

      <Container>
        <section className="category category__section">
          <h2 className="category__title">Shop by category</h2>
          <ul className="category__list">
            <li className="category__item">
              <div className="category__link-field phones">
                <a href="/phones" className="category__link phones-link">
                  <img src={Phones} alt="Phones" className="category__image" />
                </a>
              </div>

              <h3 className="category__name">Mobile phones</h3>
              <p className="category__info">95 models</p>
            </li>

            <li className="category__item">
              <div className="category__link-field tablets">
                <a href="/tablets" className="category__link">
                  <img
                    src={Tablets}
                    alt="Tablets"
                    className="category__image"
                  />
                </a>
              </div>
              <h3 className="category__name">Tablets</h3>
              <p className="category__info">24 models</p>
            </li>

            <li className="category__item">
              <div className="category__link-field accessories">
                <a href="/accessories" className="category__link">
                  <img
                    src={Accessories}
                    alt="Accessories"
                    className="category__image"
                  />
                </a>
              </div>
              <h3 className="category__name">Accessories</h3>
              <p className="category__info">100 models</p>
            </li>
          </ul>
        </section>
      </Container>

      <CardsSlider products={hotDeals} discount={true} title="Hot prices" />
    </div>
  );
};
