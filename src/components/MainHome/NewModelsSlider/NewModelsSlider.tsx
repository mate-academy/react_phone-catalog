import './NewModelsSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { getProducts } from '../../../api';
import { Product } from '../../../types/Product';
import { BasketProduct } from '../../../types/BasketProduct';
import { FavoriteProduct } from '../../../types/FavoriteProduct';
import ProductCard from '../../ProductList/ProductCard/ProductCard';

type NewModelsSliderProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const NewModelsSlider = ({
  favorites,
  setFavorites,
  baskets,
  setBaskets,
}: NewModelsSliderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const newProducts = products.filter(product => product.year >= 2022);

  return (
    <>
      <div className="new-models-slider">
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
          {newProducts.map(product => (
            <SwiperSlide key={product.itemId}>
              {' '}
              <ProductCard
                key={product.itemId}
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

export default NewModelsSlider;
