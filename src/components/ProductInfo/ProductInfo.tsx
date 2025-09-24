import React, { useContext } from 'react';
import styles from './ProductInfo.module.scss';
import home from '../../assets/icons/home.svg';
import goto from '../../assets/icons/arrowRight.svg';
import back from '../../assets/icons/arrowLeft.svg';
import heart from '../../assets/icons/heart.svg';
import heartLight from '../../assets/icons/heartLight.svg';
import like from '../../assets/icons/heartRed.svg';
import { useInfoHook } from './useInfoHook';
import { Loader } from '../Loader';
import { ProductSlider } from '../ProductCard';
import { NameSlider } from '../../types/namesSlider';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ThemeContext } from '../Themes';

export const ProductInfo: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { theme } = useContext(ThemeContext);
  const isBasicDark = theme === 'dark';

  const getLikeIcon = (isDark: boolean, isFav: boolean) => {
    if (isDark) {
      return isFav ? like : heart;
    }

    return isFav ? like : heartLight;
  };

  const {
    selectedPhone,
    mainImg,
    loading,
    navigate,
    selectedColor,
    selectedMemory,
    handleColorChange,
    handleMemoryChange,
    handleToggleCart,
    handleToggleFavourite,
    productId,
    setMainImg,
    techInfo,
    error,
    products,
    isFav,
    isAdded,
  } = useInfoHook();

  return (
    <main className={styles.productInfo}>
      <div className={styles.productInfolink}>
        <NavLink to="/" className={styles.productInfolink__home}>
          <img src={home} alt="home" />
        </NavLink>
        <span>
          <img src={goto} alt="Goto" />
        </span>
        <NavLink to={`/${category}`} className={styles.productInfolink__title}>
          {category === 'tablets'
            ? 'tablets'
            : category === 'accessories'
              ? 'accessories'
              : 'Mobile'}
        </NavLink>

        {productId && (
          <>
            <span>
              <img src={goto} alt="Goto" />
            </span>
            <p className={styles['productInfolink__title-id']}>{productId}</p>
          </>
        )}
      </div>

      <div className={styles.productInfo__back}>
        <img src={back} alt="Back" onClick={() => navigate(1)} />
        <p
          className={styles.productInfolink__backTitle}
          onClick={() => navigate(1)}
        >
          Back
        </p>
      </div>

      {error && (
        <div className="error__container">
          <p className="error__message">
            Something is wrong... Try again later
          </p>
        </div>
      )}
      {error ? null : loading ? (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      ) : selectedPhone ? (
        <div key={selectedPhone.id}>
          <h2 className={styles.category__title}>{selectedPhone.name}</h2>
          <div className={styles.productInfo__wrapper}>
            <div className={styles.productInfo__wrapperPhone}>
              <div className={styles.Image}>
                {selectedPhone.images &&
                  selectedPhone.images.map((image, index) => (
                    <img
                      className={classNames(styles.productInfo__Image, {
                        [styles.active]: mainImg === image,
                      })}
                      key={index}
                      src={image}
                      alt={`image_${category}_${index}`}
                      onClick={() => setMainImg(image)}
                    />
                  ))}
              </div>

              <div className={styles.Main__Image}>
                <img
                  src={mainImg}
                  alt="image"
                  className={styles.productInfo__mainImage}
                />
              </div>
            </div>
            <div className={styles.productInfo__wrapperDetails}>
              <div className={styles.productInfo__colors}>
                <h3 className={styles.productInfo__contentTitle}>
                  Available colors
                </h3>
                {selectedPhone.colorsAvailable &&
                  selectedPhone.colorsAvailable.map((color, i) => (
                    <button
                      key={i}
                      className={classNames(styles.productInfo__color, {
                        [styles.selected]: selectedColor === color,
                      })}
                      onClick={() => handleColorChange(color)}
                      style={{ background: color }}
                    ></button>
                  ))}
              </div>
              <div className={styles.productInfo__line}></div>

              <div className={styles.productInfo__memory}>
                <h3 className={styles.productInfo__contentTitle}>
                  Select capacity
                </h3>
                {selectedPhone.capacityAvailable &&
                  selectedPhone.capacityAvailable.map((memory, i) => (
                    <button
                      key={i}
                      className={classNames(styles.productInfo__memories, {
                        [styles.selected]: selectedMemory === memory,
                      })}
                      onClick={() => handleMemoryChange(memory)}
                    >
                      {memory}
                    </button>
                  ))}
              </div>
              <div className={styles.productInfo__line}></div>

              <div className={styles.productInfo__price}>
                <h3 className={styles.productInfo__priceNew}>
                  {`$ ${selectedPhone.priceDiscount}`}
                </h3>
                <h3 className={styles.productInfo__priceOld}>
                  {`$ ${selectedPhone.priceRegular}`}
                </h3>
              </div>

              <div className={styles.productInfo__btn}>
                <button
                  className={styles.productInfo__btnCart}
                  onClick={handleToggleCart}
                  style={{
                    backgroundColor: isAdded
                      ? isBasicDark
                        ? '#4A4D58'
                        : '#75767F'
                      : undefined,
                  }}
                >
                  {isAdded ? 'Remove' : 'Add to cart'}
                </button>
                <button
                  className={styles.productInfo__btnLike}
                  onClick={handleToggleFavourite}
                >
                  <img src={getLikeIcon(isBasicDark, isFav)} alt="like" />
                </button>
              </div>

              <div className={styles.productInfo__info}>
                <div className={styles.productInfo__infoAll}>
                  <h3 className={styles.productInfo__screenTitle}>Screen</h3>
                  <h3 className={styles.productInfo__screenDescription}>
                    {selectedPhone.screen}
                  </h3>
                </div>

                <div className={styles.productInfo__infoAll}>
                  <h3 className={styles.productInfo__screenTitle}>Screen</h3>
                  <h3 className={styles.productInfo__screenDescription}>
                    {selectedPhone.resolution}
                  </h3>
                </div>

                <div className={styles.productInfo__infoAll}>
                  <h3 className={styles.productInfo__screenTitle}>Processor</h3>
                  <h3 className={styles.productInfo__screenDescription}>
                    {selectedPhone.processor}
                  </h3>
                </div>

                <div className={styles.productInfo__infoAll}>
                  <h3 className={styles.productInfo__screenTitle}>RAM</h3>
                  <h3 className={styles.productInfo__screenDescription}>
                    {selectedPhone.ram}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.productInfo__wrapperAboutTech}>
            <div className={styles.productInfo__paragraph}>
              <h3 className={styles.productInfo__about}>About</h3>
              <div className={styles.productInfo__line}></div>
              {selectedPhone.description &&
                selectedPhone.description.map((item, index) => (
                  <div className={styles.productInfo__content} key={index}>
                    <h2 className={styles.productInfo__itemTitle}>
                      {item.title}
                    </h2>
                    {item.text.map((paragraph, i) => (
                      <p className={styles.productInfo__description} key={i}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
            </div>

            <div className={styles.productInfo__wrapperTech}>
              <h3 className={styles.productInfo__about}>Tech specs</h3>
              <div className={styles.productInfo__line}></div>

              {techInfo.map((item, index) => (
                <div className={styles.productInfo__techInfoAll} key={index}>
                  <h3 className={styles.productInfo__techScreenTitle}>
                    {item.title}
                  </h3>
                  <h3 className={styles.productInfo__techScreenDescription}>
                    {Array.isArray(item.value)
                      ? item.value.join(', ')
                      : item.value}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ProductSlider
              products={products}
              AdditionalPrice={true}
              title={NameSlider.Like}
            />
          </div>
        </div>
      ) : (
        <div className={styles['not-found']}>
          <h2>Something went wrong...</h2>
          <img
            src="public/img/product-not-found.png"
            alt="not-found"
            className="error__img"
          />
        </div>
      )}
    </main>
  );
};
