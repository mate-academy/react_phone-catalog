import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getProductDetails, getProducts } from '../api/products';
import { ProductDetails } from '../types/ProductDetails';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { ProductGallery } from '../components/ProductGallery';
import { Product } from '../types/Product';
import { CartContext } from '../helpers/cartHelper';
import { FavoritesContext } from '../helpers/favoritesHelper';
import { ProductsSlider } from '../components/ProductsSlider';
import { getRandomProducts } from '../helpers/getProducts';

export const ProductDetailsPage = () => {
  const { cartItems, addCartItems } = useContext(CartContext);
  const { favorites, addRemoveToFavorites } = useContext(FavoritesContext);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const { productId = '' } = useParams();
  const [
    productDetails,
    setProductDetails,
  ] = useState<ProductDetails | null>(null);
  const [isError, setIsError] = useState({ details: false, products: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const product = allProducts.find(item => item.id === productId);
  const inCart = product
    ? cartItems.find(item => item.id === product.id)
    : false;
  const inFavorites = product
    ? favorites.find(item => item.id === product.id)
    : false;
  const priceWithDiscount = product
    ? product.price - (product.price * product.discount) / 100
    : 0;

  const backHandler = () => navigate(-1);

  const addToCart = () => {
    if (!inCart && product) {
      addCartItems(product);
    }
  };

  const onClickFavoritesHandler = (currentProduct: Product) => () => {
    addRemoveToFavorites(currentProduct);
  };

  useEffect(() => {
    setIsError({ details: false, products: false });
    setIsLoading(true);
    const currentError = { details: false, products: false };

    const fetchData = async () => {
      const resultProductDetails = await getProductDetails(productId)
        .catch(() => {
          currentError.details = true;
          setIsError(currentError);

          return null;
        });

      const resultProducts = await getProducts()
        .catch(() => {
          currentError.products = true;
          setIsError(currentError);

          return [];
        });

      setProductDetails(resultProductDetails);
      setAllProducts(resultProducts);
      setRandomProducts(getRandomProducts(resultProducts, productId));
    };

    fetchData()
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <div className="product-details-page">
      <div className="product-details-page__breadcrumbs">
        <Breadcrumbs productName={productDetails?.name} />
      </div>
      <button
        className="product-details-page__back-button button button--back"
        type="button"
        data-cy="backButton"
        onClick={backHandler}
      >
        <span className="icon icon--left" />
        <div className="button__back-text">Back</div>
      </button>

      {isError.details && (
        <div className="product-details-page__message">
          <Message message="Product was not found" isError />
        </div>
      )}

      {isError.products && (
        <div className="product-details-page__message">
          <Message message="Failed to load products" isError />
        </div>
      )}

      {isLoading && (
        <Loader />
      )}

      {!isError.details && !isLoading && productDetails && product && (
        <section>
          <h1 className="product-details-page__title">
            {productDetails?.name}
          </h1>
          <div
            className="
              product-details-page__container
              product-details-page__container--top-info
            "
          >
            <div
              className="
                product-details-page__section
                product-details-page__section--top-info
              "
            >
              <ProductGallery imagesUrl={productDetails.images} />
            </div>
            <div
              className="
                product-details-page__section
                product-details-page__section--top-info
              "
            >
              <div className="product-details-page__main-info-container">
                <div className="product-details-page__main-info">
                  <div className="product-details-page__price-container">
                    <h1>{`$${product.discount ? priceWithDiscount : product.price}`}</h1>
                    {!!product.discount && (
                      <p className="product-details-page__discount">
                        {`$${product.price}`}
                      </p>
                    )}
                  </div>

                  <div className="product-details-page__buttons">
                    <button
                      type="button"
                      className={classNames(
                        'button',
                        'button--add',
                        { 'button--add-selected': inCart },
                      )}
                      onClick={addToCart}
                    >
                      { inCart ? 'Added to cart' : 'Add to cart' }
                    </button>

                    <button
                      type="button"
                      className="button button--favorites-large"
                      onClick={onClickFavoritesHandler(product)}
                    >
                      <span
                        className={
                          `icon ${inFavorites ? 'icon--favorites-selected' : 'icon--favorites'}`
                        }
                      />
                    </button>
                  </div>

                  <div
                    className="
                      product-details-page__characteristics
                      product-details-page__characteristics--small
                    "
                  >
                    <div className="product-details-page__characteristic">
                      <p>Screen</p>
                      <p>{productDetails.display.screenSize}</p>
                    </div>
                    <div className="product-details-page__characteristic">
                      <p>Resolution</p>
                      <p>{productDetails.display.screenResolution}</p>
                    </div>
                    <div className="product-details-page__characteristic">
                      <p>Processor</p>
                      <p>{productDetails.hardware.cpu}</p>
                    </div>
                    <div className="product-details-page__characteristic">
                      <p>RAM</p>
                      <p>{productDetails.storage.ram}</p>
                    </div>
                  </div>
                </div>
                <div className="product-details-page__id">
                  {`ID: ${productDetails.id}`}
                </div>
              </div>
            </div>
          </div>
          <div
            className="
              product-details-page__container
              product-details-page__container--description
            "
          >
            <div
              className="
                product-details-page__section
                product-details-page__section--description
              "
              data-cy="productDescription"
            >
              <h2 className="product-details-page__subtitle">About</h2>
              <hr className="product-details-page__line" />
              <p className="product-details-page__description">
                {productDetails.description}
              </p>
            </div>

            <div
              className="
                product-details-page__section
                product-details-page__section--description
              "
            >
              <h2 className="product-details-page__subtitle">Tech specs</h2>
              <hr className="product-details-page__line" />
              <div className="product-details-page__characteristics">
                <div className="product-details-page__characteristic">
                  <p>Screen</p>
                  <p>{productDetails.display.screenSize}</p>
                </div>
                <div className="product-details-page__characteristic">
                  <p>Resolution</p>
                  <p>{productDetails.display.screenResolution}</p>
                </div>
                <div className="product-details-page__characteristic">
                  <p>Processor</p>
                  <p>{productDetails.hardware.cpu}</p>
                </div>
                <div className="product-details-page__characteristic">
                  <p>RAM</p>
                  <p>{productDetails.storage.ram}</p>
                </div>
                <div className="product-details-page__characteristic">
                  <p>Built in memory</p>
                  <p>{productDetails.storage.flash}</p>
                </div>
                <div className="product-details-page__characteristic">
                  <p>Camera</p>
                  <p>{productDetails.camera.primary}</p>
                </div>
                <div className="product-details-page__characteristic">
                  <p>Battery</p>
                  <p>{productDetails.battery.type}</p>
                </div>
                <div className="product-details-page__characteristic">
                  <p>Cell</p>
                  <p>{productDetails.connectivity.cell}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isError.products && !isLoading && !!allProducts.length && (
        <section className="product-details-page__may-also-like">
          <ProductsSlider
            products={randomProducts}
            title="You may also like"
          />
        </section>
      )}
    </div>
  );
};
