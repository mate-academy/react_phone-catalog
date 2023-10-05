import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, getProducts } from '../../Helpers/api';
import { Loader } from '../../Components/Loader/Loader';
import './ProductDetailsPage.scss';
import { ProductDescription } from '../../Helpers/Types/ProductDetails';
import { Product } from '../../Helpers/Types/Product';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useCart } from '../../Helpers/CartContex';
import { useFav } from '../../Helpers/FavContex';

function shuffleArray(array: Product[]) {
  const randomArray = [...array];

  // eslint-disable-next-line no-plusplus
  for (let i = randomArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }

  return randomArray;
}

function getSuggestedProducts(
  allProducts: Product[],
): Product[] {
  const shuffledProducts = shuffleArray(allProducts);

  return shuffledProducts;
}

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetails, setProductDetails]
    = useState<ProductDescription | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [currentIndexLike, setCurrentIndexLike] = useState(0);
  const suggestedProducts = getSuggestedProducts(products);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart, setButtonStates, buttonStates } = useCart();
  const { toggleFav, favStates, setFavStates } = useFav();

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    const newButtonStates = { ...buttonStates };

    newButtonStates[product.id] = true;
    setButtonStates(newButtonStates);
    localStorage.setItem('buttonStates', JSON.stringify(newButtonStates));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (productId) {
      getProductDetails(productId)
        .then((details) => {
          setProductDetails(details);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  const product = products.find((prod) => prod.id === productId);

  let discountElement = null;

  if (product) {
    if (product.discount === 0) {
      discountElement = (
        <p className="details__discount">
          $
          {product.price}
        </p>
      );
    } else {
      const discountedPrice
        = product.price - (product.discount / 100) * product.price;

      discountElement = (
        <>
          <p className="details__discount">
            $
            {discountedPrice}
          </p>
          <p className="details__price">
            $
            {product.price}
          </p>
        </>
      );
    }
  }

  const handleImageKeyPress
    = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        setSelectedImageIndex(index);
      }
    };

  const handleAddToFav = (item: Product) => {
    toggleFav(item);

    const newFavState = { ...favStates };

    newFavState[item.id] = !newFavState[item.id];
    setFavStates(newFavState);
    localStorage.setItem('favStates', JSON.stringify(newFavState));
  };

  return (
    <>
      {isLoading
        ? (<Loader />)
        : (
          <section className="details">
            <div className="details__top" data-cy="breadCrumbs">
              <Link to="/">
                <img
                  src="images/Home.svg"
                  alt="HomeIcon"
                  className="details__icon"
                />
              </Link>

              <img
                src="images/DisabledArrow.svg"
                alt="Arrow"
                className="details__icon"
              />

              <Link
                to={product?.type === 'phone' ? (
                  '/phones'
                ) : (
                  '/tablets'
                )}
                className="details__string details__string--active"
              >
                {product?.type === 'phone' ? (
                  'Phones'
                ) : (
                  'Tablets'
                )}
              </Link>

              <img
                src="images/DisabledArrow.svg"
                alt="Arrow"
                className="details__icon"
              />

              <p className="details__string">{product?.name}</p>
            </div>

            <button
              type="button"
              data-cy="backButton"
              onClick={handleGoBack}
              className="details__back-btn"
            >
              <div className="details__button-content">
                <img
                  src="images/ArrowBlack.svg"
                  alt="GoBack"
                  className="details__back-img"
                />

                <p className="details__string">Back</p>
              </div>
            </button>

            <h1
              className="details__title details__title--margin"
            >
              {product?.name}
            </h1>

            <div className="details__main">
              <div className="details__photo-container">
                <div className="details__photos">
                  {productDetails?.images.map((img, index) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      onKeyDown={(e) => handleImageKeyPress(e, index)}
                      className="details__img-button"
                      tabIndex={0}
                    >
                      <img
                        src={img}
                        alt="Product img"
                        className="details__img"
                      />
                    </button>
                  ))}
                </div>

                <div className="details__photo">
                  <img
                    src={productDetails?.images[selectedImageIndex]}
                    alt="Product img"
                    className="details__main-img"
                  />
                </div>
              </div>

              <div className="details__info">
                <div className="details__prices">
                  {discountElement}
                </div>

                <div className="details__buttons">
                  <button
                    type="button"
                    className={product && buttonStates[product.id] ? (
                      'details__button-added'
                    ) : (
                      'details__button-card'
                    )}
                    onClick={() => product && handleAddToCart(product)}
                  >
                    {product && buttonStates[product.id]
                      ? ('Added to cart') : ('Add to cart')}
                  </button>

                  <button
                    type="button"
                    className="details__button-fav"
                    onClick={() => product && handleAddToFav(product)}
                  >
                    {product && favStates[product.id] ? (
                      <img src="images/FilledHeart.svg" alt="Favourites" />
                    ) : (
                      <img src="images/Favourites.svg" alt="Favourites" />
                    )}
                  </button>
                </div>

                <div className="details__data">
                  <p className="details__data-text">Battery</p>
                  <p className="details__data-number">
                    {productDetails?.battery.standbyTime}
                  </p>
                </div>

                <div className="details__data">
                  <p className="details__data-text">Resolution</p>
                  <p className="details__data-number">
                    {productDetails?.display.screenResolution}
                  </p>
                </div>

                <div className="details__data">
                  <p className="details__data-text">Processor</p>
                  <p className="details__data-number">
                    {productDetails?.android.os}
                  </p>
                </div>

                <div className="details__data">
                  <p className="details__data-text">Camera</p>
                  <p className="details__data-number">
                    {productDetails?.camera.primary}
                  </p>
                </div>
              </div>
            </div>

            <div className="details__about" data-cy="productDescription">
              <div className="details__description">
                <h2 className="details__header">About</h2>

                <hr className="details__separator" />

                <p className="details__text">{productDetails?.description}</p>
              </div>

              <div className="details__tech">
                <h2 className="details__header">Tech specs</h2>

                <hr className="details__separator" />

                <div className="details__data details__data--tech">
                  <p className="details__data-text">Screen size</p>
                  <p className="details__data-number">
                    {productDetails?.display.screenSize}
                  </p>
                </div>

                <div className="details__data details__data--tech">
                  <p className="details__data-text">Bluetooth</p>
                  <p className="details__data-number">
                    {productDetails?.connectivity.bluetooth}
                  </p>
                </div>

                <div className="details__data details__data--tech">
                  <p className="details__data-text">USB</p>
                  <p className="details__data-number">
                    {productDetails?.hardware.usb}
                  </p>
                </div>

                <div className="details__data details__data--tech">
                  <p className="details__data-text">Flash</p>
                  <p className="details__data-number">
                    {productDetails?.storage.flash}
                  </p>
                </div>

                <div className="details__data details__data--tech">
                  <p className="details__data-text">RAM</p>
                  <p className="details__data-number">
                    {productDetails?.storage.ram}
                  </p>
                </div>

                <div className="details__data details__data--tech">
                  <p className="details__data-text">Availability</p>
                  <p className="details__data-number">
                    {productDetails?.availability}
                  </p>
                </div>

                <div className="details__data details__data--tech">
                  <p className="details__data-text">Weight</p>
                  <p className="details__data-number">
                    {productDetails?.sizeAndWeight.weight}
                  </p>
                </div>
              </div>
            </div>

            <div className="details__like">
              <div className="details__slider">
                <h1 className="details__title">
                  You may also like
                </h1>

                <ProductsSlider
                  currentIndex={currentIndexLike}
                  setCurrentIndex={setCurrentIndexLike}
                  products={suggestedProducts}
                />
              </div>

              <div className="details__products" data-cy="cardsContainer">
                <ProductCard
                  products={
                    suggestedProducts.slice(
                      currentIndexLike, currentIndexLike + 4,
                    )
                  }
                />
              </div>
            </div>
          </section>
        )}
    </>
  );
};
