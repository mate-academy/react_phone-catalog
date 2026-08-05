import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  getProductById,
  getProducts,
  getSuggestedProducts,
} from '../../api/products';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

import arrowDownIcon from '../../assets/icons/arrow-down.svg';
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';
import heartIcon from '../../assets/icons/heart-icon.svg';
import homeIcon from '../../assets/icons/home-button.svg';
import likeIcon from '../../assets/icons/like-button.svg';

import styles from './ProductDetailsPage.module.scss';

const normalizeColor = (color: string) => {
  return color.toLowerCase().replace(/\s+/g, '-');
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();

  const navigate = useNavigate();

  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShop();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null);

  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [selectedImage, setSelectedImage] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    Promise.all([
      getProductById(productId),
      getProducts(),
      getSuggestedProducts(productId),
    ])
      .then(([details, products, suggested]) => {
        if (!details) {
          setProduct(null);

          return;
        }

        setProduct(details);

        setCatalogProduct(
          products.find(item => item.itemId === details.id) || null,
        );

        setSuggestedProducts(suggested);

        setSelectedImage(details.images[0] || '');
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  const added = useMemo(() => {
    return catalogProduct ? isInCart(catalogProduct.itemId) : false;
  }, [catalogProduct, isInCart]);

  const favorite = useMemo(() => {
    return catalogProduct ? isFavorite(catalogProduct.itemId) : false;
  }, [catalogProduct, isFavorite]);

  if (isLoading) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <Loader />
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.notFound}>Something went wrong</h1>

          <button
            type="button"
            className={styles.backLink}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </section>
    );
  }

  if (!product || !catalogProduct) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.notFound}>Product was not found</h1>

          <Link to="/" className={styles.backLink}>
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (added) {
      return;
    }

    addToCart(catalogProduct);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(catalogProduct);
  };

  const handleColorChange = (color: string) => {
    const nextProductId = [
      product.namespaceId,
      product.capacity.toLowerCase(),
      normalizeColor(color),
    ].join('-');

    navigate(`/product/${nextProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    const nextProductId = [
      product.namespaceId,
      capacity.toLowerCase(),
      normalizeColor(product.color),
    ].join('-');

    navigate(`/product/${nextProductId}`);
  };

  const categoryTitle =
    product.category === 'phones'
      ? 'Phones'
      : product.category === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.homeLink} aria-label="Home">
            <img src={homeIcon} alt="" className={styles.homeIcon} />
          </Link>

          <img src={arrowDownIcon} alt="" className={styles.breadcrumbArrow} />

          <Link to={`/${product.category}`} className={styles.categoryLink}>
            {categoryTitle}
          </Link>

          <img src={arrowDownIcon} alt="" className={styles.breadcrumbArrow} />

          <span className={styles.current}>{product.name}</span>
        </nav>

        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          <img src={arrowLeftIcon} alt="" className={styles.backIcon} />

          <span>Back</span>
        </button>

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.product}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={classNames(styles.thumbnailButton, {
                    [styles.thumbnailButtonActive]: selectedImage === image,
                  })}
                  onClick={() => {
                    setSelectedImage(image);
                  }}
                  aria-label={`Show image ${index + 1} of ${product.name}`}
                >
                  <img src={image} alt="" className={styles.thumbnail} />
                </button>
              ))}
            </div>

            <div className={styles.mainImageWrapper}>
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
          </div>

          <div className={styles.info}>
            <fieldset className={styles.options}>
              <legend className={styles.optionLabel}>Available colors</legend>

              <div className={styles.colors}>
                {product.colorsAvailable.map(color => {
                  const isSelected =
                    color.toLowerCase() === product.color.toLowerCase();

                  const inputId = `color-${normalizeColor(color)}`;

                  return (
                    <div key={color} className={styles.colorOption}>
                      <input
                        id={inputId}
                        type="radio"
                        name="product-color"
                        value={color}
                        checked={isSelected}
                        className={styles.optionInput}
                        onChange={() => {
                          handleColorChange(color);
                        }}
                      />

                      <label
                        htmlFor={inputId}
                        className={classNames(styles.colorButton, {
                          [styles.colorButtonActive]: isSelected,
                        })}
                        title={color}
                        aria-label={`Choose ${color} color`}
                      >
                        <span
                          className={styles.color}
                          style={{
                            backgroundColor: color.replace(/\s+/g, ''),
                          }}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.divider} />

            <fieldset className={styles.options}>
              <legend className={styles.optionLabel}>Select capacity</legend>

              <div className={styles.capacities}>
                {product.capacityAvailable.map(capacity => {
                  const isSelected =
                    capacity.toLowerCase() === product.capacity.toLowerCase();

                  const inputId = `capacity-${capacity.toLowerCase()}`;

                  return (
                    <div key={capacity} className={styles.capacityOption}>
                      <input
                        id={inputId}
                        type="radio"
                        name="product-capacity"
                        value={capacity}
                        checked={isSelected}
                        className={styles.optionInput}
                        onChange={() => {
                          handleCapacityChange(capacity);
                        }}
                      />

                      <label
                        htmlFor={inputId}
                        className={classNames(styles.capacityButton, {
                          [styles.capacityButtonActive]: isSelected,
                        })}
                      >
                        {capacity}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.divider} />

            <div className={styles.prices}>
              <span className={styles.price}>${product.priceDiscount}</span>

              {product.priceRegular > product.priceDiscount && (
                <span className={styles.fullPrice}>
                  ${product.priceRegular}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={classNames(styles.cartButton, {
                  [styles.cartButtonAdded]: added,
                })}
                disabled={added}
                onClick={handleAddToCart}
              >
                {added ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={classNames(styles.favoriteButton, {
                  [styles.favoriteButtonActive]: favorite,
                })}
                onClick={handleToggleFavorite}
                aria-label={
                  favorite
                    ? `Remove ${product.name} from favorites`
                    : `Add ${product.name} to favorites`
                }
              >
                <img
                  src={favorite ? likeIcon : heartIcon}
                  alt=""
                  className={styles.favoriteIcon}
                />
              </button>
            </div>

            <dl className={styles.specs}>
              <div className={styles.spec}>
                <dt>Screen</dt>
                <dd>{product.screen}</dd>
              </div>

              <div className={styles.spec}>
                <dt>Resolution</dt>
                <dd>{product.resolution}</dd>
              </div>

              <div className={styles.spec}>
                <dt>Processor</dt>
                <dd>{product.processor}</dd>
              </div>

              <div className={styles.spec}>
                <dt>RAM</dt>
                <dd>{product.ram}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={styles.description}>
          <section className={styles.about}>
            <h2 className={styles.sectionTitle}>About</h2>

            <div className={styles.sectionDivider} />

            {product.description.map(descriptionSection => (
              <article
                key={descriptionSection.title}
                className={styles.article}
              >
                <h3 className={styles.articleTitle}>
                  {descriptionSection.title}
                </h3>

                {descriptionSection.text.map(paragraph => (
                  <p key={paragraph} className={styles.text}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </section>

          <section className={styles.techSpecs}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>

            <div className={styles.sectionDivider} />

            <dl className={styles.techList}>
              <div className={styles.techItem}>
                <dt>Screen</dt>
                <dd>{product.screen}</dd>
              </div>

              <div className={styles.techItem}>
                <dt>Resolution</dt>
                <dd>{product.resolution}</dd>
              </div>

              <div className={styles.techItem}>
                <dt>Processor</dt>
                <dd>{product.processor}</dd>
              </div>

              <div className={styles.techItem}>
                <dt>RAM</dt>
                <dd>{product.ram}</dd>
              </div>

              <div className={styles.techItem}>
                <dt>Built in memory</dt>
                <dd>{product.capacity}</dd>
              </div>

              {product.camera && (
                <div className={styles.techItem}>
                  <dt>Camera</dt>
                  <dd>{product.camera}</dd>
                </div>
              )}

              {product.zoom && (
                <div className={styles.techItem}>
                  <dt>Zoom</dt>
                  <dd>{product.zoom}</dd>
                </div>
              )}

              <div className={styles.techItem}>
                <dt>Cell</dt>
                <dd>{product.cell.join(', ')}</dd>
              </div>
            </dl>
          </section>
        </div>

        {suggestedProducts.length > 0 && (
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        )}
      </div>
    </section>
  );
};
