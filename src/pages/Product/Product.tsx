import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductSpecs } from '../../components/ProductSpecs';
import { useEffect, useState } from 'react';
import { getProduct } from '../../api/api';
import { ProductItemType } from '../../types/ProductItemType';
import { NormalizeImagePath } from '../../utils/NormalizeImagePath';
import { getColorByName } from '../../utils/Colors';
import './Product.scss';
import {
  addFavourite,
  isFavourite,
  removeFavourite,
} from '../../api/favourites';
import { addToCart, isInCart, removeFromCart } from '../../api/cart';

export const Product = () => {
  const [product, setProduct] = useState<ProductItemType | undefined>(
    undefined,
  );
  const { id } = useParams();
  const location = useLocation();
  const [inFavourites, setInFavourites] = useState(false);
  const [inCart, setInCart] = useState(false);

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

    setProduct(fetchedProduct);
    setInFavourites(isFavourite(id));
    setInCart(isInCart(id));
  };

  useEffect(() => {
    fetchProduct();
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
        >
          <img src={NormalizeImagePath(image)} alt="Product image" />
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

  return (
    <div className="product">
      <Breadcrumbs
        paths={['Phones', 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)']}
      />
      <div className="product__back-button">
        <BackButton />
      </div>
      <h2 className="product__title">{product.name}</h2>
      <div className="product__container">
        <div className="product__image square-container">
          <img src={NormalizeImagePath(product.images[0])} alt="Image" />
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
                    ? '/icons/favourite_filled.svg'
                    : '/icons/favourite.svg'
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
        <ProductSlider products={[]} title="You may also like" />
      </div>
    </div>
  );
};
