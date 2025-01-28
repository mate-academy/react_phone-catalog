import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductSpecs } from '../../components/ProductSpecs';
import { useEffect, useState } from 'react';
import { getProduct, getProducts } from '../../api/api';
import { ProductItemType } from '../../types/ProductItemType';
import { ProductType } from '../../types/ProductType';
import { getColorByName } from '../../utils/colors';
import {
  addFavourite,
  isFavourite,
  removeFavourite,
} from '../../api/favourites';
import { addToCart, isInCart, removeFromCart } from '../../api/cart';
import { scrollToTop } from '../../utils/scrollToTop';
import './Product.scss';

export const Product = () => {
  const [product, setProduct] = useState<ProductItemType | undefined>(
    undefined,
  );
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const { id } = useParams();
  const location = useLocation();
  const [inFavourites, setInFavourites] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleFavourite = () => {
    if (!product) {
      return;
    }

    if (inFavourites) {
      removeFavourite(product.id);
    } else {
      addFavourite(product.id);
    }

    setInFavourites(isFavourite(product.id));
  };

  const handleCart = () => {
    if (!product) {
      return;
    }

    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }

    setInCart(isInCart(product.id));
  };

  const fetchProduct = async () => {
    if (!id) {
      return;
    }

    const fetchedProduct = await getProduct(id);

    if (!fetchedProduct) {
      return;
    }

    setProduct(fetchedProduct);
    setInFavourites(isFavourite(id));
    setInCart(isInCart(id));
    setSelectedImage(fetchedProduct.images[0]);
  };

  const fetchSuggestions = async () => {
    const fetchedProducts = await getProducts({ shuffle: true, excludeId: id });

    setSuggestions(fetchedProducts.products);
  };

  useEffect(() => {
    scrollToTop();
    fetchProduct();
    fetchSuggestions();
  }, [id]);

  if (!product) {
    return;
  }

  const renderImages = () => (
    <div className="product__small-images">
      {product.images.map(image => (
        <div
          className="product__small-images-image square-container"
          key={image}
          onClick={() => {
            setSelectedImage(image);
          }}
        >
          <img src={image} alt="Product image" />
        </div>
      ))}
    </div>
  );

  const renderColors = () => (
    <div className="product__selector-container">
      {product.colorsAvailable.map(color => (
        <Link
          to={location.pathname.replace(product.color, color)}
          className={classNames('product__color-border', {
            'product__color-border--selected': product.color === color,
          })}
          key={color}
        >
          <div className="product__color-white-border">
            <div
              className="product__color"
              style={{ backgroundColor: getColorByName(color) }}
            ></div>
          </div>
        </Link>
      ))}
    </div>
  );

  const renderCapacities = () => (
    <div className="product__selector-container">
      {product.capacityAvailable.map(capacity => (
        <Link
          to={location.pathname.replace(
            product.capacity.toLowerCase(),
            capacity.toLowerCase(),
          )}
          className={classNames('product__capacity-button button', {
            'button--white': product.capacity !== capacity,
          })}
          key={capacity}
        >
          {capacity}
        </Link>
      ))}
    </div>
  );

  const category = product.category[0]
    .toUpperCase()
    .concat(product.category.slice(1));

  return (
    <div className="product">
      <Breadcrumbs
        paths={[
          { name: category, link: `/${category.toLowerCase()}` },
          { name: product.name },
        ]}
      />

      <div className="product__back-button">
        <BackButton />
      </div>

      <h2 className="product__title">{product.name}</h2>

      <div className="product__container">
        <div className="product__image square-container">
          <img src={selectedImage} alt="Image" />
        </div>

        {renderImages()}

        <div className="product__details">
          <p className="product__id product__id-mobile small-text">
            ID: {product.id}
          </p>

          <p className="product__details-name small-text">Available colors</p>
          {renderColors()}

          <div className="divider-line"></div>

          <p className="product__details-name small-text">Select capacity</p>
          {renderCapacities()}

          <div className="divider-line"></div>

          <div className="product__price-container">
            <h2 className="product__price h2--desktop">
              ${product.priceDiscount}
            </h2>

            <h3 className="product__old-price">${product.priceRegular}</h3>
          </div>

          <div className="product__buttons">
            <button
              className={classNames('product__cart-button', {
                'button--white button--white--small-padding button--green-text product__cart-button--green':
                  inCart,
              })}
              onClick={handleCart}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className="product__favourite-button button--white"
              onClick={handleFavourite}
            >
              <img
                src={
                  inFavourites
                    ? 'icons/favourite_filled.svg'
                    : 'icons/favourite.svg'
                }
                alt="Favourite icon"
              />
            </button>
          </div>

          <div className="product__specs-container">
            <ProductSpecs
              specs={{
                Screen: product.screen,
                Resolution: product.resolution,
                Processor: product.processor,
                RAM: product.ram,
              }}
            />
          </div>
        </div>

        <p className="product__id small-text">ID: {product.id}</p>
      </div>

      <div className="product__description">
        <div className="product__description-info">
          <h3>About</h3>

          <div className="divider-line"></div>

          <div className="product__description-info-container">
            {product.description.map(description => (
              <div
                className="product__description-info-block"
                key={description.title}
              >
                <h4 className="product__description-info-title">
                  {description.title}
                </h4>
                <p className="product__description-info-text body-text slim-text">
                  {description.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="product__description-specs">
          <h3>Tech specs</h3>

          <div className="divider-line"></div>

          <ProductSpecs
            specs={{
              Screen: product.screen,
              Resolution: product.resolution,
              Processor: product.processor,
              RAM: product.ram,
              Camera: product.camera,
              Zoom: product.zoom,
              Cell: product.cell,
            }}
            slimText={true}
          />
        </div>
      </div>

      <div className="product__slider">
        <ProductSlider products={suggestions} title="You may also like" />
      </div>
    </div>
  );
};
