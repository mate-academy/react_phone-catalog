import { useParams } from 'react-router-dom';
import './ProductDetailsPage.scss';
import { useEffect, useState } from 'react';
import { findProductByItemId } from '../../api/api';
import { AddButton } from '../../components/AddButton';
import { RoundButton } from '../../components/RoundButton';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favoritesSlice';

export const ProductDetailsPage = () => {
  const { category, itemId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);

  const [mainImage, setMainImage] = useState<string | null>(null);

  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isProductInFavorites, setIsProductInFavorites] = useState(false);

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const handleCartAction = () => {
    if (product) {
      if (isProductInCart) {
        dispatch(removeFromCart(product.id));
      } else {
        dispatch(addToCart(product));
      }
    }
  };

  const handleFavoritesAction = () => {
    if (product) {
      if (isProductInFavorites) {
        dispatch(removeFromFavorites(product.id));
      } else {
        dispatch(addToFavorites(product));
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (itemId && category) {
        const curProduct = await findProductByItemId(itemId, category);

        setProduct(curProduct);
      }
    };

    fetchProduct();
  }, [itemId, category]);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    setIsProductInCart(cart.some(item => item.id === product?.id));
    setIsProductInFavorites(favorites.some(item => item.id === product?.id));
  }, [cart, favorites]);

  return (
    <div className="container">
      <div className="product-details">
        <div className="product-details__name">{product?.name}</div>
        <div className="product-details__info">
          <div className="product-details__galery">
            <img
              src={mainImage || undefined}
              alt="main"
              className="product-details__galery--main"
            />
            <div className="product-details__galery--thumbnails">
              {product?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`thumbnail-${index}`}
                  onClick={() => setMainImage(image)}
                  className="product-details__galery--thumbnail"
                />
              ))}
            </div>
          </div>
          <div className="product-details__summary">
            <div className="product-details__colors">
              <div className="product-details__colors-wrapper">
                <p>Available colors</p>
                <div className="product-details__color-selector">
                  {product?.colorsAvailable.map(color => (
                    <div
                      className="product-details__color-select"
                      key={color}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="product-details__product-id">ID: 802390</p>
            </div>
            <div className="product-details__divider"></div>
            <div className="product-details__capacity">
              <p>Select capacity</p>
              <div className="product-details__capacity-selector">
                {product?.capacityAvailable.map(capacity => (
                  <div
                    className="product-details__capacity-select"
                    key={capacity}
                  >
                    {capacity}
                  </div>
                ))}
              </div>
            </div>
            <div className="product-details__divider"></div>
            <div className="product-details__price">
              <div className="product-details__price--regular">
                ${product?.priceRegular}
              </div>
              <div className="product-details__price--discount">
                ${product?.priceDiscount}
              </div>
            </div>
            <div className="product-details__buttons">
              <AddButton
                text={isProductInCart ? 'Added' : 'Add to cart'}
                onClick={handleCartAction}
              />
              <RoundButton
                buttonType={isProductInFavorites ? 'fav-filled' : 'fav'}
                onClick={handleFavoritesAction}
              />
            </div>
            <div className="product-details__specs">
              <div className="product-details__specs-field">
                <p className="product-details__specs-name">Screen</p>
                <p className="product-details__specs-value">
                  {product?.screen}
                </p>
              </div>
              <div className="product-details__specs-field">
                <p className="product-details__specs-name">Resolution</p>
                <p className="product-details__specs-value">
                  {product?.resolution}
                </p>
              </div>
              <div className="product-details__specs-field">
                <p className="product-details__specs-name">Processor</p>
                <p className="product-details__specs-value">
                  {product?.processor}
                </p>
              </div>
              <div className="product-details__specs-field">
                <p className="product-details__specs-name">RAM</p>
                <p className="product-details__specs-value">{product?.ram}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__about">
          <div className="product-details__subtitle">About</div>
          <div className="product-details__divider"></div>
          <div className="product-details__about-description">
            {product?.description.map(description => (
              <div key={description.title}>
                <div className="product-details__about-description-title">
                  {description.title}
                </div>
                <div className="product-details__about-description-text">
                  {description.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="product-details__tech-spechs">
          <div className="product-details__subtitle">Tech specs</div>
          <div className="product-details__divider"></div>
          <div className="product-details__specs">
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">Screen</p>
              <p className="product-details__specs-value">{product?.screen}</p>
            </div>
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">Resolution</p>
              <p className="product-details__specs-value">
                {product?.resolution}
              </p>
            </div>
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">Processor</p>
              <p className="product-details__specs-value">
                {product?.processor}
              </p>
            </div>
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">RAM</p>
              <p className="product-details__specs-value">{product?.ram}</p>
            </div>
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">Built in memory</p>
              <p className="product-details__specs-value">
                {product?.capacity}
              </p>
            </div>
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">Camera</p>
              <p className="product-details__specs-value">{product?.camera}</p>
            </div>
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">Zoom</p>
              <p className="product-details__specs-value">{product?.zoom}</p>
            </div>
            <div className="product-details__specs-field">
              <p className="product-details__specs-name">Cell</p>
              <p className="product-details__specs-value">
                {product?.cell.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
