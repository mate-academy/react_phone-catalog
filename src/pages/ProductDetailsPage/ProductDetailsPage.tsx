import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './ProductDetailsPage.module.scss';
import { useLanguage } from '../../context/LanguageContext';

import { DescriptionSection } from '../../types/ProductDetails';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getProductDetails,
  getProducts,
  getPhones,
  getTablets,
  getAccessories,
} from '../../utils/api';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getAssetUrl, getColorHex } from '../../utils/helpers';

export const ProductDetailsPage: React.FC = () => {
  const { t } = useLanguage();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [categoryDetails, setCategoryDetails] = useState<ProductDetails[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [mainPhoto, setMainPhoto] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleThumbClick = (img: string) => {
    if (!document.startViewTransition) {
      setMainPhoto(img);

      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setMainPhoto(img);
      });
    });

    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  const handleOpenModal = () => {
    if (!document.startViewTransition) {
      setIsModalOpen(true);

      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsModalOpen(true);
      });
    });

    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  const handleCloseModal = () => {
    if (!document.startViewTransition) {
      setIsModalOpen(false);

      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsModalOpen(false);
      });
    });

    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  useEffect(() => {
    const loadProductData = async () => {
      if (!productId) {
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const data = await getProductDetails(productId);

        if (!data) {
          setError(true);

          return;
        }

        setDetails(data);
        setMainPhoto(data.images[0]);

        const productsList = await getProducts();

        setAllProducts(productsList);

        const catalogItem = productsList.find(p => p.itemId === productId);

        if (catalogItem) {
          setCatalogProduct(catalogItem);
        }

        let detailsList: ProductDetails[] = [];

        if (data.category === 'phones') {
          detailsList = await getPhones();
        } else if (data.category === 'tablets') {
          detailsList = await getTablets();
        } else if (data.category === 'accessories') {
          detailsList = await getAccessories();
        }

        setCategoryDetails(detailsList);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [productId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  useEffect(() => {
    if (loading) {
      document.title = t('productDetails.loadingTitle');
    } else if (error || !details) {
      document.title = t('productDetails.notFoundTitle');
    } else {
      document.title = `${details.name} | Gadgets`;
    }
  }, [loading, error, details, t]);

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div
        className={`${styles.notFound} container`}
        data-testid="product-not-found"
      >
        <h1 className={styles.notFoundTitle}>
          {t('productDetails.errorTitle')}
        </h1>
        <p className={styles.notFoundText}>{t('productDetails.errorText')}</p>
        <Link to="/" className={styles.notFoundBtn}>
          {t('productDetails.backToHome')}
        </Link>
      </div>
    );
  }

  const localizedDescription =
    t(details.id, details.category) !== details.id
      ? (t(details.id, details.category) as DescriptionSection[])
      : details.description;

  const handleVariantClick = (color: string, capacity: string) => {
    let variant = categoryDetails.find(
      item =>
        item.namespaceId === details.namespaceId &&
        item.color.toLowerCase() === color.toLowerCase() &&
        item.capacity.toLowerCase() === capacity.toLowerCase(),
    );

    if (!variant) {
      variant = categoryDetails.find(
        item =>
          item.namespaceId === details.namespaceId &&
          item.capacity.toLowerCase() === capacity.toLowerCase(),
      );
    }

    if (!variant) {
      variant = categoryDetails.find(
        item =>
          item.namespaceId === details.namespaceId &&
          item.color.toLowerCase() === color.toLowerCase(),
      );
    }

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const suggestedProducts = allProducts
    .filter(p => p.category === details.category && p.itemId !== productId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  const inCart = catalogProduct ? isInCart(catalogProduct.itemId) : false;
  const favorited = catalogProduct ? isFavorite(catalogProduct.id) : false;

  const handleAddToCart = () => {
    if (catalogProduct && !inCart) {
      addToCart(catalogProduct);
    }
  };

  const handleToggleFavorite = () => {
    if (catalogProduct) {
      toggleFavorite(catalogProduct);
    }
  };

  return (
    <div className={`${styles.detailsPage} container`}>
      <Breadcrumbs
        category={details.category}
        categoryLabel={t(`categories.${details.category}`)}
        productName={details.name}
      />

      <button
        type="button"
        onClick={() => navigate(`/${details.category}`)}
        className={styles.backBtn}
      >
        <i className="fa-solid fa-chevron-left" />
        <span>{t('productDetails.back')}</span>
      </button>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.mainGrid}>
        <div className={styles.visuals}>
          <div className={styles.thumbs}>
            {details.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.thumbBtn} ${mainPhoto === img ? styles.thumbBtnActive : ''}`}
                onClick={() => handleThumbClick(img)}
              >
                <img
                  src={getAssetUrl(img)}
                  alt={`${details.name} view ${idx + 1}`}
                />
                {mainPhoto === img && (
                  <span className={styles.activeThumbBorder} />
                )}
              </button>
            ))}
          </div>

          <div className={styles.mainPhotoWrapper} onClick={handleOpenModal}>
            <img
              src={getAssetUrl(mainPhoto)}
              alt={details.name}
              style={
                {
                  viewTransitionName: isModalOpen
                    ? 'none'
                    : 'main-details-photo',
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.optionsSection}>
            <span className={styles.sectionTitle}>
              {t('productDetails.availableColors')}
            </span>
            <div className={styles.colorsList}>
              {details.colorsAvailable.map(colorVal => {
                const isActive =
                  details.color.toLowerCase() === colorVal.toLowerCase();

                return (
                  <button
                    key={colorVal}
                    type="button"
                    onClick={() =>
                      handleVariantClick(colorVal, details.capacity)
                    }
                    className={`${styles.colorOption} ${isActive ? styles.colorOptionActive : ''}`}
                    aria-label={`Select color ${colorVal}`}
                    title={colorVal}
                  >
                    <span
                      className={styles.colorCircle}
                      style={{ backgroundColor: getColorHex(colorVal) }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.optionsSection}>
            <span className={styles.sectionTitle}>
              {t('productDetails.selectCapacity')}
            </span>
            <div className={styles.capacityList}>
              {details.capacityAvailable.map(capVal => {
                const isActive =
                  details.capacity.toLowerCase() === capVal.toLowerCase();

                return (
                  <button
                    key={capVal}
                    type="button"
                    onClick={() => handleVariantClick(details.color, capVal)}
                    className={`${styles.capacityOption} ${isActive ? styles.capacityOptionActive : ''}`}
                    aria-label={`Select capacity ${capVal}`}
                  >
                    {capVal}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.priceDiscount}>
              ${details.priceDiscount}
            </span>
            {details.priceDiscount !== details.priceRegular && (
              <span className={styles.priceRegular}>
                ${details.priceRegular}
              </span>
            )}
          </div>

          {catalogProduct && (
            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`${styles.btnCart} ${inCart ? styles.btnCartActive : ''}`}
                title={
                  inCart
                    ? t('productCard.addedToCart')
                    : t('productCard.addToCart')
                }
              >
                {inCart
                  ? t('productCard.addedToCart')
                  : t('productCard.addToCart')}
              </button>

              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`${styles.btnFavorite} ${favorited ? styles.btnFavoriteActive : ''}`}
                aria-label={
                  favorited
                    ? t('productCard.removeFromFavorites')
                    : t('productCard.addToFavorites')
                }
              >
                <i
                  className={
                    favorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                  }
                />
              </button>
            </div>
          )}

          <div className={styles.smallSpecs}>
            <div className={styles.smallSpecRow}>
              <span className={styles.smallSpecLabel}>
                {t('productCard.screen')}
              </span>
              <span className={styles.smallSpecValue}>{details.screen}</span>
            </div>
            <div className={styles.smallSpecRow}>
              <span className={styles.smallSpecLabel}>
                {t('productDetails.resolution')}
              </span>
              <span className={styles.smallSpecValue}>
                {details.resolution}
              </span>
            </div>
            <div className={styles.smallSpecRow}>
              <span className={styles.smallSpecLabel}>
                {t('productDetails.processor')}
              </span>
              <span className={styles.smallSpecValue}>{details.processor}</span>
            </div>
            <div className={styles.smallSpecRow}>
              <span className={styles.smallSpecLabel}>
                {t('productCard.ram')}
              </span>
              <span className={styles.smallSpecValue}>{details.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div>
          <h2 className={styles.aboutTitle}>{t('productDetails.about')}</h2>
          {localizedDescription.map((desc, idx) => (
            <section key={idx} className={styles.aboutSection}>
              <h3 className={styles.aboutSub}>{desc.title}</h3>
              {desc.text.map((paragraph, pIdx) => (
                <p key={pIdx} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div>
          <h2 className={styles.specsTitle}>{t('productDetails.techSpecs')}</h2>
          <div className={styles.specsList}>
            <div className={styles.specRowFull}>
              <span className={styles.specLabelFull}>
                {t('productCard.screen')}
              </span>
              <span className={styles.specValueFull}>{details.screen}</span>
            </div>
            <div className={styles.specRowFull}>
              <span className={styles.specLabelFull}>
                {t('productDetails.resolution')}
              </span>
              <span className={styles.specValueFull}>{details.resolution}</span>
            </div>
            <div className={styles.specRowFull}>
              <span className={styles.specLabelFull}>
                {t('productDetails.processor')}
              </span>
              <span className={styles.specValueFull}>{details.processor}</span>
            </div>
            <div className={styles.specRowFull}>
              <span className={styles.specLabelFull}>
                {t('productCard.ram')}
              </span>
              <span className={styles.specValueFull}>{details.ram}</span>
            </div>

            {details.camera && (
              <div className={styles.specRowFull}>
                <span className={styles.specLabelFull}>
                  {t('productDetails.camera')}
                </span>
                <span className={styles.specValueFull}>{details.camera}</span>
              </div>
            )}

            {details.zoom && (
              <div className={styles.specRowFull}>
                <span className={styles.specLabelFull}>
                  {t('productDetails.zoom')}
                </span>
                <span className={styles.specValueFull}>{details.zoom}</span>
              </div>
            )}

            <div className={styles.specRowFull}>
              <span className={styles.specLabelFull}>
                {t('productDetails.cell')}
              </span>
              <span className={styles.specValueFull}>
                {details.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div style={{ marginTop: '80px' }}>
          <ProductsSlider
            products={suggestedProducts}
            title={t('productDetails.youMayLike')}
          />
        </div>
      )}

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={handleCloseModal}
          data-testid="photo-modal"
        >
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={e => {
              e.stopPropagation();
              handleCloseModal();
            }}
            aria-label={t('productDetails.closeZoom')}
          >
            <i className="fa-solid fa-xmark" />
          </button>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={getAssetUrl(mainPhoto)}
              alt={details.name}
              className={styles.modalImage}
              style={
                {
                  viewTransitionName: 'main-details-photo',
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
