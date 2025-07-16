import { Swiper, SwiperSlide } from 'swiper/react';
import { Products } from '../../types/types';
import { useEffect, useState } from 'react';
import hotPricesStyles from './HotPrices.module.scss';

const HotPrices = () => {
  const [gadgets, setGadgets] = useState<Products[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setGadgets(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(gadgets.length);

  const hotProducts = gadgets
    .filter(p => p.price < p.fullPrice)
    .filter((p, i, arr) => arr.findIndex(x => x.color === p.color) === i)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  console.log(hotProducts);

  return (
    <>
      <div className={hotPricesStyles.brand}>
        <h1 className={hotPricesStyles.brand__title}>Hot prices</h1>
        <Swiper
          spaceBetween={16}
          slidesPerView={'auto'}
          className={hotPricesStyles.brand__swiper}
        >
          {hotProducts.map(product => {
            return (
              <SwiperSlide
                className={hotPricesStyles.brand__card}
                key={product.id}
              >
                <a
                  href="#"
                  style={{ backgroundImage: `url('${product.image}')` }}
                  className={hotPricesStyles.brand__image}
                ></a>

                {/* <div className={hotPricesStyles.brand__imageWrapper}>
            </div> */}

                <div className={hotPricesStyles.brand__data}>
                  <div className={hotPricesStyles.brand__name}>
                    {product.name}
                  </div>
                  <div className={hotPricesStyles.brand__price}>
                    ${product.fullPrice}
                  </div>
                </div>

                <div className={hotPricesStyles.brand__deteils}>
                  <div className={hotPricesStyles.brand__info}>
                    <div>Screen</div>
                    <div>{product.screen}</div>
                  </div>
                  <div className={hotPricesStyles.brand__info}>
                    <div>Capacity</div>
                    <div className={hotPricesStyles.brand__gb}>128 GB</div>
                  </div>
                  <div className={hotPricesStyles.brand__info}>
                    <div>RAM</div>
                    <div>6 GB</div>
                  </div>
                </div>

                <div className={hotPricesStyles.brand__buttons}>
                  <button className={hotPricesStyles.brand__add}>
                    Add to cart
                  </button>

                  <a
                    href="#"
                    className={hotPricesStyles['brand__lovely-choice']}
                  ></a>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default HotPrices;
