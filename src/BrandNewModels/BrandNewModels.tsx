import React from 'react';
import phones from '../../public/api/phones.json';
import products from '../../public/api/products.json';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './BrandNewModels.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

SwiperCore.use([Navigation]);

const mergeData = () => {
  const formattedPhones = phones.map(phone => ({
    id: phone.id,
    name: phone.name,
    capacity: phone.capacity,
    priceRegular: phone.priceRegular,
    priceDiscount: phone.priceDiscount,
    color: phone.color,
    imageUrl: phone.images[0],
    screen: phone.screen,
    ram: phone.ram,
    year: phone.releaseDate ? new Date(phone.releaseDate).getFullYear() : null,
  }));

  const formattedProducts = products.map(product => ({
    id: product.itemId,
    name: product.name,
    capacity: product.capacity,
    priceRegular: product.fullPrice,
    priceDiscount: product.price,
    color: product.color,
    imageUrl: product.image,
    screen: product.screen,
    ram: product.ram,
    year: product.year,
  }));

  return [...formattedPhones, ...formattedProducts];
};

export const BrandNewModels: React.FC = () => {
  const allProducts = mergeData();

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (!a.year) {
      return 1;
    }

    if (!b.year) {
      return -1;
    }

    return b.year - a.year;
  });

  const { dispatch } = useCart();

  const handleAddToCart = (id: string) => {
    const product = allProducts.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const product = allProducts.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  return (
    <div className={styles.product_list}>
      <div className={styles.controls}>
        <h1 className={styles.title}>Brand new models</h1>
        <div className={styles.buttons_group}>
          <button
            className={`brand-new-slider_prev ${styles.buttons_controls}`}
          >
            <img src="img/Arrow-left.png" alt="Next" />
          </button>
          <button
            className={`brand-new-slider_next  ${styles.buttons_controls}`}
          >
            <img src="img/Arrow-right.png" alt="Next" />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        navigation={{
          nextEl: '.brand-new-slider_next',
          prevEl: '.brand-new-slider_prev',
        }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 16 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          1200: { slidesPerView: 4, spaceBetween: 16 },
        }}
        className={styles.product_grid}
      >
        {sortedProducts.map(product => (
          <SwiperSlide key={product.id}>
            <Link to={`/product/${product.id}`} className={styles.link_product}>
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.priceRegular}
                discountPrice={product.priceDiscount}
                imageUrl={product.imageUrl}
                isFavorite={false}
                screen={product.screen}
                capacity={product.capacity}
                ram={product.ram}
                onAddToCart={() => handleAddToCart(product.id)}
                onToggleFavorite={() => handleToggleFavorite(product.id)}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
