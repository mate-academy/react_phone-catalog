import './ProductDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  findProductByItemId,
  getAllProducts,
  getSuggestedProducts,
} from '../../api/api';
import { AddButton } from '../../components/AddButton';
import { Loader } from '../../components/Loader';
import { RoundButton } from '../../components/RoundButton';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NotFoundPage } from '../NotFoundPage';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favoritesSlice';

export const ProductDetailsPage = () => {
  const { category, itemId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>(
    undefined,
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const [mainImage, setMainImage] = useState<string | null>(null);

  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isProductInFavorites, setIsProductInFavorites] = useState(false);

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const handleCartAction = async () => {
    if (product) {
      const allProducts = await getAllProducts();
      const currentProduct = allProducts.find(p => p.itemId === itemId);

      if (currentProduct) {
        if (isProductInCart) {
          dispatch(removeFromCart(currentProduct.itemId));
        } else {
          dispatch(addToCart(currentProduct));
        }
      }
    }
  };

  const handleFavoritesAction = async () => {
    if (product) {
      const allProducts = await getAllProducts();
      const currentProduct = allProducts.find(p => p.itemId === itemId);

      if (currentProduct) {
        if (isProductInFavorites) {
          dispatch(removeFromFavorites(currentProduct.itemId));
        } else {
          dispatch(addToFavorites(currentProduct));
        }
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      if (itemId && category) {
        const currentProduct = await findProductByItemId(itemId, category);

        setProduct(currentProduct);
      }

      setIsLoading(false);
    };

    fetchProduct();
  }, [itemId, category]);

  useEffect(() => {
    if (product) {
      setIsProductInCart(cart.some(p => p.itemId === itemId));
      setIsProductInFavorites(favorites.some(p => p.itemId === itemId));
    }
  }, [cart, favorites, product, itemId]);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product?.priceDiscount !== undefined) {
      getSuggestedProducts(product.priceDiscount).then(setSimilarProducts);
    }
  }, [product]);

  useEffect(() => {
    if (product?.capacityAvailable.length) {
      setSelectedCapacity(product.capacityAvailable[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color);
    }
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="container">
      <Breadcrumbs category={product?.category || ''} product={product?.name} />
      <div className="back">
        <div className="back__arrow"></div>
        <button className="back__btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
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
                      className={`product-details__color-select ${color === selectedColor ? 'product-details__color-select--selected' : ''}`}
                      key={color}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
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
                    onClick={() => setSelectedCapacity(capacity)}
                    className={
                      capacity === selectedCapacity
                        ? 'product-details__capacity-select--selected'
                        : 'product-details__capacity-select'
                    }
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

      <ProductsSlider title="You may also like" products={similarProducts} />
    </div>
  );
};
