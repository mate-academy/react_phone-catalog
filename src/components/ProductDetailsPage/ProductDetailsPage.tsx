import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  getProductById,
  getProductDetailsById,
  getSuggestedProducts,
} from '../../helpers/api/fetchProducts';
import {
  createCartItem,
  getCorrectColor,
  getProductOptionLink,
} from '../../helpers/calc/helper';
import { Product, ProductDetails } from '../../types/Product';
import { BackButton } from '../BackButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { CartContext } from '../contexts/CartContextProvider';
import { FavContext } from '../contexts/FavContextProvider';
import { Loader } from '../Loader';
import {
  ProductDetailsAbout,
} from '../ProductDetailsAbout/ProductDetailsAbout';
import { ProductSlider } from '../ProductSlider';
import './style.scss';

export const ProductDetailsPage: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>();
  const { pathname } = useLocation();
  const { productId = '' } = useParams();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { favItems, addToFav, removeFromFav } = useContext(FavContext);

  const fetchProductDetails = async (id: string) => {
    try {
      const detailsFromServer = await getProductDetailsById(id);

      setProductInfo(detailsFromServer);
      setSelectedImage(detailsFromServer?.images[0]);
    } catch {
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

  const isInCart = cart
    ?.find(cartItem => cartItem.product.phoneId === productId);

  const isInFav = favItems?.find(({ id }) => id === product?.id);

  const handleCartToggle = async () => {
    if (isInCart && removeFromCart && product) {
      removeFromCart(product?.id);
    } else if (addToCart && product) {
      const cartItem = createCartItem(product);

      addToCart(cartItem);
    }
  };

  const handleFavToggle = async () => {
    if (isInFav && removeFromFav && product) {
      removeFromFav(product.id);
    } else if (addToFav && product) {
      addToFav(product);
    }
  };

  return (
    <section className="product-info">
      <Breadcrumbs pathes={[pathname, product?.name || '']} />
      <BackButton />
      {productInfo ? (
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
                <p className="product-info__options-title">
                  Available colors
                </p>
                <div className="product-info__options-body">
                  {productInfo.colorsAvailable.map(color => {
                    const isActive = productInfo.color === color;
                    const to = getProductOptionLink(productInfo, color);
                    const correctColor = getCorrectColor(color);

                    return (
                      <Link
                        to={`../${to}`}
                        key={color}
                      >
                        <div className={classNames('product-info__color-wrap', {
                          'product-info__color-wrap--active': isActive,
                        })}
                        >
                          <div
                            style={{ backgroundColor: correctColor }}
                            className="product-info__color"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="product-info__options">
                <p className="product-info__options-title">
                  Select capacity
                </p>
                <div className="product-info__options-body">
                  {productInfo.capacityAvailable.map(memory => {
                    const isActive = memory === productInfo.capacity;
                    const to
                      = getProductOptionLink(productInfo, undefined, memory);

                    return (
                      <Link
                        key={memory}
                        to={`../${to}`}
                        type="button"
                        className={classNames('product-info__capacity-btn', {
                          'product-info__capacity-btn--active': isActive,
                        })}
                      >
                        {memory}
                      </Link>
                    );
                  })}
                </div>
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
                <button
                  type="button"
                  className={classNames(
                    'button',
                    'button--primary',
                    'product-info__cart-btn', {
                      'button--selected': isInCart,
                    },
                  )}
                  onClick={handleCartToggle}
                >
                  {isInCart ? 'In cart' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className="product-info__fav-btn"
                  onClick={handleFavToggle}
                >
                  <i className={classNames('icon', 'icon--fav', {
                    'icon--fav-active': isInFav,
                  })}
                  />
                </button>
              </div>

              <div className="product-info__characteristics">
                <div className="product-info__pair">
                  <div className="product-info__property">Screen</div>
                  <div className="product-info__value">
                    {productInfo.screen}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Resolution</div>
                  <div className="product-info__value">
                    {productInfo.resolution}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Proccesor</div>
                  <div className="product-info__value">
                    {productInfo.processor}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">RAM</div>
                  <div className="product-info__value">{productInfo.ram}</div>
                </div>
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
                <div className="product-info__pair">
                  <div className="product-info__property">Screen</div>
                  <div className="product-info__value">
                    {productInfo.screen}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Resolution</div>
                  <div className="product-info__value">
                    {productInfo.resolution}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Proccesor</div>
                  <div className="product-info__value">
                    {productInfo.processor}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">RAM</div>
                  <div className="product-info__value">{productInfo.ram}</div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Built in memory</div>
                  <div className="product-info__value">
                    {productInfo.capacity}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Camera</div>
                  <div className="product-info__value">
                    {productInfo.camera}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Zoom</div>
                  <div className="product-info__value">
                    {productInfo.zoom}
                  </div>
                </div>

                <div className="product-info__pair">
                  <div className="product-info__property">Cell</div>
                  <div className="product-info__value">
                    {productInfo.cell.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {suggestedProducts ? (
            <ProductSlider
              title="You may also like"
              products={suggestedProducts}
            />
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <h1 className="title title--large">
          Phone was not found
        </h1>
      )}
    </section>
  );
};
