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
import { DetailsAbout } from '../components/DetailsAbout';
import { DetailsPhotos } from '../components/DetailsPhotos';
import { DetailsSpecs } from '../components/DetailsSpecs';

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

  const product = useMemo(() => (
    products.find(item => item.id === params.productId)
  ), [products]);

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
  const specsPreview = useMemo(() => Object.keys(specs).slice(0, 4), []);

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
            <DetailsPhotos
              productData={productData}
              currentPhoto={currentPhoto}
              onPhotoChange={onPhotoChange}
            />

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

                <div className="details__price">
                  {product?.discount ? (
                    <>
                      {`$${priceWithDiscount}`}
                      <span className="details__price--sale">
                        {`$${product?.price}`}
                      </span>
                    </>
                  ) : (`$${product?.price}`)}
                </div>

                <div className="details__buttons">
                  {product && (
                    <>
                      <AddToCartButton height="48px" product={product} />

                      <FavouriteButton size="48px" product={product} />
                    </>
                  )}
                </div>

                <DetailsSpecs keys={specsPreview} specs={specs} />
              </div>
            </div>
          </div>

          <div className="details__wrapper">
            <DetailsAbout />

            <div className="details__block-specs">
              <h2 className="details__title-h2">
                Tech specs
              </h2>

              <DetailsSpecs
                keys={Object.keys(specs)}
                specs={specs}
                extraClass="details__text"
              />
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
