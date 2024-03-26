/* eslint-disable max-len */
import { FC, useEffect, useState, useContext } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { LSCart } from '../../helpers/LSCart';
import { LSFav } from '../../helpers/LSFav';
import { Loader } from '../../components/Loader';
import './ProductDetailsPage.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider';
import { CartContext } from '../../store/CartContext';
import { FavContext } from '../../store/FavContext';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { BackBtn } from '../../components/BackBtn/BackBtn';
import { getData } from '../../helpers/getData';

export const ProductDetailsPage: FC = () => {
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState('');
  const [favProduct, setFavProduct] = useState(false);

  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [product, setProduct] = useState<Product>();
  const [suggestedProduct, setSuggestedProduct] = useState<Product[]>([]);
  const [productInCart, setProductInCart] = useState(false);
  const [notFoundPhone, setNotFoundPhone] = useState(false);

  const { setCartQuantity } = useContext(CartContext);
  const { setFavQuantity } = useContext(FavContext);

  useEffect(() => {
    setIsLoading(true);
    setNotFoundPhone(false);
    if (productId) {
      setProductInCart(LSCart.checkProductInLSCart(productId));
      getData
        .getProductDetails(productId)
        .then(data => {
          setProductDetails(data);
        })
        .catch(() => {
          setNotFoundPhone(true);
        })
        .finally(() => setIsLoading(false));

      getData
        .getProduct(productId)
        .then(data => {
          setProduct(data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  useEffect(() => {
    getData.getSuggestedProducts().then(data => setSuggestedProduct(data));
  }, []);

  useEffect(() => {
    if (product) {
      setZoomedPhoto(product.image);
      setFavProduct(LSFav.checkLSFav(product.id));
    }
  }, [product]);

  const cartBtnHandler = (item: Product) => {
    if (!LSCart.checkProductInLSCart(item.id)) {
      setCartQuantity(prev => prev + 1);
    }

    LSCart.addToLSCart(item);
    setProductInCart(true);
  };

  const favBtnHandler = (item: Product) => {
    if (LSFav.checkLSFav(item.id)) {
      setFavQuantity(prev => prev - 1);
    } else {
      setFavQuantity(prev => prev + 1);
    }

    setFavProduct(prev => !prev);
    LSFav.addToLSFav(item);
  };

  return (
    <>
      {isLoading && <Loader />}
      {notFoundPhone && (
        <main className="page">
          <h1 className="product__title">Product was not found</h1>
        </main>
      )}
      {!isLoading && productDetails && product && (
        <main className="page">
          <BreadCrumbs
            link={`${product.category}`}
            name={productDetails.name}
          />

          <BackBtn />

          <h2 className="product__title">{productDetails.name}</h2>

          <div className="product__details">
            <div className="product__images">
              {productDetails.images.map((img, id) => {
                return (
                  <div
                    className={cn('product__images-item', {
                      active: img === zoomedPhoto,
                    })}
                  >
                    <img
                      className="product__images-element"
                      src={`../_new/${img}`}
                      alt={`${product?.name} ${id + 1}`}
                      key={img}
                      onMouseEnter={() => {
                        setZoomedPhoto(img);
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="product__image_container">
              <img
                className="product__image_photo"
                src={`../_new/${zoomedPhoto}`}
                alt="zoomed product"
              />
            </div>

            <div className="product__params params">
              {/* Available colors */}
              <div className="params__block">
                <div className="params__title">Available colors</div>
                <div className="params__variants">
                  <div className="params__variant_color params__variant_color-gold" />
                  <div className="params__variant_color params__variant_color-green" />
                  <div className="params__variant_color params__variant_color-black" />
                  <div className="params__variant_color params__variant_color-white" />
                </div>
              </div>
              {/* Select capacity */}
              <div className="params__block">
                <div className="params__title">Select capacity</div>
                <div className="params__variants">
                  <div className="params__variant_capacity params__variant_capacity-active">
                    64 gb
                  </div>
                  <div className="params__variant_capacity params__variant_capacity">
                    256 gb
                  </div>
                  <div className="params__variant_capacity params__variant_capacity">
                    512 gb
                  </div>
                </div>
              </div>
              <div className="params__price-block">
                <div className="params__new-price">${product.price}</div>
                <div className="params__old-price">${product.fullPrice}</div>
              </div>

              <div className="params__buttons">
                <button
                  type="button"
                  className={cn({
                    'params__cart-btn-empty': !productInCart,
                    'params__cart-btn': productInCart,
                  })}
                  onClick={() => {
                    cartBtnHandler(product);
                  }}
                >
                  {productInCart ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className={cn('params__fav-btn', {
                    'params__fav-btn--active': favProduct,
                  })}
                  onClick={() => favBtnHandler(product)}
                  data-cy="addToFavorite"
                >
                  fav
                </button>
              </div>
              <ul className="params__top-specs">
                {product?.screen && (
                  <li className="params__top-spec">
                    <span className="params__top-spec--title">Screen</span>
                    <span className="params__top-spec--value">
                      {product?.screen}
                    </span>
                  </li>
                )}
                {product?.capacity && (
                  <li className="params__top-spec">
                    <span className="params__top-spec--title">Capacity</span>
                    <span className="params__top-spec--value">
                      {product.capacity}
                    </span>
                  </li>
                )}
                {product?.ram && (
                  <li className="params__top-spec">
                    <span className="params__top-spec--title">RAM</span>
                    <span className="params__top-spec--value">
                      {product.ram}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <div className="product__code">
              <span className="product__id">ID: {product?.id}</span>
            </div>

            <div className="product__about" data-cy="productDescription">
              <span className="product__about--title">About</span>
              <p className="product__about--description">
                {productDetails.description[0].title}
              </p>
            </div>
            <div className="product__tech">
              <span className="product__tech--title">Tech specs</span>
              <ul className="product__specs_list">
                <li className="product__specs_item">
                  <span className="product__specs_item--title">Processor</span>
                  <span className="product__specs_item--value">
                    {productDetails.processor}
                  </span>
                </li>
                <li className="product__specs_item">
                  <span className="product__specs_item--title">Camera</span>
                  <span className="product__specs_item--value">
                    {productDetails.camera}
                  </span>
                </li>
                <li className="product__specs_item">
                  <span className="product__specs_item--title">
                    Screen Size
                  </span>
                  <span className="product__specs_item--value">
                    {productDetails.screen}
                  </span>
                </li>
                <li className="product__specs_item">
                  <span className="product__specs_item--title">
                    Screen Resolution
                  </span>
                  <span className="product__specs_item--value">
                    {productDetails.resolution}
                  </span>
                </li>
                <li className="product__specs_item">
                  <span className="product__specs_item--title">RAM</span>
                  <span className="product__specs_item--value">
                    {productDetails.ram}
                  </span>
                </li>
                <li className="product__specs_item">
                  <span className="product__specs_item--title">Zoom</span>
                  <span className="product__specs_item--value">
                    {productDetails.zoom}
                  </span>
                </li>
                <li className="product__specs_item">
                  <span className="product__specs_item--title">Capacity</span>
                  <span className="product__specs_item--value">
                    {productDetails.capacity}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <ProductsSlider
            products={suggestedProduct}
            sliderTitle="You may also like"
          />
        </main>
      )}
    </>
  );
};
