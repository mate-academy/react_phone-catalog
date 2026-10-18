import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { getProductDetails } from '../../../../api/details';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { getColorCode } from '../../../../utils/color';
import { getProductVariant } from '../../../../utils/details';
import { useProductsContext } from '../../../../hook/useProductsContext';
import { Loader } from '../../../shared/components/Loader/Loader';
import { DetailsProduct } from '../../../../types/DetailsProduct';
import { Product } from '../../../../types/Product';
import { getSuggestedProducts } from '../../../../api/products';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const {
    cartProducts,
    favouriteProducts,
    addToCart,
    toggleFavourite,
    isLoading,
    products,
  } = useProductsContext();

  const [product, setProduct] = useState<DetailsProduct | undefined>(undefined);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);

  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const currentProduct = products.find(item => item.itemId === product?.id);

  const isAddedCart = cartProducts.some(
    cartProduct => cartProduct.product.id === currentProduct?.id,
  );

  const isAddedFavourite = favouriteProducts.some(
    favouriteProduct => favouriteProduct.id === currentProduct?.id,
  );

  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product?.capacity);

  async function handleColorChange(color: string) {
    if (!product || !selectedCapacity) {
      return;
    }

    const variant = await getProductVariant(
      product.namespaceId,
      color,
      selectedCapacity,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  }

  async function handleCapacityChange(capacity: string) {
    if (!product || !selectedColor) {
      return;
    }

    const variant = await getProductVariant(
      product.namespaceId,
      selectedColor,
      capacity,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  }

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsDetailsLoading(true);

    getProductDetails(productId)
      .then(response => setProduct(response))
      .finally(() => setIsDetailsLoading(false));
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectedImage(product.images[0]);
    setSelectedColor(product.color);
    setSelectedCapacity(product.capacity);
  }, [product]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    getSuggestedProducts(productId).then(response =>
      setSuggestedProducts(response),
    );
  }, [productId]);

  return isLoading || isDetailsLoading ? (
    <Loader />
  ) : (
    <div className={`${styles.details} container`}>
      {!product ? (
        <p>Product was not found</p>
      ) : (
        <>
          <div className={styles.breadcrumbs}>
            <ul className={styles.breadcrumbs__list}>
              <li className={styles.breadcrumbs__item}>
                <Link to="/" className={styles.breadcrumbs__link}>
                  <img
                    src="./img/home.png"
                    alt=""
                    className={styles.breadcrumbs__img}
                  />
                </Link>
              </li>

              <li className={styles.breadcrumbs__item}>
                <img
                  src="./img/arrRight.png"
                  alt=""
                  className={styles.breadcrumbs__icon}
                />
              </li>

              <li className={styles.breadcrumbs__item}>
                <Link
                  to={`/${product.category}`}
                  className={styles.breadcrumbs__category}
                >
                  {product.category}
                </Link>
              </li>

              <li className={styles.breadcrumbs__item}>
                <img
                  src="./img/arrRight.png"
                  alt=""
                  className={styles.breadcrumbs__icon}
                />
              </li>

              <li className={styles.breadcrumbs__item}>
                <span className={styles.breadcrumbs__name}>{product.name}</span>
              </li>
            </ul>
          </div>

          <div className={styles['back-to__prev-page']}>
            <button
              className={styles['back-to__prev-button']}
              onClick={() => navigate(-1)}
            >
              <img
                src="./img/arrLeft.png"
                alt=""
                className={styles['back-to__prev-icon']}
              />
              Back
            </button>
          </div>

          <h1 className={styles.details__title}>{product.name}</h1>

          <div className={styles.details__main}>
            <div className={styles.details__gallery}>
              <div className={styles.details__images}>
                <ul className={styles['details__images-list']}>
                  {product.images.map(image => (
                    <li key={image} className={styles['details__images-item']}>
                      <button
                        type="button"
                        className={`${styles['details__images-button']} ${
                          selectedImage === image
                            ? styles['details__images-button--active']
                            : ''
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt=""
                          className={styles['details__images-img']}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles['details__main-image']}>
                <img
                  src={selectedImage}
                  alt=""
                  className={styles['details__main-img']}
                />
              </div>
            </div>

            <div className={styles.details__info}>
              <div className={styles.details__colors}>
                <p className={styles['details__colors-title']}>
                  Available colors
                </p>

                <ul className={styles['details__colors-list']}>
                  {product.colorsAvailable.map(color => (
                    <li
                      key={color}
                      className={`${styles['details__colors-item']} ${
                        selectedColor === color
                          ? styles['details__colors-item--active']
                          : ''
                      }`}
                    >
                      <label className={styles['details__color-label']}>
                        <input
                          type="radio"
                          aria-label={color}
                          name="color"
                          value={color}
                          checked={selectedColor === color}
                          className={styles.hidden}
                          onChange={() => handleColorChange(color)}
                        />
                        <span
                          className={`${styles.details__color}`}
                          style={{ backgroundColor: getColorCode(color) }}
                        ></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className={styles.details__line} />

              <div className={styles.details__capacity}>
                <p className={styles['details__capacity-title']}>
                  Select capacity
                </p>

                <ul className={styles['details__capacity-list']}>
                  {product.capacityAvailable.map(capacity => (
                    <li
                      key={capacity}
                      className={`${styles['details__capacity-item']} ${
                        selectedCapacity === capacity
                          ? styles['details__capacity-item--active']
                          : ''
                      }`}
                    >
                      <label className={styles['details__capacity-label']}>
                        <input
                          type="radio"
                          aria-label={capacity}
                          name="capacity"
                          value={capacity}
                          checked={selectedCapacity === capacity}
                          className={styles.hidden}
                          onChange={() => handleCapacityChange(capacity)}
                        />
                        <span className={`${styles['details__capacity-text']}`}>
                          {capacity}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className={styles.details__line} />

              <div className={styles.details__purchase}>
                <div className={styles['details__purchase-prices']}>
                  <p className={styles['details__purchase-price']}>
                    {`$${product.priceDiscount}`}
                  </p>
                  <p className={styles['details__purchase-fullPrice']}>
                    {`$${product.priceRegular}`}
                  </p>
                </div>

                <div className={styles['details__purchase-actions']}>
                  <button
                    className={`${
                      isAddedCart
                        ? styles['details__purchase-action-btn--active']
                        : styles['details__purchase-action-btn']
                    }`}
                    onClick={() => currentProduct && addToCart(currentProduct)}
                  >
                    {isAddedCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <button
                    className={`${styles['details__purchase-action-btn-favourite']} ${
                      isAddedFavourite &&
                      styles['details__purchase-action-btn-favourite--active']
                    }`}
                    onClick={() =>
                      currentProduct && toggleFavourite(currentProduct)
                    }
                  >
                    <img
                      src={
                        isAddedFavourite
                          ? './img/favourites-active.png'
                          : './img/favourites.png'
                      }
                      alt=""
                      className={styles['details__purchase-action-img']}
                    />
                  </button>
                </div>
              </div>

              <div className={styles.details__summary}>
                <div className={styles['details__summary-row']}>
                  <p className={styles['details__summary-label']}>Screen</p>
                  <p className={styles['details__summary-value']}>
                    {product.screen}
                  </p>
                </div>
                <div className={styles['details__summary-row']}>
                  <p className={styles['details__summary-label']}>Resolution</p>
                  <p className={styles['details__summary-value']}>
                    {product.resolution}
                  </p>
                </div>
                <div className={styles['details__summary-row']}>
                  <p className={styles['details__summary-label']}>Processor</p>
                  <p className={styles['details__summary-value']}>
                    {product.processor}
                  </p>
                </div>
                <div className={styles['details__summary-row']}>
                  <p className={styles['details__summary-label']}>RAM</p>
                  <p className={styles['details__summary-value']}>
                    {product.ram}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles['details__info-id']}>
              <p className={styles['details__info-id-text']}>
                {`ID: ${currentProduct?.id}`}
              </p>
            </div>
          </div>

          <div className={styles['details__additional-info']}>
            <div className={styles.details__about}>
              <h2 className={styles['details__about-title']}>About</h2>

              <hr className={styles.details__line} />

              {product.description.map(describe => (
                <div
                  key={describe.title}
                  className={styles['details__about-section']}
                >
                  <h3 className={styles['details__about-subtitle']}>
                    {describe.title}
                  </h3>

                  {describe.text.map(paragraph => (
                    <p
                      key={paragraph}
                      className={styles['details__about-text']}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.details__tech}>
              <h2 className={styles['details__tech-title']}>Tech specs</h2>

              <hr className={styles.details__line} />

              <div className={styles['details__tech-characteristics']}>
                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>Screen</p>
                  <p className={styles['details__tech-value']}>
                    {product.screen}
                  </p>
                </div>

                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>Resolution</p>
                  <p className={styles['details__tech-value']}>
                    {product.resolution}
                  </p>
                </div>

                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>Processor</p>
                  <p className={styles['details__tech-value']}>
                    {product.processor}
                  </p>
                </div>

                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>RAM</p>
                  <p className={styles['details__tech-value']}>{product.ram}</p>
                </div>

                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>
                    Built in memory
                  </p>
                  <p className={styles['details__tech-value']}>
                    {product.capacity}
                  </p>
                </div>

                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>Camera</p>
                  <p className={styles['details__tech-value']}>
                    {product.camera}
                  </p>
                </div>

                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>Zoom</p>
                  <p className={styles['details__tech-value']}>
                    {product.zoom}
                  </p>
                </div>

                <div className={styles['details__tech-row']}>
                  <p className={styles['details__tech-label']}>Cell</p>
                  <p className={styles['details__tech-value']}>
                    {product.cell.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ProductsSlider
            products={suggestedProducts}
            title={'You may also like'}
            showFullPrice={true}
          />
        </>
      )}
    </div>
  );
};
