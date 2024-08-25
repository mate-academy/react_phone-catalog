import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { EmptyPage } from '../EmptyPage';
import { colorCodes } from '../../colorCodes/colorCodes';
import { Goods } from '../../types';
import { getData, getProductsByName } from '../../api/api';
import { useProductCategoryContext } from '../../context/ProductCategoryProvider';
import { PriceDisplay } from '../../components/PriceDisplay';
import { CartControls } from '../../components/CartControls';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './ProductDetailPage.scss';
import '../../components/PhoneSpecs/PhoneSpecs.scss';
import { NewItems } from '../../components/NewItems';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { productType } = useProductCategoryContext();
  const { addToCart, removeItem, isInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  const [product, setProduct] = useState<Goods | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>(undefined);
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const renderCount = useRef(0);

  const allProducts = useRef<Goods[]>([]);
  const serialNumberRef = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Render count: ${renderCount.current}, productId: ${productId}`);
  }, [productId]);

  const assignSerialNumbers = (products: Goods[]): Goods[] => {
    return products.map((product) => ({
      ...product,
      serialNumber: serialNumberRef.current++,
    }));
  };

  const loadProduct = useCallback(async () => {
    if (!productId) {
      console.error('Product ID is undefined.');
      return;
    }

    try {
      const fetchedProduct: Goods | null = await getData(productType, productId);

      if (!fetchedProduct) {
        setProduct(null);
        return;
      }

      let products: Goods[] = await getProductsByName(productType, fetchedProduct.namespaceId);
      products = assignSerialNumbers(products);

      allProducts.current = products;
      console.log('All products:', allProducts.current);

      const updatedProduct = products.find((p) => p.id === fetchedProduct.id) || null;

      setProduct(updatedProduct);
      setActiveImage(updatedProduct?.images[0] || null);
      setSelectedColor(updatedProduct?.color);
      setSelectedCapacity(updatedProduct?.capacity);

      setIsAdded(isInCart(updatedProduct?.id || ''));
      setIsLiked(isInFavorites(updatedProduct?.id || ''));
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProduct(null);
    }
  }, [productId, productType, isInCart, isInFavorites]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    if (product && selectedColor) {
      const updatedProductIndex = product.colorsAvailable.findIndex((color) => color === selectedColor);
      if (updatedProductIndex !== -1 && product.images[updatedProductIndex]) {
        setActiveImage(product.images[updatedProductIndex]);
      } else {
        setActiveImage(product.images[0] || null);
      }
    }
  }, [selectedColor, product]);

  const handleColorChange = useCallback((color: string) => {
    if (product) {
      setSelectedColor(color);
      const newProductId = product.id.replace(/-[^-]+$/, `-${color}`);
      navigate(`/${productType}/${newProductId}`);
    }
  }, [product, navigate, productType]);

  const handleCapacityChange = useCallback(async (capacity: string) => {
    if (product && capacity !== selectedCapacity) {
      try {
        let products = (await getProductsByName(productType, product.namespaceId)) as Goods[];
        products = assignSerialNumbers(products);
        const updatedProduct = products.find((p) => p.color === selectedColor && p.capacity === capacity);
        if (updatedProduct) {
          const newProductId = updatedProduct.id;
          setProduct(updatedProduct);
          setActiveImage(updatedProduct.images[0]);
          setSelectedCapacity(capacity);
          navigate(`/${productType}/${newProductId}`);
        } else {
          console.error('Product with selected color and capacity not found.');
        }
      } catch (error) {
        console.error('Error fetching updated product data:', error);
      }
    }
  }, [product, navigate, productType, selectedColor, selectedCapacity]);

  const handleAddToCart = () => {
    if (product) {
      if (isAdded) {
        removeItem(product.id);
      } else {
        addToCart(product);
      }
      setIsAdded(!isAdded);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      if (isLiked) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
      setIsLiked(!isLiked);
    }
  };

  if (!product) {
    return <EmptyPage />;
  }

  const getRecommendedPhones = (phones: Goods[], modelName: string): Goods[] => {
    const modelPattern = /\b\d+\b/;
    const match = modelName.match(modelPattern);
    const model = match ? match[0] : '';

    if (!model) {
      return [];
    }

    return phones.filter(phone => {
      const phoneModelMatch = phone.name.match(modelPattern);
      return phoneModelMatch && phoneModelMatch[0] === model;
    }).slice(0, 10);
  };


  const recommendedPhones = getRecommendedPhones(allProducts.current, product.name);

  const productNameWithCapacity = `${product.name.replace(/(\d+GB|\d+TB)/, selectedCapacity || '')}`;

  return (
    <div className="container">
      <BackButton
        title="Phones"
        isFullDetailsOfProduct={true}
        nameProduct={productNameWithCapacity}
      />
      <div className="productDetail">
        <h1 className="productDetail__name">{productNameWithCapacity}</h1>
        <div className="productDetail__wrapper">
          <div className="productDetail__images">
            {activeImage && (
              <img
                src={`${process.env.PUBLIC_URL}/${activeImage}`}
                alt={`${productNameWithCapacity} - Active`}
                className="productDetail__image--active"
              />
            )}
            <div className="productDetail__thumbnails">
              {product.images.map((image) => (
                <img
                  key={image}
                  src={`${process.env.PUBLIC_URL}/${image}`}
                  alt={`${productNameWithCapacity} - Thumbnail`}
                  className={`productDetail__image ${image === activeImage ? 'selected' : ''}`}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="productDetail__specs">
            <div className="productDetail__specs--color">
              <div className="productDetail__specs--color--wrapper">
                <p className="text">Available colors</p>
                <p className="text mr">Serial Number: {product.serialNumber}</p>
              </div>
              <div className="color">
                {product.colorsAvailable.map((color) => {
                  const colorKey = color.replace(/\s+/g, '_');
                  return (
                    <button
                      key={colorKey}
                      className={`color__option ${colorKey === selectedColor ? 'selected' : ''}`}
                      style={{
                        backgroundColor: colorCodes[colorKey] || '#fff',
                      }}
                      onClick={() => handleColorChange(colorKey)}
                      title={color}
                    ></button>
                  );
                })}
              </div>
            </div>
            <hr className="line" />
            <div className="productDetail__capacity">
              <p className="text">Select capacity</p>
              <div className="productDetail__memoryPhone">
                {product.capacityAvailable.map((capacity) => (
                  <button
                    key={capacity}
                    className={`capacity__option ${capacity === selectedCapacity ? 'selected' : ''}`}
                    onClick={() => handleCapacityChange(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>
            <hr className="line" />
            <div className="productDetail__price">
              <PriceDisplay
                priceRegular={product.priceRegular}
                priceDiscount={product.priceDiscount}
                showDiscount={true}
              />
            </div>
            <div className="productDetail__add">
              <CartControls
                isAdded={isAdded}
                isLiked={isLiked}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        </div>
        <div className="productDetail__characteristics">
          <div className="productDetail__list">
            <p className="title">About</p>
            <hr className="line" />
            {product.description.map((desc, index) => (
              <div key={index} className="productDetail__list--top">
                <p className="subtitle">{desc.title}</p>
                <p className="text">
                  {desc.text.map((line, i) => (
                    <span className="text__inf" key={i}>
                      {line}
                      <br /> <br />
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <div className="productDetail__tech">
            <p className="title">Tech specs</p>
            <hr className="line" />
            <div className="phone-specs productDetail__tech--top">
              <div className="phone-specs__param">
                <p className="phone-specs__text">Screen</p>
                <p className="phone-specs__size">{product.screen.slice(0, 9)}</p>
              </div>
              <div className="phone-specs__param">
                <p className="phone-specs__text">Resolution</p>
                <p className="phone-specs__size">{product.resolution}</p>
              </div>
              <div className="phone-specs__param">
                <p className="phone-specs__text">Processor</p>
                <p className="phone-specs__size">{product.processor}</p>
              </div>
              <div className="phone-specs__param">
                <p className="phone-specs__text">RAM</p>
                <p className="phone-specs__size">{product.ram.slice(0, 1)} GB</p>
              </div>
              <div className="phone-specs__param">
                <p className="phone-specs__text">Built in memory</p>
                <p className="phone-specs__size">{product.capacity} GB</p>
              </div>
              <div className="phone-specs__param">
                <p className="phone-specs__text">Camera</p>
                <p className="phone-specs__size">{product.camera}</p>
              </div>
              <div className="phone-specs__param">
                <p className="phone-specs__text">Zoom</p>
                <p className="phone-specs__size">{product.zoom}</p>
              </div>
              <div className="phone-specs__param">
                <p className="phone-specs__text">Cell</p>
                <p className="phone-specs__size phone-specs__size--cell">
                  {product.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewItems iphone={recommendedPhones} title={'You may also like'} showDiscount={true}/>
    </div>
  );
};


