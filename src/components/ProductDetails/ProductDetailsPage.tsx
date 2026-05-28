import './ProductDetails.scss';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getProductById,
  getProductDetailsById,
  getProducts,
  getSuggestedProducts,
} from '../../api/products';
import { BreadCrumbs } from '../BreadCrumbs';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { ProductList } from '../ProductList';
import classNames from 'classnames';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { findProductVariant } from '../../utils/findProductVariant';
import { Loader } from '../Loader';
import { ThemeContext } from '../../context/ThemeContext';
import { getImageUrl } from '../../utils/getImageUrl';

export const ProductDetailsPage = () => {
  //#region useSmth
  const { productId } = useParams();
  const { cart, addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  //#endregion

  //#region useState
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  //#endregion

  //#region useEffect
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const productFromServer = await getProductDetailsById(productId);

        if (!productFromServer) {
          setErrorMessage('Product was not found');

          return;
        }

        setProduct(productFromServer);

        const previewFromServer = await getProductById(productFromServer.id);

        const allProductsFromServer = await getProducts();

        setAllProducts(allProductsFromServer);

        setPreviewProduct(previewFromServer || null);
        setSelectedImage(productFromServer.images[0]);

        const suggestedFromServer = await getSuggestedProducts(
          productFromServer.category,
          productFromServer.id,
        );

        setSuggestedProducts(suggestedFromServer);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);
  //#endregion

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!product) {
    return <p>Product was not found</p>;
  }

  //#region const Smth
  const isAdded = previewProduct
    ? cart.some(cartItem => cartItem.product.id === previewProduct.id)
    : false;

  const isProductFavorite = previewProduct
    ? isFavorite(previewProduct.id)
    : false;

  const selectedColor = product.color;

  const selectedCapacity = product.capacity;

  const handleVariantChange = (color: string, capacity: string) => {
    if (!previewProduct) {
      return;
    }

    const variant = findProductVariant(
      allProducts,
      previewProduct,
      color,
      capacity,
    );

    if (variant) {
      navigate(`/product/${variant.itemId}`);
    }
  };
  //#endregion

  return (
    <>
      <BreadCrumbs category={product.category} productName={product.name} />
      <button
        type="button"
        className="product-details__back"
        onClick={() => navigate(-1)}
      >
        <img
          className={
            'product-details__back-icon ' +
            'product-details__back-icon--default'
          }
          src={
            theme === 'dark'
              ? 'img/icons/arrow-left.svg'
              : 'img/icons-light/arrow-left-light.svg'
          }
          alt="Back arrow"
        />
        <img
          className={
            'product-details__back-icon ' + 'product-details__back-icon--hover'
          }
          src="img/icons/arrow-left_hover.svg"
          alt="Back arrow"
        />
        Back
      </button>

      <h1 className="product-details__title">{product.name}</h1>

      <div className="product-details">
        <div className="product-details__top">
          <div className="product-details__gallery">
            <div className="product-details__thumbnails">
              {product.images.map(image => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={classNames('product-details__thumbnail', {
                    'product-details__thumbnail--active':
                      selectedImage === image,
                  })}
                >
                  <img src={getImageUrl(image)} alt={product.name} width={60} />
                </button>
              ))}
            </div>

            <div className="product-details__main-image">
              <img
                src={getImageUrl(selectedImage)}
                alt={product.name}
                width={300}
              />
            </div>
          </div>

          <div className="product-details__info">
            <div className="product-details__section">
              <h3 className="product-details__label">Available colors</h3>

              <div className="product-details__colors">
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleVariantChange(color, selectedCapacity)}
                    className={classNames(
                      'product-details__color',

                      {
                        'product-details__color--active':
                          selectedColor === color,
                      },
                    )}
                  >
                    <span
                      className="product-details__color-inner"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details__section">
              <h3 className="product-details__label">Select capacity</h3>

              <div className="product-details__capacities">
                {product.capacityAvailable.map(capacity => (
                  <button
                    key={capacity}
                    type="button"
                    onClick={() => handleVariantChange(selectedColor, capacity)}
                    className={classNames('product-details__capacity', {
                      'product-details__capacity--active':
                        selectedCapacity === capacity,
                    })}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details__prices">
              <span className="product-details__price">
                ${product.priceDiscount}
              </span>

              <span className="product-details__full-price">
                ${product.priceRegular}
              </span>
            </div>

            <div className="product-details__actions">
              <button
                type="button"
                className={classNames('product-details__button', {
                  'product-details__button--added': isAdded,
                })}
                disabled={!previewProduct}
                onClick={() => {
                  if (previewProduct) {
                    addToCart(previewProduct);
                  }
                }}
              >
                {isAdded ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={classNames('product-details__favorite', {
                  'product-details__favorite--active': isProductFavorite,
                })}
                disabled={!previewProduct}
                onClick={() => {
                  if (previewProduct) {
                    toggleFavorite(previewProduct);
                  }
                }}
              >
                <img
                  src={
                    isProductFavorite
                      ? 'img/icons/favourites-filled.svg'
                      : theme === 'dark'
                        ? 'img/icons/favourites.svg'
                        : 'img/icons-light/favourites-light.svg'
                  }
                  alt="Favorite icon"
                />
              </button>
            </div>

            <div className="product-details__short-specs">
              <div className="product-details__short-spec">
                <span>Screen</span>

                <span>{product.screen}</span>
              </div>

              <div className="product-details__short-spec">
                <span>Resolution</span>

                <span>{product.resolution}</span>
              </div>

              <div className="product-details__short-spec">
                <span>Processor</span>

                <span>{product.processor}</span>
              </div>

              <div className="product-details__short-spec">
                <span>RAM</span>

                <span>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__bottom">
          <section className="product-details__about">
            <h2 className="product-details__subtitle">About</h2>

            {product.description.map(section => (
              <article
                className="product-details__description"
                key={section.title}
              >
                <h3 className="product-details__description-title">
                  {section.title}
                </h3>

                {section.text.map(paragraph => (
                  <p className="product-details__text" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </section>

          <section className="product-details__specs">
            <h2 className="product-details__subtitle">Tech specs</h2>

            <div className="product-details__spec">
              <span>Screen</span>

              <span>{product.screen}</span>
            </div>

            <div className="product-details__spec">
              <span>Resolution</span>

              <span>{product.resolution}</span>
            </div>

            <div className="product-details__spec">
              <span>Processor</span>

              <span>{product.processor}</span>
            </div>

            <div className="product-details__spec">
              <span>RAM</span>

              <span>{product.ram}</span>
            </div>

            <div className="product-details__spec">
              <span>Built in memory</span>

              <span>{product.capacity}</span>
            </div>
          </section>
        </div>

        <section className="product-details__suggested">
          <h2 className="product-details__subtitle">You may also like</h2>

          <ProductList products={suggestedProducts.slice(0, 4)} />
        </section>
      </div>
    </>
  );
};
