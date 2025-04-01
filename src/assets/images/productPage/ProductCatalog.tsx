import styles from './ProductCatalog.module.scss';

export const ProductCatalog = () => {
  return (
    <section className={styles.product}>
      <div className={styles.product__sortSelectors}>
        <div className={styles.product__sortBy}>
          <p className={styles.product__sortByTitle}>Sort by</p>
          <button className={styles.product__sortButton}>
            Newest
            <span className={styles.product__arrow}></span>
          </button>

          <div
            className={styles.product__dropdownMenu}
            aria-labelledby="dropdownMenuButton"
            style={{ display: 'none' }}
          >
            <a className={styles.product__dropdownItem} href="#">
              Action
            </a>
            <a className={styles.product__dropdownItem} href="#">
              Action
            </a>
            <a className={styles.product__dropdownItem} href="#">
              Action
            </a>
          </div>
        </div>
        <div className={styles.product__itemsPerPage}>
          <p className={styles.product__sortByTitle}>Items on page</p>
          <button className={styles.product__sortButton}>
            16
            <span className={styles.product__arrow}></span>
          </button>

          <div
            style={{ display: 'none' }}
            className={styles.product__dropdownMenu}
            aria-labelledby="dropdownMenuButton"
          >
            <a className={styles.product__dropdownItem} href="#">
              Action
            </a>
            <a className={styles.product__dropdownItem} href="#">
              Action
            </a>
            <a className={styles.product__dropdownItem} href="#">
              Action
            </a>
          </div>
        </div>
      </div>

      <div className={styles.product__cards}>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.product__cards__product}>
          <img
            loading="lazy"
            className={styles.product__cards__mainImage}
            src="src/assets/images/productsSlider/products-phone.png"
            alt=""
          />
          <p className={styles.product__cards__description}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
          <p className={styles.product__cards__price}>$999</p>
          <span className={styles.product__cards__line}></span>
          <div className={styles.product__cards__featureWrapper}>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Screen</p>
              <p className={styles.product__cards__featureValue}>6.1” OLED</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>Capacity</p>
              <p className={styles.product__cards__featureValue}>128 GB</p>
            </div>
            <div className={styles.product__cards__feature}>
              <p className={styles.product__cards__featureTitle}>RAM</p>
              <p className={styles.product__cards__featureValue}>6 GB</p>
            </div>
          </div>
          <div className={styles.product__cards__buttons}>
            <button className={styles.product__cards__add}>Add to cart</button>
            <button className={styles.product__cards__favorites}>
              <img
                loading="lazy"
                src="src/assets/images/productsSlider/favorites-icon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.product__pagination}>
        <button className={styles.product__LeftBtn}>
          <img src="" alt="" className={styles.product__LeftBtnImg} />
        </button>
        <div className={styles.product__paginationNums}>123</div>
        <button className={styles.product__LeftBtnImg}>43</button>
      </div>
    </section>
  );
};
