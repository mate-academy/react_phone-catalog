import { Product } from '../../types/Product';
import { ColorSelection } from '../ColorSelection';
import ProductImagesSwiper from '../ProductImagesSwiper/ProductImagesSwiper';
import styles from './ProductDetailsCard.module.scss';
import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { CapacitySelection } from '../CapacitySelection';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addFavorite, removeFavorite } from '../../features/favoritesSlice';
import { addItemToCart, removeItemFromCart } from '../../features/cartSlice';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import heartLight from '../../images/icon-heart-light-theme.svg';
import heartDark from '../../images/icon-heart-dark-theme.svg';
import favFilledHeart from '../../images/icon-filled-heart-fav-red.svg';

type Props = {
  products: Product[];
  selectedProduct?: ProductDetails;
};

export const ProductDetailsCard: React.FC<Props> = ({
  selectedProduct,
  products,
}) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { favoriteProducts } = useAppSelector(state => state.favorites);
  const { cartProducts } = useAppSelector(state => state.cart);
  const { theme } = useAppSelector(state => state.theme);
  const location = useLocation();

  const { t } = useTranslation();
  const { productId = '' } = useParams();
  const id = productId.slice(1);

  const handleCartDetails = (prodId: string) => {
    const index = products.findIndex(item => item.itemId === prodId);

    if (index === -1) {
      return;
    }

    const product = products[index];

    if (cartProducts.some(item => item.itemId === prodId)) {
      dispatch(removeItemFromCart(product.id));

      toast(t('productCard.toast.removed', { name: product.name }), {
        icon: '🛒',
      });
    } else {
      dispatch(addItemToCart(product));
      toast.success(t('productCard.toast.added', { name: product.name }));
    }
  };

  const handleFavoritesDetails = (prodId: string) => {
    const index = products.findIndex(item => item.itemId === prodId);

    if (index === -1) {
      return;
    }

    const product = products[index];

    if (favoriteProducts.some(item => item.itemId === prodId)) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      setLoading(false);
    }
  }, [selectedProduct]);

  if (loading) {
    return <Loader />;
  }

  const isFavorite = favoriteProducts.some(item => item.itemId === id);
  const isInCart = cartProducts.some(prod => prod.itemId === id);

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.swiper}>
          <ProductImagesSwiper selectedProduct={selectedProduct} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.colorIdSection}>
            <ColorSelection
              selectedProduct={selectedProduct}
              products={products}
            />
            <span className={styles.line}></span>
          </div>

          <div className={styles.capacitySection}>
            <CapacitySelection
              selectedProduct={selectedProduct}
              products={products}
            />
            <span className={styles.lineCapacity}></span>
          </div>

          <div className={styles.priceBtnsInfo}>
            <div className={styles.price}>
              <p
                className={styles.currentPrice}
              >{`$${selectedProduct?.priceRegular}`}</p>
              <p className={styles.fullPrice}>
                {`$${selectedProduct?.priceDiscount}`}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 10"
                  className={styles.fullPrice__curvyLine}
                >
                  <path
                    d="M0 8 Q 50 -10, 100 8"
                    stroke="#89939a"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeWidth="3.5"
                  />
                </svg>
              </p>
            </div>

            <div className={styles.btns}>
              <button
                className={classNames(styles.cartBtn, {
                  [styles['cartBtn--active']]: isInCart,
                })}
                onClick={() => handleCartDetails(id)}
              >
                {isInCart
                  ? t('productCard.button.added')
                  : t('productCard.button.add')}
              </button>

              <button
                className={classNames(styles.favBtn, {
                  [styles['favBtn--active']]: isFavorite,
                })}
                onClick={() => handleFavoritesDetails(id)}
              >
                <img
                  src={
                    isFavorite
                      ? favFilledHeart
                      : theme === 'light'
                        ? heartLight
                        : heartDark
                  }
                  alt="Favorites"
                  className={styles.favImg}
                />
              </button>
            </div>

            <div className={styles.info}>
              <div className={styles.infoBlock}>
                <div className={styles.title}>
                  {t('productDetailsPage.screen')}
                </div>
                <div className={styles.value}>{selectedProduct?.screen}</div>
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.title}>
                  {t('productDetailsPage.resolution')}
                </div>
                <div className={styles.value}>
                  {selectedProduct?.resolution}
                </div>
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.title}>
                  {t('productDetailsPage.processor')}
                </div>
                <div className={styles.value}>{selectedProduct?.processor}</div>
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.title}>
                  {t('productDetailsPage.ram')}
                </div>
                <div className={styles.value}>{selectedProduct?.ram}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productDetails}>
        <div className={styles.about}>
          <div className={styles.mainTitle}>
            {t('productDetailsPage.about')}
          </div>
          <span className={styles.lineAbout}></span>

          <div className={styles.contentAbout}>
            {selectedProduct?.description.map(item => (
              <article className={styles.article} key={item.title}>
                <h4 className={styles.title}>{item.title}</h4>
                <p className={styles.text}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.specs}>
          <div className={styles.mainTitle}>
            {t('productDetailsPage.techSpecs')}
          </div>
          <span className={styles.lineSpecs}></span>

          <div className={styles.contentSpecs}>
            <div className={styles.specsBlock}>
              <div className={styles.title}>
                {t('productDetailsPage.screen')}
              </div>
              <div className={styles.value}>{selectedProduct?.screen}</div>
            </div>

            <div className={styles.specsBlock}>
              <div className={styles.title}>
                {t('productDetailsPage.resolution')}
              </div>
              <div className={styles.value}>{selectedProduct?.resolution}</div>
            </div>

            <div className={styles.specsBlock}>
              <div className={styles.title}>
                {t('productDetailsPage.processor')}
              </div>
              <div className={styles.value}>{selectedProduct?.processor}</div>
            </div>

            <div className={styles.specsBlock}>
              <div className={styles.title}>{t('productDetailsPage.ram')}</div>
              <div className={styles.value}>{selectedProduct?.ram}</div>
            </div>

            <div className={styles.specsBlock}>
              <div className={styles.title}>
                {t('productDetailsPage.builtInMemory')}
              </div>
              <div className={styles.value}>{selectedProduct?.capacity}</div>
            </div>

            {selectedProduct?.camera && (
              <div className={styles.specsBlock}>
                <div className={styles.title}>
                  {t('productDetailsPage.camera')}
                </div>
                <div className={styles.value}>{selectedProduct?.camera}</div>
              </div>
            )}

            {selectedProduct?.zoom && (
              <div className={styles.specsBlock}>
                <div className={styles.title}>
                  {t('productDetailsPage.zoom')}
                </div>
                <div className={styles.value}>{selectedProduct?.zoom}</div>
              </div>
            )}

            <div className={styles.specsBlock}>
              <div className={styles.title}>{t('productDetailsPage.cell')}</div>
              <div className={styles.value}>
                {selectedProduct?.cell.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
