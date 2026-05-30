import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { NavigationWay } from '../../components/NavigationWay/NavigationWay';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { PageNotFound } from '../../components/PageNotFound/PageNotFound';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../utils/api';
import { convertToProduct } from '../../utils/convert';
import { colors } from '../../constants/colors';
import favoriteIcon from '../../images/icons/favorites.svg';
import favoriteIconActive from '../../images/icons/favorites-active.svg';

import './ProductPage.scss';
import { getImagePath } from '../../utils/getImagePath';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, toggleFavorite, isFavorite } =
    useGlobalContext();

  const [allProducts, setAllProducts] = useState<ProductDetails[]>([]);
  const [current, setCurrent] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!productId) {
        setError('Product not found');
        setLoading(false);

        return;
      }

      setLoading(true);
      setError(null);

      try {
        const productsPhones = await getProductDetails('phones');
        const productsTablets = await getProductDetails('tablets');
        const productsAccessories = await getProductDetails('accessories');

        const all = [
          ...productsPhones,
          ...productsTablets,
          ...productsAccessories,
        ];

        setAllProducts(all);

        const urlCategory = window.location.hash.split('/')[1];

        const prod = all.find(p => p.id === productId);

        if (prod && prod.category !== urlCategory) {
          setError('Page not found');
          setCurrent(null);
          setLoading(false);

          return;
        }

        if (!prod) {
          setError('Product not found');
          setCurrent(null);
        } else {
          setCurrent(prod);
          setSelectedColor(prod.color ?? null);
          setSelectedCapacity(prod.capacity ?? null);
          setCurrentImageIndex(0);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading product');
        setCurrent(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  const getId = (p?: ProductDetails | null) => (p ? p.id : '');

  const inCart = useMemo(() => {
    if (!current) {
      return false;
    }

    return cart.some(c => c.itemId === convertToProduct(current).itemId);
  }, [current, cart]);

  const favourite = useMemo(() => {
    if (!current) {
      return false;
    }

    return isFavorite(convertToProduct(current).itemId);
  }, [current, isFavorite]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!current) {
      return;
    }

    const product = convertToProduct(current);

    if (inCart) {
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
    }
  };

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!current) {
      return;
    }

    toggleFavorite(convertToProduct(current));
  };

  const handleColorChange = (color: string) => {
    if (!current) {
      return;
    }

    setSelectedColor(color);
    const desiredCapacity = selectedCapacity ?? current.capacity;
    const candidate = allProducts.find(
      p =>
        p.namespaceId === current.namespaceId &&
        (p.color ?? '').toLowerCase() === color.toLowerCase() &&
        p.capacity === desiredCapacity,
    );

    if (candidate) {
      navigate(`/${current.category}/${candidate.id}`);
    } else {
      setSelectedColor(color);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    if (!current) {
      return;
    }

    setSelectedCapacity(capacity);
    const desiredColor = selectedColor ?? current.color;
    const candidate = allProducts.find(
      p =>
        p.namespaceId === current.namespaceId &&
        p.capacity === capacity &&
        (p.color ?? '').toLowerCase() === (desiredColor ?? '').toLowerCase(),
    );

    if (candidate) {
      navigate(`/${current.category}/${candidate.id}`);
    } else {
      setSelectedCapacity(capacity);
    }
  };

  const otherProducts = useMemo(() => {
    if (!allProducts || !current) {
      return [];
    }

    return allProducts
      .filter(
        p => p.category === current.category && getId(p) !== getId(current),
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }, [allProducts, current]);

  const otherProductsConverted = useMemo(
    () => otherProducts.map(p => convertToProduct(p)),
    [otherProducts],
  );

  if (loading) {
    return (
      <div className="product-page container">
        <NavigationWay category={current?.category ?? 'Loading...'} />
        <BackButton />
        <div className="product-page__loading">Loading...</div>
      </div>
    );
  }

  if (error || !current) {
    return (
      <div className="product-page container">
        <PageNotFound message={error ?? 'Product not found'} />
      </div>
    );
  }

  const images = current.images.length > 0 ? current.images : [];
  const currentImg = images[currentImageIndex] ?? images[0];
  const capacities = current.capacityAvailable ?? [current.capacity];
  const colorOptions = current.colorsAvailable ?? [current.color];

  return (
    <div className="product-page container">
      <NavigationWay category={current.category} productName={current.name} />
      <BackButton />
      <h2 className="product-page__product-name">{current.name}</h2>

      <div className="product-page__container">
        <div className="product-page__images">
          <div className="product-page__gallery">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={getImagePath(img)}
                className={`product-page__gallery--image ${
                  idx === currentImageIndex ? 'active' : ''
                }`}
                onClick={() => setCurrentImageIndex(idx)}
                alt={`${current.name} ${idx}`}
              />
            ))}
          </div>

          <img
            src={getImagePath(currentImg)}
            className="product-page__gallery--current-img"
            alt={current.name}
          />
        </div>

        <div className="product-page__select">
          <div className="product-page__options">
            <div className="product-page__option">
              <div className="product-page__option-title">Available colors</div>
              <div className="product-page__radio">
                {colorOptions.map((color, i) => {
                  const colorCode =
                    colors[color.toLowerCase() as keyof typeof colors];

                  return (
                    <button
                      key={i}
                      className={`product-page__color ${selectedColor === color ? 'selected' : ''}`}
                      title={color}
                      style={{ backgroundColor: colorCode || '#ccc' }}
                      onClick={() => handleColorChange(color)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="product-page__option">
              <div className="product-page__option-title">
                {current.category === 'accessories'
                  ? 'Select display'
                  : 'Select capacity'}
              </div>
              <div className="product-page__radio">
                {capacities.map((cap, i) => (
                  <button
                    key={i}
                    className={`product-page__capacity ${selectedCapacity === cap ? 'selected' : ''}`}
                    onClick={() => handleCapacityChange(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-page__prices">
            <div className="product-page__prices--discount">
              ${current.priceDiscount || current.priceRegular}
            </div>
            <div className="product-page__prices--full-price">
              ${current.priceRegular}
            </div>
          </div>

          <div className="product-page__add-to">
            <button
              className={`product-page__add-to--cart ${inCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
            >
              {inCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              className={`product-page__add-to--favourites ${favourite ? 'active' : ''}`}
              onClick={handleFavouriteClick}
            >
              <img
                src={favourite ? favoriteIconActive : favoriteIcon}
                alt={favourite ? 'Remove from favorites' : 'Add to favorites'}
              />
            </button>
          </div>

          <div className="product-page__specs">
            <div className="product-page__spec">
              <div className="product-page__spec--names">Screen</div>
              <div className="product-page__spec--values">{current.screen}</div>
            </div>
            <div className="product-page__spec">
              <div className="product-page__spec--names">Resolution</div>
              <div className="product-page__spec--values">
                {current.resolution}
              </div>
            </div>
            <div className="product-page__spec">
              <div className="product-page__spec--names">Processor</div>
              <div className="product-page__spec--values">
                {current.processor}
              </div>
            </div>
            <div className="product-page__spec">
              <div className="product-page__spec--names">RAM</div>
              <div className="product-page__spec--values">{current.ram}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-page__details">
        <div className="product-page__about">
          <h2 className="product-page__title">About</h2>
          {Array.isArray(current.description) &&
            current.description.map((block, i) => (
              <React.Fragment key={i}>
                {block.title && (
                  <h3 className="product-page__subtitle">{block.title}</h3>
                )}
                {block.text &&
                  block.text.map((t, j) => (
                    <p key={j} className="product-page__description">
                      {t}
                    </p>
                  ))}
              </React.Fragment>
            ))}
        </div>
        <div className="product-page__all-specifications">
          <h2 className="product-page__title">Tech specs</h2>
          <div className="product-page__specifications">
            <div className="product-page__specification">
              <div className="product-page__specification--names">Screen</div>
              <div className="product-page__specification--values">
                {current.screen}
              </div>
            </div>
            <div className="product-page__specification">
              <div className="product-page__specification--names">
                Resolution
              </div>
              <div className="product-page__specification--values">
                {current.resolution}
              </div>
            </div>
            <div className="product-page__specification">
              <div className="product-page__specification--names">
                Processor
              </div>
              <div className="product-page__specification--values">
                {current.processor}
              </div>
            </div>
            <div className="product-page__specification">
              <div className="product-page__specification--names">RAM</div>
              <div className="product-page__specification--values">
                {current.ram}
              </div>
            </div>
            <div className="product-page__specification">
              <div className="product-page__specification--names">
                Built in memory
              </div>
              <div className="product-page__specification--values">
                {current.capacity}
              </div>
            </div>
          </div>
          <div className="product-page__specification">
            <div className="product-page__specification--names">Camera</div>
            <div className="product-page__specification--values">
              {current.camera}
            </div>
          </div>
          <div className="product-page__specification">
            <div className="product-page__specification--names">Zoom</div>
            <div className="product-page__specification--values">
              {current.zoom}
            </div>
          </div>
          <div className="product-page__specification">
            <div className="product-page__specification--names">Cell</div>
            <div className="product-page__specification--values">
              {current.cell.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {otherProductsConverted.length > 0 && (
        <ProductsSlider
          title="You may also like"
          products={otherProductsConverted}
          displayType="fullPrice"
        />
      )}
    </div>
  );
};
