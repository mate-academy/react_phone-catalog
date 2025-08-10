import brandStyles from './NewBrand.module.scss';
import { Products } from '../../types/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../Loader';
import ViewCart from '../ViewCart';

const NewBrand = () => {
  const [products, setProducts] = useState<Products[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  const maxYear = useMemo(() => {
    return Math.max(...products.map(product => product.year));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return products.filter(product => product.year === maxYear);
  }, [maxYear, products]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={brandStyles.brand}>
        <div className={brandStyles.brand__top}>
          <h1 className={brandStyles.brand__title}>Brand new models</h1>

          <div className={brandStyles.brand__navigation}>
            <button
              className={`${brandStyles.brand__left} ${brandStyles.brand__vectors} navigation-button-prev-2`}
            ></button>
            <button
              className={`${brandStyles.brand__right} ${brandStyles.brand__vectors} navigation-button-next-2`}
            ></button>
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          modules={[Navigation]}
          slidesPerView={'auto'}
          className={brandStyles.brand__swiper}
          navigation={{
            nextEl: '.navigation-button-next-2',
            prevEl: '.navigation-button-prev-2',
          }}
        >
          {brandNewProducts.map(phone => {
            return (
              <SwiperSlide className={brandStyles.brand__card} key={phone.id}>
                <ViewCart
                  gadget={phone}
                  gadgets={phone.category}
                  key={phone.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default NewBrand;
