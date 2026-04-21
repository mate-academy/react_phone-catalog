import './HotPricesSwiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { getProducts } from '../../../api';
import { Product } from '../../../types/Product';
import { BasketProduct } from '../../../types/BasketProduct';
import { FavoriteProduct } from '../../../types/FavoriteProduct';
import ProductCard from '../../ProductList/ProductCard/ProductCard';

type HotPricesSwiperProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const HotPricesSwiper = ({
  favorites,
  setFavorites,
  baskets,
  setBaskets,
}: HotPricesSwiperProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const hotPriceProducts = products.filter(
    product => product.price < 850 && product.category === 'phones',
  );

  return (
    <>
      <div className="hot-prices-swiper">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {hotPriceProducts.map(product => (
            <SwiperSlide key={product.itemId}>
              <ProductCard
                product={product}
                favorites={favorites}
                setFavorites={setFavorites}
                baskets={baskets}
                setBaskets={setBaskets}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HotPricesSwiper;
