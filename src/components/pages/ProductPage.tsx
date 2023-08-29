/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SectionTopBar from '../Blocks/SectionTopBar';
import { Product } from '../../types/Phone';
import {
  getSingleProduct,
  getSuggestedProducts,
} from '../../api/getProducts';
import { ProductFeatures } from '../../types/ProductFeatures';
import Loader from '../Blocks/Loader';
import { getPrevPrice } from '../../utils/getPrevPrice';
import AsideRoute from '../Blocks/AsideRoute';
import GoBackLink from '../Blocks/GoBackLink';
import { RedHeart, WhiteHeart } from '../../utils/Icons';
import {
  LocaleDataTypes,
  isAdded,
  setStorage,
} from '../../utils/localeStorage';
import PhoneNotFound from './ProductNotFound';
import BrowseProducts from '../Blocks/BrowseProducts';

const ProductPage = () => {
  const productsPerPage = 4;
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentProductFeatures, setCurrentProductFeatures]
    = useState<ProductFeatures | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProductOnServer, setIsProductOnServer] = useState<boolean>(true);

  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleProduct(productId || '')
      .then((productFromAPI) => setCurrentProductFeatures(productFromAPI))
      .catch(() => {
        setIsProductOnServer(false);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getSuggestedProducts()
      .then((productsFromAPI) => setProducts(productsFromAPI));
  }, []);

  const currentProduct = useMemo(() => products
    .find((productFromAPI => productFromAPI.id === currentProductFeatures?.id)),
  [currentProductFeatures]);

  const [srcOfShownImage, setSrcOfShownImage] = useState('');

  const [
    isFavorite,
    setIsFavorite,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (currentProduct) {
      setIsFavorite(isAdded(currentProduct.id, LocaleDataTypes.FAVORITES));
    }
  }, [currentProduct]);

  const isProductFound = isProductOnServer
  && currentProduct
  && currentProductFeatures;

  return (
    <>
      {isLoading && <Loader />}
      {!isProductFound && !isLoading && <PhoneNotFound />}
      {isProductFound
      && (
        <main className="main-product-page container">
          <AsideRoute
            product={currentProduct}
            productName={currentProduct.name}
          />

          <GoBackLink />

          <section className="section-product">
            <h1 className="section-product__title">
              {currentProductFeatures.name}
            </h1>

            <article className="section-product__images">
              <div className="section-product__images--block">
                <div className="section-product__images--other">
                  {currentProductFeatures.images.map((url) => (
                    <img
                      key={url}
                      onClick={() => setSrcOfShownImage(url)}
                      src={url}
                      className={`section-product__images--small${
                        srcOfShownImage === url ? '--picked' : ''
                      }`}
                      alt="img"
                    />
                  ))}
                </div>

                <img
                  src={srcOfShownImage || currentProductFeatures.images[0]}
                  className="section-product__images--is-shown"
                  alt="6"
                />
              </div>
            </article>

            <article className="section-product__purchase">
              <div className="section-product__price product-card--price">
                <h3 className="product-card--new-price">
                  {`$${currentProduct.price}`}
                </h3>

                {currentProduct.discount !== 0 && (
                  <p className="product-card--old-price">
                    {`$${getPrevPrice(currentProduct.price, currentProduct.discount)}`}
                  </p>
                )}
              </div>

              <div className="section-product__buttons product-card--buttons">
                <button
                  type="button"
                  className="product-card--add-to-cart"
                  style={{ width: '263px', height: '48px' }}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="product-card--add-to-favorites"
                  style={{ width: '48px', height: '48px' }}
                  onClick={() => {
                    setStorage(
                      currentProduct.id, LocaleDataTypes.FAVORITES,
                    );
                    setIsFavorite(
                      !isAdded(currentProduct.id, LocaleDataTypes.FAVORITES),
                    );
                  }}
                >
                  {isFavorite ? <RedHeart /> : <WhiteHeart />}
                </button>
              </div>

              <div className="product-card--features">
                <div className="product-card--feature">
                  <h4 className="product-card--feature-title">CPU</h4>
                  <p className="product-card--feature-value">
                    {currentProductFeatures.hardware.cpu}
                  </p>
                </div>
                <div className="product-card--feature">
                  <p className="product-card--feature-title">
                    Battery stand by time
                  </p>
                  <p className="product-card--feature-value">
                    {currentProductFeatures.battery.standbyTime}
                  </p>
                </div>
                <div className="product-card--feature">
                  <p className="product-card--feature-title">Display</p>
                  <p className="product-card--feature-value">
                    {currentProductFeatures.display.screenResolution}
                  </p>
                </div>
              </div>
            </article>

            <article className="section-product__description">
              <h3 className="section-product__description--title">About</h3>

              <p
                className="section-product__description--paragraph"
                data-cy="productDescription"
              >
                {currentProductFeatures.description}
              </p>
            </article>

            <article className="section-product__description">
              <h3
                className="section-product__description--title"
              >
                Tech specs
              </h3>

              <div className="section-product__description--specs">
                <div className="section-product__description--feature">
                  <p className="section-product__description--feature--name">
                    Battery type
                  </p>

                  <p className="section-product__description--feature--value">
                    {currentProductFeatures.battery.type}
                  </p>
                </div>

                <div className="section-product__description--feature">
                  <p className="section-product__description--feature--name">
                    WiFi
                  </p>

                  <p className="section-product__description--feature--value">
                    {currentProductFeatures.connectivity.wifi}
                  </p>
                </div>

                {currentProductFeatures.camera.primary && (
                  <div className="section-product__description--feature">
                    <p className="section-product__description--feature--name">
                      Camera
                    </p>

                    <p className="section-product__description--feature--value">
                      {currentProductFeatures.camera.primary}
                    </p>
                  </div>
                )}
              </div>
            </article>
          </section>

          <section className="section">
            <SectionTopBar
              title="You may also like"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              productsPerPage={productsPerPage}
              filteredProducts={products}
            />

            <BrowseProducts
              visibleProducts={products}
              index={currentIndex}
            />
          </section>
        </main>
      )}
    </>
  );
};

export default ProductPage;
