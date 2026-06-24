import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './ProductDetailsPage.module.scss';
import { getProductById, getSuggestedProducts } from '../../services/dataService';
import arrow from '../../assets/images/icons/Chevron (Arrow Left).svg';
import { Product, Products } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../shared/components/Loader/Loader';
import classNames from 'classnames';
import icon from '../../assets/images/icons/Favourites (Heart Like).svg';
import heart from '../../assets/images/icons/Heart.svg';
import errorIcon from '../../../public/img/product-not-found.png';
import { getColorHex } from '../../utils/ColorMap';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useCart, useFavorites } from '../../hooks/ContextHook';
import { normalizeProduct } from '../../utils/normalizeProduct';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { cartItems, toggleCart } = useCart();
  const { favorites, toggleFavorites } = useFavorites();

  const [product, setProduct] = useState<Product>();
  const [suggestedProducts, setSuggestedProducts] = useState<Products[]>([]);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError('');
    getProductById(productId)
      .then((fetchedProduct) => {
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct?.images[0] || '');

        return getSuggestedProducts(fetchedProduct?.category);
      })
      .then((suggested) => setSuggestedProducts(suggested))
      .catch(() => setError('Product was not found'))
      .finally(() => setLoading(false));
  }, [productId]);

  const filterProduct = suggestedProducts.filter((p) => p.itemId !== productId);

  const specsData = [
    { label: 'Screen', value: product?.screen },
    { label: 'Resolution', value: product?.resolution },
    { label: 'Processor', value: product?.processor },
    { label: 'RAM', value: product?.ram },
    { label: 'Built in memory', value: product?.capacity },
    { label: 'Camera', value: product?.camera },
    { label: 'Zoom', value: product?.zoom },
    { label: 'Cell', value: product?.cell?.join(', ') },
  ];

  const generateProductUrl = (namespaceId: string, capacity: string, color: string) => {
    return `/product/${namespaceId}-${capacity.toLowerCase()}-${color.replace(/ /g, '-')}`;
  };

  const isInCart = cartItems.some((item) => item.product.itemId === product?.id);
  const isFavorite = favorites.some((v) => v.product.itemId === product?.id);

  return (
    <div className={s.container}>
      {loading && <Loader />}

      {error && !loading && (
        <div className={s.errorBlock}>
          <span className={s.errorMessage}>{error}</span>
          <img className={s.errorIcon} src={errorIcon} alt="error" />
          <Link to="/" className={s.link}>
            Back to Home Page
          </Link>
        </div>
      )}

      {!loading && !error && product && (
        <div className={s.content}>
          <Breadcrumbs categoryName={product.category} productName={product?.name} />

          <button className={s.backButton} onClick={() => navigate(-1)}>
            <img className={s.backImg} src={arrow} alt="arrow" />
            <span className={s.backLabel}>Back</span>
          </button>

          <h2 className={s.title}>{product.name}</h2>

          <div className={s.headerContent}>
            <div className={s.gallery}>
              <img className={s.mainImage} src={selectedImage} alt="mainImage" />
              <div className={s.galleryWrapper}>
                {product.images.map((item) => (
                  <div
                    key={item}
                    className={classNames(s.thumbImage, { [s.active]: item === selectedImage })}
                    onClick={() => setSelectedImage(item)}
                  >
                    <img className={s.image} src={item} alt="image" />
                  </div>
                ))}
              </div>
            </div>

            <div className={s.techSpecs}>
              <div className={s.availableColor}>
                <span className={s.label}>Available colors</span>
                <div className={s.colorList}>
                  {product.colorsAvailable.map((color) => (
                    <Link
                      to={generateProductUrl(product.namespaceId, product.capacity, color)}
                      key={color}
                      style={{ backgroundColor: getColorHex(color) }}
                      className={classNames(s.colorCircle, { [s.active]: color === product.color })}
                      aria-label={color}
                    ></Link>
                  ))}
                </div>
              </div>

              <div className={s.line}></div>

              <div className={s.capacitySelect}>
                <span className={s.label}>Select capacity</span>
                <div className={s.capacityList}>
                  {product.capacityAvailable.map((capacity) => (
                    <Link
                      key={capacity}
                      to={generateProductUrl(product.namespaceId, capacity, product.color)}
                      className={classNames(s.capacityItem, {
                        [s.active]: capacity === product.capacity,
                      })}
                      aria-label={capacity}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={s.line}></div>

              <div className={s.productPrice}>
                <span className={s.newPrice}>${product.priceDiscount}</span>
                <span className={s.price}>${product.priceRegular}</span>
              </div>

              <div className={s.productButton}>
                <button
                  onClick={() => {
                    toggleCart(normalizeProduct(product));
                  }}
                  className={classNames(s.selected, { [s.isInCart]: isInCart })}
                >
                  Add to cart
                </button>
                <button
                  className={classNames(s.favorites, { [s.isFavorite]: isFavorite })}
                  onClick={() => toggleFavorites(normalizeProduct(product))}
                >
                  <img src={isFavorite ? heart : icon} alt="favorites" />
                </button>
              </div>

              <div className={s.specsContainer}>
                {specsData.slice(0, 4).map((spec) => (
                  <div className={s.specItem} key={spec.label}>
                    <span className={s.propLabel}>{spec.label}</span>
                    <span className={s.propValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={s.prodDescript}>
            <div className={s.about}>
              <h3 className={s.sectionTitle}>About</h3>

              <div className={s.descriptionList}>
                {product.description.map((item) => (
                  <div className={s.aboutSection} key={item.title}>
                    <h4 className={s.promoTitle}>{item.title}</h4>
                    <span className={s.promoDescription}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={s.techSpecsContainer}>
              <h3 className={s.sectionTitle}>Tech specs</h3>

              <div className={s.specsTable}>
                {specsData.map((spec) => (
                  <div className={s.specRow} key={spec.label}>
                    <span className={s.specName}>{spec.label}</span>
                    <span className={s.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={s.recommendedProducts}>
            <ProductSlider title="You may also like" products={filterProduct} />
          </div>
        </div>
      )}
    </div>
  );
};
