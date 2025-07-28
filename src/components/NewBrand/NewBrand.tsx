/* eslint-disable max-len */
import brandStyles from './NewBrand.module.scss';
import cn from 'classnames';
import { Iphones, Products, Tablets } from '../../types/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import Loader from '../Loader';

const NewBrand = () => {
  const [products, setProducts] = useState<Products[] | []>([]);
  // const [tablets, setTablets] = useState<Tablets[] | []>([]);
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
      .then(data => setProducts(data))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log(products);

  const maxYear = Math.max(...products.map(product => product.year));
  const brandNewProducts = products.filter(product => product.year === maxYear);

  const allColors = new Set(brandNewProducts.map(product => product.color));
  const arrayColorsIphones = Array.from(allColors);

  console.log(brandNewProducts);

  // const finallyAsortiment = brandNewProducts.filter(item => {
  //   const singleIphoneColor = arrayColorsIphones.find(
  //     color => color === item.color,
  //   );

  //   const allTypesProducts = arrayColorsIphones.filter(color => {
  //     return color === item.color;
  //   });

  //   const index = arrayColorsIphones.findIndex(color => color === item.color);

  //   if (index !== -1) {
  //     arrayColorsIphones[index] = '';
  //   }

  //   return true;
  // });

  console.log(brandNewProducts);

  const objProducts = {
    phones: brandNewProducts.filter(model => model.category === 'phones'),
    tablets: brandNewProducts.filter(model => model.category === 'tablets'),
    accessories: brandNewProducts.filter(
      model => model.category === 'accessories',
    ),
  };

  console.log(objProducts);

  return (
    <>
      <div className={brandStyles.brand}>
        <div className={brandStyles.brand__top}>
          <h1 className={brandStyles.brand__title}>Brand new models</h1>

          <div className={brandStyles.brand__navigation}>
            <button
              className={`${brandStyles.brand__left} ${brandStyles.brand__vectors} navigation-button-prev`}
            ></button>
            <button
              className={`${brandStyles.brand__right} ${brandStyles.brand__vectors} navigation-button-next`}
            ></button>
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          modules={[Navigation]}
          slidesPerView={'auto'}
          className={brandStyles.brand__swiper}
          navigation={{
            nextEl: '.navigation-button-next',
            prevEl: '.navigation-button-prev',
          }}
        >
          {brandNewProducts.map(phone => {
            return (
              <SwiperSlide className={brandStyles.brand__card} key={phone.id}>
                <a
                  href="#"
                  style={{ backgroundImage: `url('${phone.image}')` }}
                  className={brandStyles.brand__image}
                ></a>

                {/* <div className={brandStyles.brand__imageWrapper}>
                            </div> */}

                <div className={brandStyles.brand__data}>
                  <div className={brandStyles.brand__name}>{phone.name}</div>
                  <div className={brandStyles.brand__price}>
                    ${phone.fullPrice}
                  </div>
                </div>

                <div className={brandStyles.brand__deteils}>
                  <div className={brandStyles.brand__info}>
                    <div>Screen</div>
                    <div>{phone.screen}</div>
                  </div>
                  <div className={brandStyles.brand__info}>
                    <div>Capacity</div>
                    <div className={brandStyles.brand__gb}>128 GB</div>
                  </div>
                  <div className={brandStyles.brand__info}>
                    <div>RAM</div>
                    <div>6 GB</div>
                  </div>
                </div>

                <div className={brandStyles.brand__buttons}>
                  <button
                    className={cn(brandStyles.brand__add, {
                      [brandStyles.brand__added]: cartItems.some(
                        item => item.itemId === phone.itemId,
                      ),
                    })}
                    onClick={() => addToCart(phone)}
                  >
                    {cartItems.some(item => item.itemId === phone.itemId)
                      ? 'Added to cart'
                      : 'Add to cart'}
                  </button>

                  <button
                    // className={brandStyles['brand__lovely-choice']}
                    className={cn(brandStyles['brand__lovely-choice'], {
                      [brandStyles['brand__lovely-choice--active']]:
                        lovelyProducts.some(
                          item => item.itemId === phone.itemId,
                        ),
                    })}
                    onClick={() => addProductToLovely(phone)}
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

export default NewBrand;
