import { useEffect, useState } from 'react';
import {
  useParams,
  useNavigate,
  useOutletContext,
  NavLink,
} from 'react-router-dom';
import './ProductDetailsPage.scss';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults/NoResults';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { FavoritesContextType } from '../../types/FavoritesContextType';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [productDetails, setProductDetails]
    = useState<ProductDetails | null>(null);
  const [product, setProduct]
    = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage]
    = useState<string>(productDetails?.images[0] || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<string>('');
  const [thisModelProducts, setThisModelProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const {
    favoritesItems,
    addToFavorites,
    removeFromFavorites,
    cartItems,
    addToCart,
    removeFromCart,
  }
    = useOutletContext<FavoritesContextType>();

  const containedInFavorites
    = favoritesItems.some(item => item.id === product?.id);
  const containedInCart
    = cartItems.some(item => item.id === product?.id);

  const getProduct = async () => {
    setIsLoading(true);
    setProductDetails(null);
    try {
      const response = await fetch(`https://mate-academy.github.io/react_phone-catalog/_new/products/${productId}.json`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setProductDetails(data);
      setSelectedImage(data.images[0]);
    } catch (error) {
      setHasError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (selectedColor) {
      const baseProductId = productId?.split('-').slice(0, -1).join('-');
      const newProductId = `${baseProductId}-${selectedColor}`;

      navigate(`/product/${newProductId}`);
      getProduct();
    }
  }, [selectedColor, productId]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleKeyDown
    = (event: React.KeyboardEvent<HTMLButtonElement>, color: string) => {
      if (event.key === 'Enter') {
        handleColorClick(color);
      }
    };

  useEffect(() => {
    const getPhones = async () => {
      setIsLoading(true);
      try {
        const response
          = await fetch(
            'https://mate-academy.github.io/react_phone-catalog/'
            + '_new/products.json',
          );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const foundProduct
          = data.find((item: Product) => productDetails?.id === item.itemId);

        const currentProducts
          = data.filter((item: Product) => {
            return productDetails?.id.split('-').slice(0, -1).join('-')
              === item.itemId.split('-').slice(0, -1).join('-');
          });

        setThisModelProducts(currentProducts);
        setProduct(foundProduct);
        setProducts(data);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getPhones();
  }, [productDetails, productId]);

  const handleCapacityClick = (capacity: string) => {
    const newProductId = `${productId?.split('-').slice(0, -2).join('-')}-${capacity.toLocaleLowerCase()}-${product?.color}`;

    navigate(`/product/${newProductId}`);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const shuffleProducts = () => {
      const shuffled = [...products];

      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      return shuffled;
    };

    if (products.length > 0) {
      setSuggestedProducts(shuffleProducts());
    }
  }, [products]);

  return (
    <div className="productDetailsPage">
      {isLoading && <Loader />}

      {hasError && (
        <NoResults productName="Product" />
      )}

      {!isLoading && !hasError && !!productDetails && (
        <>
          <div className="pathInscription" data-cy="breadCrumbs">
            <div className="nav-logo">
              <NavLink
                to="/"
              >
                <img src="img/icons/home-logo.svg" alt="home-logo" />
              </NavLink>
            </div>
            <img
              src="img/icons/GrayArrowRight.svg"
              alt="arrowRight"
              className="pathInscription__arrowRight"
            />
            <NavLink
              to="/phones"
              className="pathInscription__text pathInscription__text--link"
            >
              Phones
            </NavLink>
            <img
              src="img/icons/GrayArrowRight.svg"
              alt="arrowRight"
              className="pathInscription__arrowRight"
            />
            <p className="pathInscription__text">{productDetails.name}</p>
          </div>

          <button
            type="button"
            className="productDetailsPage__back-button"
            data-cy="backButton"
            onClick={handleBackButtonClick}
          >
            <img
              src="img/icons/arrowRight.svg"
              alt="arrowLeft"
              className="pathInscription__arrowRight"
              style={{ transform: 'rotate(-90deg)' }}
            />
            <p className="pathInscription__text">Back</p>
          </button>

          <h1>{productDetails.name}</h1>

          <div className="productDetails">
            <div className="productDetails__verticalImageSlider">
              {productDetails.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className="image-slider-button"
                  onClick={() => handleImageClick(image)}
                  tabIndex={0}
                  style={{ background: `url('${image}') no-repeat center center / contain`, width: '80px', height: '80px' }}
                  aria-label={`View ${productDetails.name} image ${index + 1}`}
                >
                  <img
                    src={`${image}`}
                    alt={`${productDetails.name} view ${index + 1}`}
                    className="visually-hidden"
                  />
                </button>
              ))}
            </div>
            <div className="productDetails__image-box">
              <img
                src={`${selectedImage}`}
                alt="productDetails img"
                className="productDetails__image"
              />
            </div>
            <div className="productDetails__description">
              <div className="colors">
                <div className="availableColors">Available colors</div>
                <div className="colors__box">
                  {productDetails?.colorsAvailable.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={`selectorscolorDefault ${productDetails.color === color && 'selectorscolorDefault--select'}`}
                      onClick={() => handleColorClick(color)}
                      onKeyDown={(event) => handleKeyDown(event, color)}
                      style={{
                        backgroundImage: `url(${thisModelProducts.find(item => item.color === color)?.image})`,
                      }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="productDetails__band" />

              <div className="capacity">
                <div className="capacity__text">Select capacity</div>
                <div className="capacity__box">
                  {productDetails.capacityAvailable.map((capacity) => (
                    <button
                      type="button"
                      key={capacity}
                      className={`capacity__button ${productDetails.capacity === capacity && 'capacity__button--selected'}`}
                      onClick={() => handleCapacityClick(capacity)}
                    >
                      {capacity.replace('GB', ' GB')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="productDetails__band" />

              <h2 className="price">
                $
                {productDetails.priceDiscount}
                {productDetails.priceRegular
                  !== productDetails.priceDiscount && (
                  <span className="old-price">
                    $
                    {productDetails.priceRegular}
                  </span>
                )}
              </h2>

              <div className="actions">
                <button
                  type="button"
                  className={containedInCart
                    ? 'add-to-cart add-to-cart--selected' : 'add-to-cart'}
                  onClick={() => {
                    return product && (
                      containedInCart ? removeFromCart(product.id)
                        : addToCart(product));
                  }}
                >
                  {containedInCart ? 'Added to cart' : 'Add to cart'}
                </button>

                <button
                  type="button"
                  className="favorite"
                  onClick={() => {
                    return product && (
                      containedInFavorites ? removeFromFavorites(product.id)
                        : addToFavorites(product));
                  }}
                >
                  <img
                    src={containedInFavorites
                      ? 'img/icons/favouritesSelected.svg'
                      : 'img/icons/favourites.svg'}
                    alt="Add to favorites"
                    className="favorite__img"
                  />
                </button>
              </div>

              <ul className="specs">
                <li>
                  Screen
                  <span className="specs__value">{productDetails.screen}</span>
                </li>
                <li>
                  Resolution
                  <span className="specs__value">
                    {productDetails.resolution}
                  </span>
                </li>
                <li>
                  Processor
                  <span className="specs__value">
                    {productDetails.processor}
                  </span>
                </li>
                <li>
                  RAM
                  <span className="specs__value">{productDetails.ram}</span>
                </li>
              </ul>
            </div>

            <p className="productDetails__id">{`ID: ${product?.fullPrice}${product?.price}`}</p>
          </div>

          <div className="productDetailsPage__about-specs">
            <section className="about" data-cy="productDescription">
              <p className="about__title">About</p>
              <div className="productDetails__band" />

              {productDetails.description
                && productDetails.description.map((section) => (
                  <div className="description">
                    <p className="description__title">
                      {section.title}
                    </p>
                    {section.text.map((paragraph, index) => (
                      <>
                        {index !== 0 && <br />}
                        <p className="description__text">{paragraph}</p>
                      </>
                    ))}
                  </div>
                ))}
            </section>

            <section className="specs">
              <p className="specs__title">Tech specs</p>
              <div className="productDetails__band" />

              <ul className="specs-list">
                <li>
                  Screen
                  <span className="specs-list__value">
                    {productDetails.screen}
                  </span>
                </li>
                <li>
                  Resolution
                  <span className="specs-list__value">
                    {productDetails.resolution}
                  </span>
                </li>
                <li>
                  Processor
                  <span className="specs-list__value">
                    {productDetails.processor}
                  </span>
                </li>
                <li>
                  RAM
                  <span className="specs-list__value">
                    {productDetails.ram}
                  </span>
                </li>
                <li>
                  Built in memory
                  <span className="specs-list__value">
                    {productDetails.capacity}
                  </span>
                </li>
                <li>
                  Camera
                  <span className="specs-list__value">
                    {productDetails.camera}
                  </span>
                </li>
                <li>
                  Zoom
                  <span className="specs-list__value">
                    {productDetails.zoom}
                  </span>
                </li>
                <li>
                  Cell
                  <span className="specs-list__value">
                    {productDetails.cell.join(', ')}
                  </span>
                </li>
              </ul>
            </section>
          </div>

          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </>
      )}
    </div>
  );
};
