import { Swiper, SwiperSlide } from 'swiper/react';
import { Products } from '../../types/types';
import { useEffect, useState } from 'react';
import hotPricesStyles from './HotPrices.module.scss';
import { Navigation } from 'swiper/modules';
import { useCart } from '../../context/CartContext';
import cn from 'classnames';
import Loader from '../Loader';

const HotPrices = () => {
  const [gadgets, setGadgets] = useState<Products[] | []>([]);
  const [loading, setLoading] = useState(true);
  const {
    cartItems,
    setCartItems,
    lovelyProducts,
    setLovelyProducts,
    addToCart,
    addProductToLovely,
  } = useCart();

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setGadgets(data))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  if (loading) {
    return <Loader />;
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
        <div className={hotPricesStyles.brand__top}>
          <h1 className={hotPricesStyles.brand__title}>Hot prices</h1>
          <div className={hotPricesStyles.brand__navigation}>
            <button
              className={`${hotPricesStyles.brand__left} ${hotPricesStyles.brand__vectors} navigation-button-prev`}
            ></button>
            <button
              className={`${hotPricesStyles.brand__right} ${hotPricesStyles.brand__vectors} navigation-button-next`}
            ></button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={'auto'}
          className={hotPricesStyles.brand__swiper}
          navigation={{
            nextEl: '.navigation-button-next',
            prevEl: '.navigation-button-prev',
          }}
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
                  <button
                    className={cn(hotPricesStyles.brand__add, {
                      [hotPricesStyles.brand__added]: cartItems.some(
                        item => item.itemId === product.itemId,
                      ),
                    })}
                    onClick={() => addToCart(product)}
                  >
                    {cartItems.some(item => item.itemId === product.itemId)
                      ? 'Added to cart'
                      : 'Add to cart'}
                  </button>

                  <button
                    className={cn(hotPricesStyles['brand__lovely-choice'], {
                      [hotPricesStyles['brand__lovely-choice--active']]:
                        lovelyProducts.some(
                          item => item.itemId === product.itemId,
                        ),
                    })}
                    onClick={() => addProductToLovely(product)}
                  ></button>
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
