import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import * as productsService from '../../services/productsService';
import { getFinalPrice } from '../../utils/productsHelper';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { BackLink } from '../../components/BackLink';
import { CartButton } from '../../components/CartButton';
import { FavouritesButton } from '../../components/FavouritesButton';
import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const { productId } = useParams();

  const finalPrice = product
    ? getFinalPrice(product.price, product.discount)
    : 0;

  const images = useMemo(() => {
    return details ? [...details.images] : [];
  }, [details]);

  const [displayedImage, setDisplayedImage] = useState(0);

  useEffect(() => {
    if (productId) {
      productsService.getProductDetails(productId)
        .then(setDetails)
        .finally(() => setIsLoading(false));

      productsService.getProductById(productId)
        .then(setProduct);
    }

    productsService.getSuggestedProducts(productId)
      .then(setSuggestedProducts);

    setDisplayedImage(0);
  }, [productId]);

  useEffect(() => {
    if (product) {
      setCategory(() => {
        return product.type === 'accessory'
          ? 'Accessories'
          : `${product.type.slice(0, 1).toUpperCase()}${product.type.slice(1)}s`;
      });
    }
  }, [product]);

  return (
    <div className="ProductDetailsPage">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {(!details || !product) ? (
            <>
              <BackLink />
              <h1>Product was not found</h1>
            </>
          ) : (
            <>
              <Breadcrumbs category={category} product={details.name} />

              <BackLink />

              <h1 className="ProductDetailsPage__title">{details.name}</h1>

              <div className="ProductDetailsPage__content">
                <p className="ProductDetailsPage__info-id">{`ID: ${productId}`}</p>

                <div className="ProductDetailsPage__wrapper">
                  <div className="ProductDetailsPage__images">
                    <div className="ProductDetailsPage__all-images">
                      {images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          className={cn('ProductDetailsPage__image-wrapper', {
                            'ProductDetailsPage__image-wrapper--selected':
                            index === displayedImage,
                          })}
                          onClick={() => setDisplayedImage(index)}
                        >
                          <img
                            src={image}
                            alt={details.name}
                            className="ProductDetailsPage__image"
                          />
                        </button>
                      ))}
                    </div>

                    <div
                      className="ProductDetailsPage__displayed-image-wrapper"
                    >
                      <TransitionGroup component={null}>
                        <CSSTransition
                          key={displayedImage}
                          timeout={300}
                          classNames="slide"
                        >
                          <img
                            src={images[displayedImage]}
                            alt={details.name}
                            className="ProductDetailsPage__displayed-image"
                          />
                        </CSSTransition>
                      </TransitionGroup>
                    </div>
                  </div>

                  <div className="ProductDetailsPage__info">
                    <div className="ProductDetailsPage__prices">
                      <h1 className="ProductDetailsPage__new-price">
                        {`$${finalPrice}`}
                      </h1>

                      {!!product.discount && (
                        <h2 className="ProductDetailsPage__old-price">{`$${product.price}`}</h2>
                      )}
                    </div>

                    <div className="ProductDetailsPage__buttons">
                      <div className="ProductDetailsPage__add-button">
                        <CartButton product={product} />
                      </div>

                      <div className="ProductDetailsPage__favourites-button">
                        <FavouritesButton product={product} />
                      </div>
                    </div>

                    <div className="ProductDetailsPage__details">
                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">
                          Screen
                        </p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.display.screenSize || '-'}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">
                          Resolution
                        </p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.display.screenResolution || '-'}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">
                          Processor
                        </p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.hardware.cpu || '-'}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">RAM</p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.storage.ram || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ProductDetailsPage__wrapper">
                  <div
                    className="ProductDetailsPage__about"
                    data-cy="productDescription"
                  >
                    <h2 className="ProductDetailsPage__about-title">About</h2>
                    <p className="ProductDetailsPage__about-text">
                      {details.description}
                    </p>
                  </div>

                  <div className="ProductDetailsPage__specs">
                    <h2 className="ProductDetailsPage__specs-title">
                      Tech specs
                    </h2>
                    <div className="ProductDetailsPage__specs-wrapper">
                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">Screen</p>
                        <p>{details.display.screenSize || '-'}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          Resolution
                        </p>
                        <p>{details.display.screenResolution || '-'}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          Processor
                        </p>
                        <p>{details.hardware.cpu || '-'}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">RAM</p>
                        <p>{details.storage.ram || '-'}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          Built in memory
                        </p>
                        <p>{details.storage.flash || '-'}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">Camera</p>
                        <p>{details.camera.primary || '-'}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          Android OS
                        </p>
                        <p>{details.android.os || '-'}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          Bluetooth
                        </p>
                        <p>{details.connectivity.bluetooth || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__suggested">
                <h1 className="ProductDetailsPage__suggested-title">
                  You may also like
                </h1>
                <ProductsSlider products={suggestedProducts} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
