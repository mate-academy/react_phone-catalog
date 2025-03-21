import React from 'react';
import style from './ProductDetailPage.module.scss';
import homeIcon from '../../shared/icons/home.svg';
import arrowRight from '../../shared/icons/chevron-arrow-right.svg';
import arrowLeft from '../../shared/icons/chevron-arrow-left.svg';
import favouriteIcon from '../../shared/icons/favourites-heart-like.svg';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import products from '../../../public/api/phones.json';
import allProducts from '../../../public/api/products.json';
import { useLocation } from 'react-router-dom';

export const ProductDetailsPage: React.FC = () => {
  const slisedPhone = products.slice(0, 1);
  const productImage = slisedPhone.flatMap(phone => phone.images);
  const location = useLocation();
  const locationProduct = location.pathname.split('/')[2];

  const findProduct = allProducts.filter(phone => phone.itemId === locationProduct);

  console.log(findProduct);



  return (
    <div className={style.detailPage}>
      <div className={style.wrapper}>
        <div className={style.navigation}>
          <img src={homeIcon} alt="home icon" className={style.icon} />
          <img src={arrowRight} alt="arrow right" className={style.icon} />
          <p className={style.pageTitle}>Phones</p>
          <img src={arrowRight} alt="arrow right" className={style.icon} />
          <p className={style.sectionPhoneTitle}>Selected phone from section</p>
        </div>

        <button className={style.backButton}>
          <img src={arrowLeft} alt="arrow icon left" className={style.icon} />
          <p className={style.back}>Back</p>
        </button>

        <h1 className={style.productTitle}>Phone name title</h1>

        <div className={style.container}>
          <div className={style.product}>
            <div className={style.leftSide}>
              <div className={style.slider}>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  slidesPerView={1}
                  pagination={{
                    el: '#swiper-pagination-product',
                    clickable: true,
                    bulletClass: `${style.paginationBullet}`,
                    bulletActiveClass: `${style.paginationBulletActive}`,
                    currentClass: `${style.paginationBulletTile}`,
                    renderBullet: (index, className) => `
                    <span class="${className}">
                      <img src="${productImage[index]}" alt="Bullet ${index}" class="${style.paginationBulletImg}" />
                    </span>
                  `,
                  }}
                  onSwiper={swiper => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
                >
                  <div className={style.slideContent}>
                    {slisedPhone.map(phone =>
                      phone.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className={style.slide}>
                            <img src={image} alt="slide" className={style.slideImg} />
                          </div>
                        </SwiperSlide>
                      )),
                    )}
                  </div>
                </Swiper>
              </div>

              <div id="swiper-pagination-product" className={style.pagination}></div>
            </div>

            <div className={style.rightSide}>
              <div className={style.colorProduct}>
                <p className={style.titleSection}>Available colors</p>
                <div className={style.colorList}>
                  <span className={`${style.colorItem} ${style.colorItemActive}`}></span>
                  <span className={style.colorItem}></span>
                  <span className={style.colorItem}></span>
                  <span className={style.colorItem}></span>
                </div>
              </div>

              <div className={style.capacityProduct}>
                <p className={style.titleSection}>Select capacity</p>
                <div className={style.colorList}>
                  <span className={`${style.select} ${style.selectActive}`}>64 GB</span>
                  <span className={style.select}>256 GB</span>
                  <span className={style.select}>512 GB</span>
                </div>
              </div>

              <div className={style.priceProduct}>
                <div className={style.price}>
                  <p className={style.priceRegular}>$799</p>
                  <p className={style.priceDiscount}>$1199</p>
                </div>

                <div className={style.phoneFooter}>
                  <button className={style.addToCart}>Add to cart</button>

                  <div className={style.favorite}>
                    <img src={favouriteIcon} alt="favourite icon" className={style.favouriteIcon} />
                  </div>
                </div>

                <div className={style.phoneDescription}>
                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Screen</p>
                    <p className={style.propertieDescription}>6.5 OLED</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Resolution</p>
                    <p className={style.propertieDescription}>2688x1242</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Processor</p>
                    <p className={style.propertieDescription}>Apple A12 Bionic</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>RAM</p>
                    <p className={style.propertieDescription}>3 GB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={style.onDesctopPosition}>
            <section className={style.aboutProduct}>
              <h1 className={style.sectionTitle}>About</h1>

              <article className={style.article}>
                <h2 className={style.articleTitle}>And then hrere was Pro</h2>
                <p className={style.articleDescription}>Some text</p>
              </article>

              <article className={style.article}>
                <h2 className={style.articleTitle}>Camera</h2>
                <p className={style.articleDescription}>Some text</p>
              </article>

              <article className={style.article}>
                <h2 className={style.articleTitle}>
                  Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.
                </h2>
                <p className={style.articleDescription}>Some text</p>
              </article>
            </section>

            <section className={style.aboutProduct}>
              <h1 className={style.sectionTitle}>Tech specs</h1>

              <article>
                <div className={style.phoneDescription}>
                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Screen</p>
                    <p className={style.propertieDescription}>6.5 OLED</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Resolution</p>
                    <p className={style.propertieDescription}>2688x1242</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Processor</p>
                    <p className={style.propertieDescription}>Apple A12 Bionic</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>RAM</p>
                    <p className={style.propertieDescription}>3 GB</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Built in memory</p>
                    <p className={style.propertieDescription}>64 GB</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Camera</p>
                    <p className={style.propertieDescription}>12 Mp + 12 Mp + 12 Mp (Triple)</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Zoom</p>
                    <p className={style.propertieDescription}>Optical, 2x</p>
                  </div>

                  <div className={style.phoneProperties}>
                    <p className={style.propertieTitle}>Cell</p>
                    <p className={style.propertieDescription}>GSM, LTE, UMTS</p>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
