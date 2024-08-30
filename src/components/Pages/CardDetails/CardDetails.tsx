import styles from './CardDetails.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../shared/GlobalContext/GlobalContext';
import { fetchProductByIdFromApi } from '../../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductInfo } from '../../../type/ProductInfo';
import { Category } from '../../../type/Category';
import { ImageSlider } from './components/DetailsSlider/DetailsSlider';
import { Feature } from './components/Feature/Feature';
import classNames from 'classnames';
import { About } from './components/About/About';
import { TechSpecs } from './components/TechSpecs/TechSpecs';
import { Sliders } from '../../shared/Slider';
import { SliderTitle } from '../../../type/SliderTitle';
import { Product } from '../../../type/Product';
import { Loader } from '../../shared/Loader/Loader';
// eslint-disable-next-line max-len
import { ProductNotFoundeProduct } from '../../shared/ProductNotFoundProduct/ProductNotFoundProduct';

export const CardDetails = () => {
  const {
    currentCategory,
    isSunSelected,
    products,
    setIsLoading,
    isLoading,
    setIsErrors,
    isErrors,
  } = useContext(GlobalContext);
  const [currentCard, setCurrentCard] = useState<ProductInfo | null>(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const { itemId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsErrors(false);
    if (itemId && currentCategory) {
      fetchProductByIdFromApi(itemId, currentCategory as Category)
        .then(product => {
          if (!product) {
            throw new Error('Product not found');
          }

          setCurrentCard(product);
        })
        .catch(() => {
          setIsErrors(true);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  }, [currentCategory, itemId, setIsErrors, setIsLoading]);

  const images = currentCard?.images || [];

  const selectLikedEveryThird = (product: Product[]) => {
    const selectedProduct = [];

    if (currentCard) {
      const filteredProducts = product
        .filter(good => Math.abs(good.price - currentCard.priceDiscount) <= 200)
        .slice(0, 12);

      selectedProduct.push(...filteredProducts);
    }

    return selectedProduct;
  };

  const selectedLikedPhones = useMemo(
    () =>
      selectLikedEveryThird(
        products.filter(product => product.category === currentCategory),
      ),
    [products, currentCard],
  );

  return (
    <section className={styles.details}>
      <button className={styles.button__back} onClick={handleBackClick}>
        <div
          className={classNames(styles.button__back_img, {
            [styles.button__back_img_dark]: !isSunSelected,
          })}
        ></div>
        <p className={styles.button__back_text}>Back</p>
      </button>

      {isLoading && <Loader />}

      {!isLoading && isErrors && <ProductNotFoundeProduct />}

      {!isLoading && !isErrors && currentCard && (
        <>
          <h2
            className={classNames(styles.details__name, {
              [styles.details__name_dark]: !isSunSelected,
            })}
          >
            {currentCard.name}
          </h2>
          <div className={styles.details__container_first}>
            <ImageSlider images={images} />

            <Feature currentCard={currentCard} />
          </div>
          <div className={styles.details__container_second}>
            <About currentCard={currentCard} />
            <TechSpecs currentCard={currentCard} />
          </div>

          <div className={styles.sliders}>
            <Sliders
              titleName={SliderTitle.alsoLike}
              products={selectedLikedPhones}
            />
          </div>
        </>
      )}
    </section>
  );
};
