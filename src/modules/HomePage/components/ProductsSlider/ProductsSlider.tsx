import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ProductsSlider.module.scss';
import { Products } from '../../../shared/types/Products';
import { getProductsPerSlide } from '../../../shared/utils/variables';

interface ProductsSliderProps {
  phones: Products[];
  isShowDiscount?: boolean;
}

const toggleFunction = (
  productsId: Products['id'],
  state: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  state(currentIds => {
    if (currentIds.includes(productsId)) {
      return currentIds.filter(current => current !== productsId);
    } else {
      return [...currentIds, productsId];
    }
  });
};

export const ProductsSlider = ({
  phones,
  isShowDiscount = false,
}: ProductsSliderProps) => {
  const [slideCount, setSlideCount] = useState(0);

  const [addedPhone, setAddedPhone] = useState<Products['id'][]>(() => {
    const savedPhones = localStorage.getItem('addedProduct');

    return savedPhones ? JSON.parse(savedPhones) : [];
  });
  const [favIconsId, setFavIconsId] = useState<Products['id'][]>(() => {
    const savedIcons = localStorage.getItem('favouriteProduct');

    return savedIcons ? JSON.parse(savedIcons) : [];
  });

  const [productsPerSlide, setProductsPerSlide] = useState(getProductsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lastSlideIndex = Math.max(
    0,
    Math.ceil(phones.length / productsPerSlide) - 1,
  );

  const countStart = slideCount * productsPerSlide;
  const countEnd = countStart + productsPerSlide;

  const slidedPhones = phones.slice(countStart, countEnd);

  useEffect(() => {
    localStorage.setItem('favouriteProduct', JSON.stringify(favIconsId));
  }, [favIconsId]);

  useEffect(() => {
    localStorage.setItem('addedProduct', JSON.stringify(addedPhone));
  }, [addedPhone]);

  return (
    <div className={styles.brandSlider}>
      <div className={styles.sliderInfo}>
        <h2 className={styles.sliderInfoTitle}>Brand new models</h2>
        <div className={styles.sliderNav}>
          <button
            type="button"
            className={classNames('icons', styles.scroll)}
            disabled={slideCount === 0}
            aria-label="Previous slide"
            onClick={() => setSlideCount(count => count - 1)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowLeft.svg`}
              alt=""
              className="arrow"
            />
          </button>

          <button
            type="button"
            className={classNames('icons', styles.scroll)}
            disabled={slideCount >= lastSlideIndex}
            aria-label="Next slide"
            onClick={() => setSlideCount(count => count + 1)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowRight.svg`}
              alt=""
              className="arrow"
            />
          </button>
        </div>
      </div>

      <div className={styles.products}>
        {slidedPhones.map(phone => {
          const {
            id,
            name,
            priceRegular,
            priceDiscount,
            screen,
            capacity,
            ram,
            images,
          } = phone;

          const isFavourite = favIconsId.includes(id);

          return (
            <div className={styles.catalog} key={id}>
              <img
                src={images[0]}
                alt="photo"
                className={styles.catalogPhoto}
              />

              <p className={styles.catalogName}>{name}</p>
              <div className={styles.catalogPrice}>
                <p className={styles.catalogCurrentPrice}>
                  ${priceDiscount || priceRegular}
                </p>

                {isShowDiscount && priceDiscount && (
                  <p className={styles.catalogOldPrice}>${priceRegular}</p>
                )}
              </div>

              <div className={styles.catalogSettings}>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <td className={styles.title}>screen</td>
                      <td className={styles.result}>{screen}</td>
                    </tr>
                    <tr>
                      <td className={styles.title}>capacity</td>
                      <td className={styles.result}>{capacity}</td>
                    </tr>
                    <tr>
                      <td className={styles.title}>RAM</td>
                      <td className={styles.result}>{ram}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.catalogButtons}>
                <button
                  className={classNames(styles.button, {
                    [styles.selectedPhone]: addedPhone.includes(id),
                    [styles.buttonsBuy]: !addedPhone.includes(id),
                  })}
                  onClick={() => {
                    toggleFunction(id, setAddedPhone);
                  }}
                >
                  {addedPhone.includes(id) ? 'Selected' : 'Add to card'}
                </button>
                <button
                  className={classNames(
                    styles.button,
                    styles.buttonsLike,
                    'icons',
                  )}
                  onClick={() => {
                    toggleFunction(id, setFavIconsId);
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/img/${isFavourite ? 'likeClicked.svg' : 'like.svg'}`}
                    alt="logo"
                    className="logo"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
