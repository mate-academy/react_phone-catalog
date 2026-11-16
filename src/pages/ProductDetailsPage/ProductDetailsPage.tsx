import { Link, useNavigate, useParams } from 'react-router-dom';
import { Path } from '../../components/Path/Path';
import { useEffect, useMemo, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetail';
import { ProductDetailShort } from '../../types/ProductDetailShort';
import BackIcon from '../../assets/icons/prev_icon.png';
import './ProductDetailsPage.scss';
import { COLOR_MAP } from '../../styles/product_colors';
import favoritesIcon from '../../assets/icons/favorites_icon.png';
import favoritesAddedIcon from '../../assets/icons/favorites_added.png';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { getPublicUrl } from '../../utils/publicUrl';

interface Props {
  products_list: ProductDetailShort[];
}

export const ProductPage: React.FC<Props> = ({ products_list }) => {
  const navigate = useNavigate();
  const { toggleCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const [products, setProducts] = useState<ProductDetails[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const currentProduct = products?.find(a => a.id === productId);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const recomendedProducts = useMemo(() => {
    return products_list
      .filter(a => a.category === category)
      .filter(a => a.itemId !== productId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  }, [category, currentProduct?.namespaceId]);

  useEffect(() => {
    if (!category) {
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setHasError(false);
    setProducts(undefined);

    fetch(getPublicUrl(`api/${category}.json`), { signal: controller.signal })
      .then(res => {
        if (!res.ok) {
          throw new Error('Товар не знайдено');
        }

        return res.json();
      })
      .then(data => setProducts(data))
      .catch(() => {
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [category]);

  const productImages = currentProduct?.images;

  useEffect(() => {
    setCurrentPhoto(0);
  }, [productId]);

  const colorVariants =
    products?.filter(
      product =>
        product.namespaceId === currentProduct?.namespaceId &&
        product.capacity === currentProduct?.capacity,
    ) || [];

  const capacityVariants =
    products?.filter(
      product =>
        product.namespaceId === currentProduct?.namespaceId &&
        product.color === currentProduct?.color,
    ) || [];

  const imageSrc = productImages?.[currentPhoto];

  if (isLoading) {
    return <p role="status">Loading product...</p>;
  }

  if (hasError) {
    return <p role="alert">Could not load this product.</p>;
  }

  if (!currentProduct) {
    return <p role="status">Product not found.</p>;
  }

  const catalogProduct = products_list.find(
    product => product.itemId === currentProduct.id,
  );

  if (!catalogProduct) {
    return <p role="status">Product not found.</p>;
  }

  return (
    <div className="ProductPage grid">
      <Path />
      <button
        type="button"
        className="BackButtons"
        onClick={() => navigate(-1)}
      >
        <img className="BackButtons-icon" src={BackIcon} alt="" />
        <span className="BackButtons-text">Back</span>
      </button>
      {isLoading && (
        <p className="Product-status" role="status">
          Loading product...
        </p>
      )}
      {hasError && (
        <p className="Product-status" role="alert">
          Could not load this product. Please try again.
        </p>
      )}
      {!isLoading && !hasError && !currentProduct && (
        <p className="Product-status" role="status">
          Product not found.
        </p>
      )}
      <h2 className="Product-title">{currentProduct?.name}</h2>

      <div className="Product-photos-list">
        {productImages?.map((url, idx) => {
          return (
            <img
              src={getPublicUrl(url)}
              alt=""
              onClick={() => setCurrentPhoto(idx)}
              key={url}
              className={
                currentPhoto === idx
                  ? 'Product-photos-list-item is-active'
                  : 'Product-photos-list-item'
              }
              aria-label={`Show product photo ${idx + 1}`}
              aria-pressed={currentPhoto === idx}
            />
          );
        })}
      </div>
      {imageSrc && (
        <img
          className="Product-photos-current"
          src={getPublicUrl(imageSrc)}
          alt={currentProduct?.name}
        />
      )}
      <div className="Product-info">
        <div className="Product-colors">
          <span className="Product-colors-title">Available colors</span>
          <div className="Product-colors-list">
            {colorVariants.map(product => (
              <Link
                key={product.id}
                to={`/${category}/${product.id}`}
                className={
                  currentProduct?.id === product.id
                    ? 'Product-colors-list-item is-active'
                    : 'Product-colors-list-item'
                }
                style={{
                  backgroundColor:
                    COLOR_MAP[product.color.toLowerCase()] || product.color,
                }}
              />
            ))}
          </div>
        </div>
        <div className="Product-capacity">
          <span className="Product-capacity-title">Select capacity</span>
          <div className="Product-capacity-list">
            {capacityVariants.map(product => (
              <Link
                key={product.id}
                to={`/${category}/${product.id}`}
                className={
                  currentProduct?.id === product.id
                    ? 'Product-capacity-list-item is-active'
                    : 'Product-capacity-list-item'
                }
              >
                {product.capacity}
              </Link>
            ))}
          </div>
        </div>
        <div className="Product-price">
          <span className="Product-price-discount">
            {'$' + currentProduct?.priceDiscount}
          </span>
          <span className="Product-price-regular">
            {'$' + currentProduct?.priceRegular}
          </span>
        </div>
        <div className="Product-buttonContainer">
          <button
            className={
              isInCart(currentProduct.id)
                ? 'Product-buttonContainer-AddBtn is-active'
                : 'Product-buttonContainer-AddBtn'
            }
            type="button"
            onClick={() => toggleCart(catalogProduct)}
          >
            {isInCart(catalogProduct.itemId) ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className="Product-buttonContainer-FavBtn"
            onClick={() => toggleFavorite(catalogProduct)}
            type="button"
          >
            <img
              className="Product-buttonContainer-FavBtn-icon"
              src={
                isFavorite(currentProduct?.id)
                  ? favoritesAddedIcon
                  : favoritesIcon
              }
              alt=""
            />
          </button>
        </div>
        <div className="Product-details">
          <ul>
            <li className="Product-details-item">
              <span className="Product-details-title">Screen</span>
              <span className="Product-details-data">
                {currentProduct?.screen}
              </span>
            </li>
            <li className="Product-details-item">
              <span className="Product-details-title">Resolution</span>
              <span className="Product-details-data">
                {currentProduct?.resolution}
              </span>
            </li>
            <li className="Product-details-item">
              <span className="Product-details-title">Processor</span>
              <span className="Product-details-data">
                {currentProduct?.processor}
              </span>
            </li>
            <li className="Product-details-item">
              <span className="Product-details-title">RAM</span>
              <span className="Product-details-data">
                {currentProduct?.ram}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="Product-description">
        <h3 className="Product-description-title">About</h3>
        {currentProduct?.description.map(a => (
          <div className="Product-description-container" key={a.title}>
            <h4 className="Product-description-subTitle">{a.title}</h4>
            <p className="Product-description-text">{a.text}</p>
          </div>
        ))}
      </div>
      <div className="Product-techSpecs">
        <h3 className="Product-techSpecs-h">Tech specs</h3>
        <div className="Product-techSpecs-container">
          <ul>
            {currentProduct?.screen && (
              <li className="Product-techSpecs-item">
                <span className="Product-techSpecs-title">Screen</span>
                <span className="Product-techSpecs-data">
                  {currentProduct?.screen}
                </span>
              </li>
            )}
            {currentProduct?.resolution && (
              <li className="Product-techSpecs-item">
                <span className="Product-techSpecs-title">Resolution</span>
                <span className="Product-techSpecs-data">
                  {currentProduct?.resolution}
                </span>
              </li>
            )}
            {currentProduct?.processor && (
              <li className="Product-techSpecs-item">
                <span className="Product-techSpecs-title">Processor</span>
                <span className="Product-techSpecs-data">
                  {currentProduct?.processor}
                </span>
              </li>
            )}
            {currentProduct?.ram && (
              <li className="Product-techSpecs-item">
                <span className="Product-techSpecs-title">RAM</span>
                <span className="Product-techSpecs-data">
                  {currentProduct?.ram}
                </span>
              </li>
            )}
            {currentProduct?.camera && (
              <li className="Product-techSpecs-item">
                <span className="Product-techSpecs-title">Camera</span>
                <span className="Product-techSpecs-data">
                  {currentProduct?.camera}
                </span>
              </li>
            )}
            {currentProduct?.zoom && (
              <li className="Product-techSpecs-item">
                <span className="Product-techSpecs-title">Zoom</span>
                <span className="Product-techSpecs-data">
                  {currentProduct?.zoom}
                </span>
              </li>
            )}
            {currentProduct?.cell && (
              <li className="Product-techSpecs-item">
                <span className="Product-techSpecs-title">Cell</span>
                <span className="Product-techSpecs-data">
                  {currentProduct?.cell.join(' ')}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <ProductSlider products={recomendedProducts} title="You may also like" />
    </div>
  );
};
