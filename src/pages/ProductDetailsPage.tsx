import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import classNames from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ProductBlock } from '../components/ProductBlock';
import '../styles/details.scss';
import {
  getSalePrice,
  getGoodsLink,
  getUrlData,
} from '../helpers/helpers';
import { ProductDetails } from '../types/ProductDetails';
import { getProductDetails } from '../api/products';
import { Loader } from '../components/Loader';
import { CatalogContext } from '../context';
import { AddToCartButton } from '../components/AddToCartButton/AddToCartButton';
import { FavouriteButton } from '../components/FavouriteButton/FavouriteButton';
import { NoResults } from '../components/NoResults/NoResults';

export const ProductDetailsPage = () => {
  const { products } = useContext(CatalogContext);
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const productData = getUrlData(params.productId as string);

  const loadDetails = async () => {
    if (!productData) {
      return;
    }

    setIsLoading(true);
    try {
      const loadedData = await getProductDetails(
        productData?.name,
        productData?.model,
      );

      setDetails(loadedData);
    } catch {
      throw new Error('Unable to load details!');
    } finally {
      setIsLoading(false);
    }
  };

  const onPhotoChange = useCallback(
    (id: number) => setCurrentPhoto(id), [currentPhoto],
  );

  useEffect(() => {
    loadDetails();
  }, [params]);

  const product = useMemo(
    () => products.find(item => item.id === params.productId), [products],
  );

  const visibleProducts = products.filter(item => item.age <= 1);
  const priceWithDiscount = product && getSalePrice(
    product?.price, product?.discount,
  );

  const getProductSpecs = useCallback(
    () => {
      return {
        Screen: `${details?.screen}" OLED`,
        Resolution: details?.resolution,
        Processor: details?.processor,
        RAM: details?.ram,
        'Built in memory': product?.capacity,
        Camera: details?.camera,
        Zoom: details?.zoom,
        Cell: details?.cell,
      };
    }, [details, product],
  );

  const specs: { [key: string]: string | undefined } = getProductSpecs();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="details">
      {product && productData && !isLoading ? (
        <div className="container">
          <BreadCrumbs />
          <button
            type="button"
            className="details__back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <h1 className="details__title-head">
            {product?.name}
          </h1>

          <div className="details__wrapper details__wrapper--top">
            <div className="details__photos">
              <div className="details__photos-sml">
                {[1, 2, 3].map(photoId => (
                  <button
                    type="button"
                    key={photoId}
                    className={classNames(
                      'details__photo-btn',
                      {
                        'details__photo-btn--active': photoId === currentPhoto,
                      },
                    )}
                    onClick={() => onPhotoChange(photoId)}
                  >
                    <img
                      className="details__img-sml"
                      src={`./img/apple/${productData?.name}-${productData?.model}-${productData?.color}-${photoId}.jpg`}
                      alt="phone"
                    />
                  </button>
                ))}
              </div>

              <div className="details__photo-l">
                <img
                  className="details__img-l"
                  src={`./img/apple/${productData?.name}-${productData?.model}-${productData?.color}-${currentPhoto}.jpg`}
                  alt="phone"
                />
              </div>
            </div>

            <div className="details__actions">
              <div className="details__holder">
                <span className="details__label">
                  Available colors
                </span>

                <div className="details__actions-links">
                  {details?.colors.map(({ color, hex }) => (
                    <Link
                      key={hex}
                      to={getGoodsLink(
                        product?.type,
                        productData?.name,
                        productData?.model,
                        color,
                        productData?.capacity,
                      )}
                      className={classNames(
                        'details__color-link',
                        {
                          'details__color-link--active': (
                            productData?.color === color
                          ),
                        },
                      )}
                      style={{ backgroundColor: `${hex}` }}
                    />
                  ))}
                </div>

                <span className="details__label">
                  Select capacity
                </span>
                <div className="details__actions-links">
                  {details?.capacity.map(cap => (
                    <Link
                      key={cap}
                      to={getGoodsLink(
                        product?.type,
                        productData?.name,
                        productData?.model,
                        productData?.color,
                        cap,
                      )}
                      className={classNames(
                        'details__capacity-link',
                        { 'details__capacity-link--active': `${cap}` === (productData?.capacity) },
                      )}
                    >
                      {`${cap}`}
                    </Link>
                  ))}
                </div>

                {product?.discount ? (
                  <div className="details__price">
                    {`$${priceWithDiscount}`}
                    <span className="details__price--sale">
                      {`$${product?.price}`}
                    </span>
                  </div>
                ) : (
                  <div className="details__price">
                    {`$${product?.price}`}
                  </div>
                )}

                <div className="details__buttons">
                  {product && (
                    <>
                      <AddToCartButton height="48px" product={product} />

                      <FavouriteButton size="48px" product={product} />
                    </>
                  )}
                </div>

                <div className="details__specs">
                  <div className="details__specs-row">
                    <span className="details__specs-title">
                      Screen
                    </span>
                    <span className="details__specs-value">
                      {`${details?.screen}" OLED`}
                    </span>
                  </div>

                  <div className="details__specs-row">
                    <span className="details__specs-title">
                      Resolution
                    </span>

                    <span className="details__specs-value">
                      {details?.resolution}
                    </span>
                  </div>

                  <div className="details__specs-row">
                    <span className="details__specs-title">
                      Processor
                    </span>

                    <span className="details__specs-value">
                      {details?.processor}
                    </span>
                  </div>

                  <div className="details__specs-row">
                    <span className="details__specs-title">
                      RAM
                    </span>
                    <span className="details__specs-value">
                      {details?.ram}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="details__wrapper">
            <div className="details__block details__block-about">
              <h2 className="details__title-h2">
                About
              </h2>

              <div className="details__feature-descp">
                <h3 className="details__title-h3">
                  And then there was Pro
                </h3>

                <p className="details__text">
                  A transformative triple‑camera system
                  that adds tons of capability without complexity.

                  An unprecedented leap in battery life.
                  And a mind‑blowing chip that doubles down on machine learning
                  and pushes the boundaries of what a smartphone can do.
                  Welcome to the first iPhone powerful enough to be called Pro.
                </p>
              </div>
              <div className="details__feature-descp">
                <h3 className="details__title-h3">
                  Camera
                </h3>

                <p className="details__text">
                  Meet the first triple‑camera system
                  to combine cutting‑edge technology
                  with the legendary simplicity of iPhone.
                  Capture up to four times more scene.
                  Get beautiful images in drastically lower light.
                  Shoot the highest‑quality video
                  in a smartphone — then edit with
                  the same tools you love for photos.
                  You’ve never shot with anything like it.
                </p>
              </div>
              <div className="details__feature-descp">
                <h3 className="details__title-h3">
                  Shoot it. Flip it. Zoom it.
                  Crop it. Cut it. Light it.
                  Tweak it. Love it.
                </h3>

                <p className="details__text">
                  iPhone 11 Pro lets you capture videos that
                  are beautifully true to life,
                  with greater detail and smoother motion.
                  Epic processing power means it can shoot 4K video
                  with extended dynamic range and
                  cinematic video stabilization — all at 60 fps.
                  You get more creative control, too, with four times more scene
                  and powerful new editing tools to play with.
                </p>
              </div>
            </div>

            <div className="details__block-specs">
              <h2 className="details__title-h2">
                Tech specs
              </h2>

              <div className="details__specs">
                {Object.keys(specs).map(spec => (
                  <div className="details__specs-row">
                    <span className="details__specs-title details__text">
                      {spec}
                    </span>
                    <span className="details__specs-value details__text">
                      {specs[spec]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ProductBlock
            sectionTitle="You may also like"
            products={visibleProducts}
          />
        </div>
      ) : (
        <NoResults name="Product" />
      )}
    </section>
  );
};
