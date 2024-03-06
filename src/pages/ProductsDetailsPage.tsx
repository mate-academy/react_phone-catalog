/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import {
  getIsAdded,
  getIsFavourite,
  getProductDetails,
  getProductPriceWithDiscount,
  getRandomInt,
  getWordWithUpperCaseFirstLetter,
  handleFavourites,
} from '../helpers/ProductMethods';
import { Loader } from '../components/Loader';
import { ProductDetails } from '../types/ProductDetails';
import { Product } from '../types/Product';
import { ProductSlider } from '../components/ProductsSlider';
import { ALSO_LIKE } from '../helpers/SliderTitle';
import { CartItem } from '../types/CartItem';

type Props = {
  products: Product[];
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};

export const ProductsDetailsPage: React.FC<Props> = ({
  products,
  setCartItems,
  cartItems,
  favourites,
  setFavourites,
}) => {
  const { productId } = useParams();
  const location = useLocation();
  const [productDetail, setProductDetail] = useState<ProductDetails>();
  const [currentImg, setCurrentImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(`/products/${productId}.json`)
      .then((details) => {
        setProductDetail(details);
        setCurrentImg(details.images[0]);
      })
      .finally(() => setIsLoading(false));

    const randProd = products
      .filter((prod) => prod.id !== productId)
      .slice(getRandomInt(0, 5), getRandomInt(5, products.length));

    setRandomProducts(randProd);
  }, [productId, products]);

  const productSelected = products.find((prod) => prod.id === productId);
  const product = location.pathname.split('/')[1];
  const breadcrumbName = getWordWithUpperCaseFirstLetter(product);

  const addToCart = (e: React.MouseEvent, selectedProduct: Product) => {
    e.preventDefault();
    const existingItem = cartItems.find(
      (item) => item.product.id === selectedProduct.id,
    );

    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      const newItem: CartItem = {
        id: selectedProduct.id,
        quantity: 1,
        product: selectedProduct,
      };

      setCartItems([newItem, ...cartItems]);
    }
  };

  const isAdded = getIsAdded(cartItems, productSelected);
  const isFavourite = getIsFavourite(favourites, productSelected);

  return (
    <div className="product-details">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-details__content">
          <div className="product-details__icons">
            <div className="page-path-icons product-details__breadcrumb">
              <NavLink to="/" className="icon icon--home" />
              <p className="icon icon--slider" />
              <NavLink
                to={`/${product}`}
                className="page-path-icons__location
              page-path-icons__location--bold"
              >
                {breadcrumbName}
              </NavLink>
              <p className="icon icon--slider" />
              <p className="page-path-icons__location">{productDetail?.name}</p>
            </div>

            <div className="page-path-icons product-details__back">
              <p className="icon icon--slider icon--left" />
              <NavLink
                to=".."
                className="page-path-icons__location page-path-icons__back"
              >
                Back
              </NavLink>
            </div>
          </div>

          <h1 className="product-details__title">{productDetail?.name}</h1>
          <div className="product-details__images-description">
            <div className="product-details__images">
              <div className="details-images">
                {productDetail?.images.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt="product-details"
                    className="details-images__img"
                    onClick={() => setCurrentImg(img)}
                  />
                ))}
              </div>
              <img
                src={currentImg}
                className="details-images__main-img"
                alt="main-details-img"
              />
            </div>

            <div className="product-details__right-side">
              <div className="product-details__price-block">
                {!!productSelected?.discount && (
                  <div className="price price--big">
                    {`$${getProductPriceWithDiscount(productSelected)}`}
                  </div>
                )}
                <div
                  className={cn('price', {
                    'price--nodiscount ': productSelected?.discount,
                  })}
                >
                  {`$${productSelected?.price}`}
                </div>
              </div>

              <div className="product-details__control">
                <button
                  className={cn('control-button control-button--big', {
                    'in-cart': isAdded,
                  })}
                  type="button"
                  onClick={(e) => addToCart(e, productSelected as Product)}
                >
                  {isAdded ? 'Added to cart' : 'Add to cart'}
                </button>
                <div className="product-details__favourites">
                  <button
                    className={cn(
                      'icon-button-favorities icon-button-favorities--big',
                      {
                        'icon-button-favorities--is-favourite': isFavourite,
                      },
                    )}
                    aria-label="icon-favorite"
                    type="button"
                    onClick={(e) => handleFavourites(
                      e,
                      isFavourite,
                      productSelected,
                      favourites,
                      setFavourites,
                    )}
                  />
                </div>
              </div>

              <div className="card-description card-description--details">
                <div className="card-description__description-dir">
                  <div className="card-description__description">
                    <div className="card-description__text">Screen</div>
                    <div className="card-description__element">
                      {productDetail?.display.screenSize}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">Resolution</div>
                    <div className="card-description__element">
                      {productDetail?.display.screenResolution}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">Processor</div>
                    <div className="card-description__element">
                      {productDetail?.hardware.cpu}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">RAM</div>
                    <div className="card-description__element">
                      {productDetail?.storage.ram}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details__text">
            <div className="product-details__info">
              <h1 className="product-details__title-description">About</h1>
              <p className="product-details__description">
                {productDetail?.description}
              </p>
            </div>

            <div className="product-details__info">
              <h1 className="product-details__title-description">Tech specs</h1>

              <div
                className="card-description card-description--details
              product-details__description-block"
              >
                <div className="card-description__description-dir">
                  <div className="card-description__description">
                    <div className="card-description__text">Screen</div>
                    <div className="card-description__element">
                      {productDetail?.display.screenSize}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">Resolution</div>
                    <div className="card-description__element">
                      {productDetail?.display.screenResolution}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">Weight</div>
                    <div className="card-description__element">
                      {productDetail?.sizeAndWeight.weight}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">RAM</div>
                    <div className="card-description__element">
                      {productDetail?.storage.ram}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">Flash memory</div>
                    <div className="card-description__element">
                      {productDetail?.storage.flash}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">Camera</div>
                    <div className="card-description__element">
                      {productDetail?.camera.primary}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">WiFi</div>
                    <div className="card-description__element">
                      {productDetail?.connectivity.wifi}
                    </div>
                  </div>

                  <div className="card-description__description">
                    <div className="card-description__text">Bluetooth</div>
                    <div className="card-description__element">
                      {productDetail?.connectivity.bluetooth}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details__slider">
            <ProductSlider
              products={randomProducts}
              sliderTitle={ALSO_LIKE}
              setCartItems={setCartItems}
              cartItems={cartItems}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          </div>
        </div>
      )}
    </div>
  );
};
