/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//#region import
import styles from './ItemCard.module.scss';
import 'swiper/swiper-bundle.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
import { CardGalery } from '../../components/CardGalery/CardGalery';
//#endregion
//#region icons imports
import Right from '../../icons/Right.svg';
import Left from '../../icons/Left.svg';
import Home from '../../icons/Home.svg';
import Like from '../../icons/like.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BrandCard } from '../../components/BrandCard';
import { useState } from 'react';
//#endregion

const mockImages = [
  '/img/phones/apple-iphone-11/black/00.webp',
  '/img/phones/apple-iphone-11/black/01.webp',
  '/img/phones/apple-iphone-11/black/02.webp',
  '/img/phones/apple-iphone-11/black/03.webp',
  '/img/phones/apple-iphone-11/black/04.webp',
];

export function ItemCard() {
  const disc = true;
  const [newSwiper, setNewSwiper] = useState<any>(null);

  return (
    <div className={styles.ItemCard}>
      <Header />
      <main className={styles.main}>
        <div className={styles.BreadCrumbs}>
          <Link to={'/'} className={styles.BreadCrumbs__link}>
            <img src={Home} alt="" className={styles.BreadCrumbs__img} />
          </Link>
          <img src={Right} alt="" />
          <span className={styles.BreadCrumbs__link}>Phones</span>

          <img src={Right} alt="" />

          <Link
            to={''}
            className={`${styles.BreadCrumbs__link} ${styles.BreadCrumbs__last}`}
          >
            Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
          </Link>
        </div>
        <div className={styles.back}>
          <img src={Left} alt="" className={styles.back__img} />
          <p className={styles.back__text}>Back</p>
        </div>
        <h1 className={styles.galery__title}>
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </h1>
        <div className={styles.galeryBlock}>
          <div className={styles.galery}>
            <CardGalery images={mockImages} />
          </div>
          <div className={styles.description}>
            <div className={styles.top}>
              <h2 className={styles.top__title}>Available colors</h2>
              <h2 className={styles.top__id}>ID: 802390</h2>
            </div>
            <div className={styles.colors}>
              <span
                className={`${styles.colors__color} ${styles.color__bej}`}
              ></span>
              <span
                className={`${styles.colors__color} ${styles.color__gr}`}
              ></span>
              <span
                className={`${styles.colors__color} ${styles.color__bl}`}
              ></span>
              <span
                className={`${styles.colors__color} ${styles.color__wh}`}
              ></span>
            </div>
            <hr className={styles.divider} />
            <div className={styles.cap}>
              <h1 className={styles.cap__title}>Select capacity</h1>
              <div className={styles.variants}>
                <span className={styles.variants__var}>64 GB</span>
                <span className={styles.variants__var}>256 GB</span>
                <span className={styles.variants__var}>512 GB</span>
              </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.cart}>
              <div className={styles.price}>
                <h2 className={styles.price__main}>$799</h2>
                {disc ? <h2 className={styles.price__disc}>$1199</h2> : null}
              </div>
              <div className={styles.buttons}>
                <button className={styles.buttons__cart}>Add to cart</button>
                <button className={styles.buttons__fav}>
                  <img src={Like} alt="" />
                </button>
              </div>
              <div className={styles.desksm}>
                <div className={styles.params}>
                  <h3 className={styles.params__label}>Screen</h3>
                  <p className={styles.params__value}>6.5” OLED</p>
                </div>
                <div className={styles.params}>
                  <h3 className={styles.params__label}>Screen</h3>
                  <p className={styles.params__value}>6.5” OLED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bot}>
          <div className={styles.about}>
            <h1 className={styles.about__title}>About</h1>
            <hr className={styles.divider} />
            <div className={styles.aboutpage}>
              <div className={styles.aboutBlock}>
                <h2 className={styles.aboutBlock__title}>
                  And then there was Pro
                </h2>
                <p className={styles.aboutBlock__desk}>
                  A transformative triple‑camera system that adds tons of
                  capability without complexity.{' '}
                </p>
                <p className={styles.aboutBlock__desk}>
                  An unprecedented leap in battery life. And a mind‑blowing chip
                  that doubles down on machine learning and pushes the
                  boundaries of what a smartphone can do. Welcome to the first
                  iPhone powerful enough to be called Pro.
                </p>
              </div>
              <div className={styles.aboutBlock}>
                <h2 className={styles.aboutBlock__title}>
                  And then there was Pro
                </h2>
                <p className={styles.aboutBlock__desk}>
                  A transformative triple‑camera system that adds tons of
                  capability without complexity.{' '}
                </p>
                <p className={styles.aboutBlock__desk}>
                  An unprecedented leap in battery life. And a mind‑blowing chip
                  that doubles down on machine learning and pushes the
                  boundaries of what a smartphone can do. Welcome to the first
                  iPhone powerful enough to be called Pro.
                </p>
              </div>
              <div className={styles.aboutBlock}>
                <h2 className={styles.aboutBlock__title}>
                  And then there was Pro
                </h2>
                <p className={styles.aboutBlock__desk}>
                  A transformative triple‑camera system that adds tons of
                  capability without complexity.{' '}
                </p>
                <p className={styles.aboutBlock__desk}>
                  An unprecedented leap in battery life. And a mind‑blowing chip
                  that doubles down on machine learning and pushes the
                  boundaries of what a smartphone can do. Welcome to the first
                  iPhone powerful enough to be called Pro.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.specs}>
            <h2 className={styles.specs__title}>Tech specs</h2>
            <hr className={styles.divider} />
            <div className={styles.specsWrap}>
              <div className={styles.specsBlock}>
                <h3 className={styles.specsBlock__label}>Screen</h3>
                <p className={styles.specsBlock__value}>6.5” OLED</p>
              </div>
              <div className={styles.specsBlock}>
                <h3 className={styles.specsBlock__label}>Screen</h3>
                <p className={styles.specsBlock__value}>6.5” OLED</p>
              </div>
              <div className={styles.specsBlock}>
                <h3 className={styles.specsBlock__label}>Screen</h3>
                <p className={styles.specsBlock__value}>6.5” OLED</p>
              </div>
              <div className={styles.specsBlock}>
                <h3 className={styles.specsBlock__label}>Screen</h3>
                <p className={styles.specsBlock__value}>6.5” OLED</p>
              </div>
              <div className={styles.specsBlock}>
                <h3 className={styles.specsBlock__label}>Screen</h3>
                <p className={styles.specsBlock__value}>6.5” OLED</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.new}>
          <div className={styles.new__topblock}>
            <h1 className={styles.new__title}>You may also like</h1>
            <div className={styles.new__divider}>
              <button
                onClick={() => newSwiper?.slidePrev()}
                className={styles.new__btn}
              >
                ‹
              </button>
              <button
                onClick={() => newSwiper?.slideNext()}
                className={styles.new__btn}
              >
                ›
              </button>
            </div>
          </div>
          <div className={styles.new__slider}>
            <Swiper
              modules={[Navigation]}
              onSwiper={setNewSwiper}
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              <SwiperSlide>
                <BrandCard />
              </SwiperSlide>
              <SwiperSlide>
                <BrandCard />
              </SwiperSlide>
              <SwiperSlide>
                <BrandCard />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
