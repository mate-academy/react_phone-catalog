import './styles/main.scss';

export const App = () => (
  <div className="App">
    {/* <h1>Product Catalog</h1> */}
    <header className="header page__header">
      <div className="header__wrap">
        <div className="header__logo">
          <a href="#" className="header__logo-link">
            <img
              src="/img/logo.svg"
              alt="Nice Gadgets"
              className="header__logo-image"
            />
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item header__nav-item--active">
              <a href="#" className="header__nav-link">
                home
              </a>
            </li>
            <li className="header__nav-item">
              <a href="#" className="header__nav-link">
                Phones
              </a>
            </li>
            <li className="header__nav-item">
              <a href="#" className="header__nav-link">
                tablets
              </a>
            </li>
            <li className="header__nav-item">
              <a href="#" className="header__nav-link">
                accessories
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__actions">
        <div className="header__actions-desktop">
          <a href="#" className="header__button" aria-label="Menu">
            <span className="icon icon__like" />
          </a>
          <a href="#" className="header__button" aria-label="Menu">
            <span className="icon icon__cart" />
          </a>
        </div>
        <div className="header__actions-mobile">
          <a href="#menu" className="header__button" aria-label="Menu">
            <span className="icon icon__menu" />
          </a>
        </div>
      </div>
    </header>

    <aside className="menu" id="menu">
      <header className="header">
        <div className="header__wrap">
          <div className="header__logo">
            <a href="#" className="header__logo-link">
              <img
                src="/img/logo.svg"
                alt="Nice Gadgets"
                className="header__logo-image"
              />
            </a>
          </div>
        </div>
        <div className="header__actions">
          <div className="header__actions-mobile">
            <a href="#" className="header__button" aria-label="Close menu">
              <span className="icon icon__close" />
            </a>
          </div>
        </div>
      </header>

      <nav className="menu__nav">
        <ul className="menu__nav-list">
          <li className="menu__nav-item menu__nav-item--active">
            <a href="#" className="menu__nav-link">
              Home
            </a>
          </li>
          <li className="menu__nav-item">
            <a href="#" className="menu__nav-link">
              Phones
            </a>
          </li>
          <li className="menu__nav-item">
            <a href="#" className="menu__nav-link">
              Tablets
            </a>
          </li>
          <li className="menu__nav-item">
            <a href="#" className="menu__nav-link">
              Accessories
            </a>
          </li>
        </ul>
      </nav>

      <div className="menu__footer">
        <a href="#" className="menu__footer-button" aria-label="Favorites">
          <span className="icon icon__like" />
        </a>
        <a href="#" className="menu__footer-button" aria-label="Shopping cart">
          <span className="icon icon__cart" />
        </a>
      </div>
    </aside>

    <main className="main page__main">
      <section className="hero">
        <h1 className="hero__title">Welcome to Nice Gadgets store!</h1>
        <div className="hero section--full-width">
          <div className="picturesSlider">
            <div className="picturesSlider__container">
              <div className="picturesSlider__button">
                <img
                  src="img/icons/arrow-left.svg"
                  alt="Arrow left icon"
                  className="icon"
                />
              </div>
              <div className="picturesSlider__content">
                <div className="picturesSlider__aside">
                  <div>
                    <div>
                      <div className="picturesSlider__aside-title">
                        Now available
                      </div>
                      <span className="picturesSlider__aside-title">
                        in our store!
                        <img
                          src="img/icons/ok-hand.svg"
                          alt="Ok icon"
                          className="picturesSlider__aside-ok"
                        />
                      </span>
                    </div>
                    <div className="picturesSlider__aside-description">
                      Be the first!
                    </div>
                  </div>
                  <a
                    className="picturesSlider__aside-action"
                    href="#/phones/apple-iphone-14-128gb-purple"
                  >
                    Order now
                  </a>
                </div>
                <div className="picturesSlider__container-image">
                  <img
                    src="img/phones/apple-iphone-14/midnight/00.webp"
                    alt="Slide"
                    className="picturesSlider__image"
                  />
                  <img
                    src="img/phones/apple-iphone-14/purple/00.webp"
                    alt="Slide"
                    className={
                      'picturesSlider__image picturesSlider__image--active'
                    }
                  />
                  <img
                    src="img/phones/apple-iphone-14/yellow/00.webp"
                    alt="Slide"
                    className="picturesSlider__image"
                  />
                </div>
              </div>
              <div className="picturesSlider__button">
                <img
                  src="/img/icons/arrow-right.svg"
                  alt="Arrow right icon"
                  className="icon"
                />
              </div>
            </div>
            <div className="picturesSlider__dots">
              <div className="picturesSlider__dot"></div>
              <div className="picturesSlider__dot picturesSlider__dot--active"></div>
              <div className="picturesSlider__dot"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-slider">
        <div className="product-slider__header">
          <h2 className="product-slider__title">Hot prices</h2>
          <div className="product-slider__controls">
            <button className="button-icon" aria-label="Назад">
              <span className="icon icon__arrow-left" />
            </button>
            <button className="button-icon" aria-label="Вперед">
              <span className="icon icon__arrow-right" />
            </button>
          </div>
        </div>

        <div className="product-slider__wrapper">
          <div className="product-slider__list">
            <article className="product-card">
              <a href="#" className="product-card__link">
                <img
                  src="/img/phones/apple-iphone-14/purple/00.webp"
                  alt="Apple iPhone 14 Pro 128GB Silver (MQ023)"
                  className="product-card__image"
                />
                <h3 className="product-card__title">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
              </a>
              <div className="product-card__price">
                <div className="product-card__price-regular">$999</div>
                <div className="product-card__price-sale">$899</div>
              </div>
              <div className="product-card__divider"></div>
              <dl className="product-card__info">
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Screen</dt>
                  <dd className="product-card__info-value">6.16.1" OLEDquot; OLED</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Capacity</dt>
                  <dd className="product-card__info-value">128GB</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">RAM</dt>
                  <dd className="product-card__info-value">6 GB</dd>
                </div>
              </dl>
              <div className="product-card__actions">
                <a
                  type="button"
                  className="button button--selected button--full-width"
                  href="#"
                >
                  Added
                </a>
                <button
                  type="button"
                  className="button-icon button-icon--size-large button-icon--red"
                  aria-label="Add to favorites"
                >
                  <span className="icon icon__like" />
                </button>
              </div>
            </article>
            <article className="product-card">
              <a href="#" className="product-card__link">
                <img
                  src="/img/phones/apple-iphone-14/purple/00.webp"
                  alt="Apple iPhone 14 Pro 128GB Silver (MQ023)"
                  className="product-card__image"
                />
                <h3 className="product-card__title">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
              </a>
              <div className="product-card__price">
                <div className="product-card__price-regular">$999</div>
                <div className="product-card__price-sale">$899</div>
              </div>
              <div className="product-card__divider"></div>
              <dl className="product-card__info">
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Screen</dt>
                  <dd className="product-card__info-value">6.16.1" OLEDquot; OLED</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Capacity</dt>
                  <dd className="product-card__info-value">128GB</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">RAM</dt>
                  <dd className="product-card__info-value">6 GB</dd>
                </div>
              </dl>
              <div className="product-card__actions">
                <a
                  type="button"
                  className="button button--selected button--full-width"
                  href="#"
                >
                  Added
                </a>
                <button
                  type="button"
                  className="button-icon button-icon--size-large button-icon--red"
                  aria-label="Add to favorites"
                >
                  <span className="icon icon__like" />
                </button>
              </div>
            </article>
            <article className="product-card">
              <a href="#" className="product-card__link">
                <img
                  src="/img/phones/apple-iphone-14/purple/00.webp"
                  alt="Apple iPhone 14 Pro 128GB Silver (MQ023)"
                  className="product-card__image"
                />
                <h3 className="product-card__title">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
              </a>
              <div className="product-card__price">
                <div className="product-card__price-regular">$999</div>
                <div className="product-card__price-sale">$899</div>
              </div>
              <div className="product-card__divider"></div>
              <dl className="product-card__info">
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Screen</dt>
                  <dd className="product-card__info-value">6.16.1" OLEDquot; OLED</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Capacity</dt>
                  <dd className="product-card__info-value">128GB</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">RAM</dt>
                  <dd className="product-card__info-value">6 GB</dd>
                </div>
              </dl>
              <div className="product-card__actions">
                <a
                  type="button"
                  className="button button--selected button--full-width"
                  href="#"
                >
                  Added
                </a>
                <button
                  type="button"
                  className="button-icon button-icon--size-large button-icon--red"
                  aria-label="Add to favorites"
                >
                  <span className="icon icon__like" />
                </button>
              </div>
            </article>
            <article className="product-card">
              <a href="#" className="product-card__link">
                <img
                  src="/img/phones/apple-iphone-14/purple/00.webp"
                  alt="Apple iPhone 14 Pro 128GB Silver (MQ023)"
                  className="product-card__image"
                />
                <h3 className="product-card__title">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
              </a>
              <div className="product-card__price">
                <div className="product-card__price-regular">$999</div>
              </div>
              <div className="product-card__divider"></div>
              <dl className="product-card__info">
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Screen</dt>
                  <dd className="product-card__info-value">6.16.1" OLEDquot; OLED</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">Capacity</dt>
                  <dd className="product-card__info-value">128GB</dd>
                </div>
                <div className="product-card__info-row">
                  <dt className="product-card__info-label">RAM</dt>
                  <dd className="product-card__info-value">6 GB</dd>
                </div>
              </dl>
              <div className="product-card__actions">
                <button type="button" className="button button--full-width">
                  Add to cart
                </button>
                <button
                  type="button"
                  className="button-icon button-icon--size-large"
                  aria-label="Add to favorites"
                >
                  <span className="icon icon__like" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="shop-by-category">
        <h2 className="shop-by-category__header section__title">
          Shop by category
        </h2>
        <div className="shop-by-category__list">
          <div className="shop-by-category__item ">
            <div className="shop-by-category__container shop-by-category__container--color-mobile">
              <a href="#" className="shop-by-category__link">
                <img
                  src="/img/category-phones.webp"
                  alt=""
                  className="shop-by-category__item-image"
                />
              </a>
            </div>
            <div className="shop_by_category__footer">
              <div className="shop-by-category__item-title">Mobile phones</div>
              <div className="shop-by-category__item-count">98 models</div>
            </div>
          </div>
          <div className="shop-by-category__item ">
            <div className="shop-by-category__container shop-by-category__container--color-tablet">
              <a href="#" className="shop-by-category__link">
                <img
                  src="/img/category-tablets.webp"
                  alt=""
                  className="shop-by-category__item-image"
                />
              </a>
            </div>
            <div className="shop_by_category__footer">
              <div className="shop-by-category__item-title">Tablets</div>
              <div className="shop-by-category__item-count">24 models</div>
            </div>
          </div>
          <div className="shop-by-category__item ">
            <div className="shop-by-category__container shop-by-category__container--color-accessories">
              <a href="#" className="shop-by-category__link">
                <img
                  src="/img/category-accessories.webp"
                  alt=""
                  className="shop-by-category__item-image"
                />
              </a>
            </div>
            <div className="shop-by-category__footer">
              <div className="shop-by-category__item-title">Accessories</div>
              <div className="shop-by-category__item-count">100 models</div>
            </div>
          </div>
        </div>
      </section>

      <section className="new-models">
        <div className="product-slider">
          <div className="product-slider__header">
            <h2 className="product-slider__title section__title">
              Brand new models
            </h2>
            <div className="product-slider__controls">
              <button className="button-icon" aria-label="Назад">
                <span className="icon icon__arrow-left" />
              </button>
              <button className="button-icon" aria-label="Вперед">
                <span className="icon icon__arrow-right" />
              </button>
            </div>
          </div>
          <div className="product-slider__wrapper">
            <div className="product-slider__list">
              <article className="product-card product-card--in-slider">
                <a href="#" className="product-card__link">
                  <img
                    src="/img/phones/apple-iphone-14/purple/00.webp"
                    alt="Apple iPhone 14 Pro 128GB Silver (MQ023)"
                    className="product-card__image"
                  />
                  <h3 className="product-card__title">
                    Apple iPhone 14 Pro 128GB Silver (MQ023)
                  </h3>
                </a>
                <div className="product-card__price">
                  <div className="product-card__price-regular">$999</div>
                  <div className="product-card__price-sale">$899</div>
                </div>
                <div className="product-card__divider"></div>
                <dl className="product-card__info">
                  <div className="product-card__info-row">
                    <dt className="product-card__info-label">Screen</dt>
                    <dd className="product-card__info-value">6.16.1" OLEDquot; OLED</dd>
                  </div>
                  <div className="product-card__info-row">
                    <dt className="product-card__info-label">Capacity</dt>
                    <dd className="product-card__info-value">128GB</dd>
                  </div>
                  <div className="product-card__info-row">
                    <dt className="product-card__info-label">RAM</dt>
                    <dd className="product-card__info-value">6 GB</dd>
                  </div>
                </dl>
                <div className="product-card__actions">
                  <a
                    type="button"
                    className="button button--full-width"
                    href="#"
                  >
                    Add to cart
                  </a>
                  <button
                    type="button"
                    className="button-icon button-icon--size-large"
                    aria-label="Add to favorites"
                  >
                    <span className="icon icon__like" />
                  </button>
                </div>
              </article>
              <article className="product-card product-card--in-slider">
                <a href="#" className="product-card__link">
                  <img
                    src="/img/phones/apple-iphone-14/purple/00.webp"
                    alt="Apple iPhone 14 Pro 128GB Silver (MQ023)"
                    className="product-card__image"
                  />
                  <h3 className="product-card__title">
                    Apple iPhone 14 Pro 128GB Silver (MQ023)
                  </h3>
                </a>
                <div className="product-card__price">
                  <div className="product-card__price-regular">$999</div>
                </div>
                <div className="product-card__divider"></div>
                <dl className="product-card__info">
                  <div className="product-card__info-row">
                    <dt className="product-card__info-label">Screen</dt>
                    <dd className="product-card__info-value">6.16.1" OLEDquot; OLED</dd>
                  </div>
                  <div className="product-card__info-row">
                    <dt className="product-card__info-label">Capacity</dt>
                    <dd className="product-card__info-value">128GB</dd>
                  </div>
                  <div className="product-card__info-row">
                    <dt className="product-card__info-label">RAM</dt>
                    <dd className="product-card__info-value">6 GB</dd>
                  </div>
                </dl>
                <div className="product-card__actions">
                  <button type="button" className="button  button--full-width">
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="button-icon button-icon--size-large"
                    aria-label="Add to favorites"
                  >
                    <span className="icon icon__like" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section footer__section--logo">
          <img src="/img/logo.svg" alt="logo" className="footer__logo" />
        </div>

        <nav className="footer__section footer__section--nav">
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <a href="#" className="footer__nav-link">
                Github
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="#" className="footer__nav-link">
                Contacts
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="#" className="footer__nav-link">
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__section footer__section--back">
          <a href="#top" className="footer__back-link">
            Back to top
          </a>
          <button
            className="footer__back-button button-icon"
            aria-label="Back to top"
          >
            <span className="icon icon__arrow-up" />
          </button>
        </div>
      </div>
    </footer>
  </div>
);
