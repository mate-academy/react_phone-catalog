import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { Footer } from '../../components/Footer/Footer';

export const HomePage = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles['title-wrapper']}>
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        </div>

        <div className={styles.content}>
          <section className={`${styles.section} ${styles.hero}`}>
            <div className={styles.container}>
              <button className={styles.buttonPrev}>
                <img src="img/icons/arrow-left.png" alt="Arrow Left" />
              </button>

              <img
                src="img/photos/banner-phones.png"
                alt="Banner-phones"
                className={styles.slider__img}
              />
              <button className={styles.buttonNext}>
                <img src="img/icons/arrow-right.png" alt="Arrow Right" />
              </button>
            </div>

            <div className={styles.pagination}>
              <button
                type="button"
                aria-label="Go to slide 1"
                className={styles.pagination__button}
              ></button>
              <button
                type="button"
                aria-label="Go to slide 2"
                className={styles.pagination__button}
              ></button>
              <button
                type="button"
                aria-label="Go to slide 3"
                className={styles.pagination__button}
              ></button>
            </div>
          </section>

          <section
            className={`${styles.section} ${styles.newPhones} ${styles.slider}`}
          >
            <div className={styles.section__wrapper}>
              <div className={styles.section__header}>
                <h2 className={styles.section__title}>Brand new models</h2>

                <div className={styles.section__buttons}>
                  <button
                    type="button"
                    aria-label="Show previous Brand new models product"
                    className={`${styles.swiper} ${styles.swiper__left}`}
                  >
                    <img src="img/icons/arrow-left.png" alt="Swiper Left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show next Brand new models product"
                    className={`${styles.swiper} ${styles.swiper__right}`}
                  >
                    <img src="img/icons/arrow-right.png" alt="Swiper Right" />
                  </button>
                </div>
              </div>

              <div className={styles.newPhones__product}>
                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      src="img/phones/apple-iphone-14-pro/silver/00.png"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 14 Pro 128GB
                      <br />
                      Silver (MQ023)
                    </a>
                    <div className={styles.productCard__price}>$999</div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.1” OLED
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          128 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          6 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>

                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      src="img/phones/apple-iphone-14-pro/deeppurple/00.png"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 14 Pro 128GB
                      <br />
                      Deep Purple (MQ0G3)
                    </a>
                    <div className={styles.productCard__price}>$999</div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.1” OLED
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          128 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          6 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>

                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      src="img/phones/apple-iphone-14-pro/gold/00.png"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 14 Pro 128GB
                      <br />
                      Gold (MQ083)
                    </a>
                    <div className={styles.productCard__price}>$999</div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.1” OLED
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          128 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          6 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>

                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      src="img/phones/apple-iphone-14-plus/00.png"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 14 Plus 128GB
                      <br />
                      Red (MQ513)
                    </a>
                    <div className={styles.productCard__price}>$899</div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.7” OLED
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          128 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          6 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.section__wrapper}>
              <div className={styles.section__header}>
                <h2 className={styles.section__title}>Shop by Category</h2>
              </div>

              <div className={styles.category}>
                <div className={styles.category__item}>
                  <Link to="/phones" className={styles.category__link}>
                    <img
                      src="img/category-phones.png"
                      alt="Phones"
                      className={styles.category__image}
                    />

                    <div className={styles.category__header}>
                      <h3 className={styles.category__title}>Mobile phones</h3>
                      <p className={styles.category__count}>95 models</p>
                    </div>
                  </Link>
                </div>

                <div className={styles.category__item}>
                  <Link to="/tablets" className={styles.category__link}>
                    <img
                      src="img/category-tablets.png"
                      alt="Tablets"
                      className={styles.category__image}
                    />

                    <div className={styles.category__header}>
                      <h3 className={styles.category__title}>Tablets</h3>
                      <p className={styles.category__count}>24 models</p>
                    </div>
                  </Link>
                </div>

                <div className={styles.category__item}>
                  <Link to="/accessories" className={styles.category__link}>
                    <img
                      src="img/category-accessories.png"
                      alt="Accessories"
                      className={styles.category__image}
                    />

                    <div className={styles.category__header}>
                      <h3 className={styles.category__title}>Accessories</h3>
                      <p className={styles.category__count}>100 models</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section
            className={`${styles.section} ${styles.hotPrices} ${styles.slider}`}
          >
            <div className={styles.section__wrapper}>
              <div className={styles.section__header}>
                <h2 className={styles.section__title}>Hot prices</h2>

                <div className={styles.section__buttons}>
                  <button
                    type="button"
                    aria-label="Show previous Hot prices product"
                    className={`${styles.swiper} ${styles.swiper__left}`}
                  >
                    <img src="img/icons/arrow-left.png" alt="Swiper Left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show next Hot prices product"
                    className={`${styles.swiper} ${styles.swiper__right}`}
                  >
                    <img src="img/icons/arrow-right.png" alt="Swiper Right" />
                  </button>
                </div>
              </div>

              <div className={styles.hotPrices__product}>
                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      // eslint-disable-next-line max-len
                      src="img/phones/apple-iphone-11-pro-max/midnightgreen/00.webp"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 11 Pro Max
                      <br />
                      512GB Midnight Green
                      <br />
                      (iMT9G2FS/A)
                    </a>
                    <div className={styles.productCard__price}>
                      $849
                      <span className={styles.productCard__discount}>
                        $1199
                      </span>
                    </div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.5” OLED
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          512 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          6 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>

                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      src="img/phones/apple-iphone-11-pro-max/gold/00.webp"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 11 Pro Max
                      <br />
                      64GB Gold
                      <br />
                      (iMT9G2FS/A)
                    </a>
                    <div className={styles.productCard__price}>
                      $799
                      <span className={styles.productCard__discount}>$999</span>
                    </div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.5” OLED
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          64 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          4 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>

                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      src="img/phones/apple-iphone-11/purple/00.webp"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 11
                      <br />
                      256GB Purple
                      <br />
                      (iMT9G2FS/A)
                    </a>
                    <div className={styles.productCard__price}>
                      $729
                      <span className={styles.productCard__discount}>$859</span>
                    </div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.1” OLED
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          256 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          6 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>

                <article className={styles.productCard}>
                  <a href="" className={styles.productCard__link}>
                    <img
                      src="img/phones/apple-iphone-11/red/00.webp"
                      alt=""
                      className={styles.productCard__img}
                    />
                  </a>

                  <div className={styles.productCard__body}>
                    <a href="" className={styles.productCard__title}>
                      Apple iPhone 11
                      <br />
                      128GB Red
                      <br />
                      (iMT9G2FS/A)
                    </a>
                    <div className={styles.productCard__price}>
                      $699
                      <span className={styles.productCard__discount}>$899</span>
                    </div>
                    <hr className={styles.productCard__divider} />
                    <div className={styles.productCard__description}>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Screen
                        </span>
                        <strong className={styles.productCard__value}>
                          6.1” IPS
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          Capacity
                        </span>
                        <strong className={styles.productCard__value}>
                          128 GB
                        </strong>
                      </div>
                      <div className={styles.productCard__item}>
                        <span className={styles.productCard__property}>
                          RAM
                        </span>
                        <strong className={styles.productCard__value}>
                          4 GB
                        </strong>
                      </div>
                    </div>
                    <div className={styles.productCard__control}>
                      <button className={styles.productCard__addButton}>
                        Add to cart
                      </button>
                      <a href="" className={styles.productCard__favoriteLink}>
                        <img
                          src="img/icons/Vector (Stroke).png"
                          alt="Add to Favourites"
                          className={styles.productCard__favoriteIcon}
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};
