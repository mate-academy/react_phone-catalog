import classNames from 'classnames';
import {
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  getProductById,
  getProductDetailsById,
  getSuggestedProducts,
} from '../../helpers/api/fetchProducts';
import {
  getTechSpec,
} from '../../helpers/calc/helper';
import { Product, ProductDetails } from '../../types/Product';
import { BackButton } from '../BackButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { CapacityOptions } from '../CapacityOptions';
import { CartButton } from '../CartButton';
import { ColorOptions } from '../ColorOptions';
import { FavButton } from '../FavButton';
import { Loader } from '../Loader';
import {
  ProductDetailsAbout,
} from '../ProductDetailsAbout/ProductDetailsAbout';
import { ProductSlider } from '../ProductSlider';
import { TechSpecList } from '../TechSpecList';
import './style.scss';

export const ProductDetailsPage: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>();
  const [hasError, setHasError] = useState(false);
  const { pathname } = useLocation();
  const { productId = '' } = useParams();

  const fetchProductDetails = async (id: string) => {
    try {
      const detailsFromServer = await getProductDetailsById(id);

      setProductInfo(detailsFromServer);
      setSelectedImage(detailsFromServer?.images[0]);
    } catch {
      setHasError(true);
      setProductInfo(null);
    }
  };

  const fetchProduct = async () => {
    const productFromServer = await getProductById(productId);

    setProduct(productFromServer || null);
  };

  const fetchSuggestedProducts = async () => {
    const productsFromServer = await getSuggestedProducts();

    setSuggestedProducts(productsFromServer);
  };

  useEffect(() => {
    Promise.all([
      fetchProductDetails(productId),
      fetchProduct(),
      fetchSuggestedProducts(),
    ]);
  }, [productId]);

  const handleMainImageChange = (image: string) => {
    setSelectedImage(image);
  };

  const techSpecList = useMemo(() => {
    if (productInfo) {
      return getTechSpec(productInfo);
    }

    return [];
  }, [productInfo]);

  const techPreview = techSpecList.slice(0, 4);
  const colors = productInfo?.colorsAvailable || [];
  const capacityOptions = productInfo?.capacityAvailable || [];
  const isLoading = !productInfo && !hasError;

  return (
    <section className="product-info">
      <Breadcrumbs pathes={[pathname, product?.name || '']} />
      <BackButton />
      {productInfo && (
        <>
          <h2 className="product-info__name title title--large">
            {productInfo.name}
          </h2>
          <div className="product-info__content">
            <div className="product-info__images">
              {productInfo.images.map((image) => {
                const isSelected = image === selectedImage;

                return (
                  <button
                    className={classNames('product-info__image-btn', {
                      'product-info__image-btn--active': isSelected,
                    })}
                    key={image}
                    type="button"
                    onClick={() => handleMainImageChange(image)}
                  >
                    <img
                      className="product-info__image"
                      key={image}
                      src={image}
                      alt={image}
                    />
                  </button>
                );
              })}
            </div>

            <img
              className="product-info__main-image"
              src={selectedImage}
              alt={selectedImage}
            />

            <div className="product-info__short-description">
              <div className="product-info__options">
                <ColorOptions
                  currentProduct={productInfo}
                  colors={colors}
                />
              </div>

              <div className="product-info__options">
                <CapacityOptions
                  currentProduct={productInfo}
                  capacityOptions={capacityOptions}
                />
              </div>

              <div className="product-info__prices">
                <p className="product-info__price">
                  {`$${productInfo.priceDiscount}`}
                </p>
                <p className="product-info__fullprice">
                  {`$${productInfo.priceRegular}`}
                </p>
              </div>

              <div className="product-info__actions">
                {product && (
                  <>
                    <CartButton
                      width={273}
                      height={48}
                      product={product}
                    />

                    <FavButton
                      width={48}
                      height={48}
                      product={product}
                    />
                  </>
                )}
              </div>

              <div className="product-info__characteristics">
                <TechSpecList techSpecs={techPreview} />
              </div>
            </div>
          </div>

          <div className="product-info__description">
            <div className="product-info__about" data-cy="productDescription">
              <h3 className="product-info__subtitle">About</h3>
              <ProductDetailsAbout articles={productInfo.description} />
            </div>
            <div className="product-info__tech-spec">
              <h3 className="product-info__subtitle">Tech specs</h3>
              <div className="product-info__tech-text">
                <TechSpecList techSpecs={techSpecList} />
              </div>
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <Loader />
      )}

      {hasError && (
        <h1 className="title title--large">
          Phone was not found
        </h1>
      )}

      {suggestedProducts ? (
        <ProductSlider
          title="You may also like"
          products={suggestedProducts}
        />
      ) : (
        <Loader />
      )}
    </section>
  );
};
