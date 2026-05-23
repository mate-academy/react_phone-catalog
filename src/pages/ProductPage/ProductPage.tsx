import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import {
  CatalogProduct,
  Phone,
  Tablet,
  Accessory,
} from '../../../public/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/products/productsSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoritesSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { colorMap } from '../../../public/utils/colorMap';

import s from './ProductPage.module.scss';

type ProductType = Phone | Tablet | Accessory;

const normalize = (str: string = '') => str.toLowerCase().replace(/[\s-]/g, '');

const getModelBase = (id: string) => {
  const parts = id.split('-');

  if (parts.length > 3) {
    return parts.slice(0, -2).join('-');
  }
  return parts[0];
};

export const ProductPage = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const allProducts = useAppSelector(state => state.products.items) as CatalogProduct[];
  const favorites = useAppSelector(state => state.favorites.items);
  const cartItems = useAppSelector(state => state.cart.items);

  const isLiked = favorites.some(item => item.id === productId || (item as any).itemId === productId);
  const isInCart = cartItems.some(item => item.id === productId);

  const suggestedProducts = useMemo(() => {
    return [...allProducts]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }, [allProducts]);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!productId || !category) return;

    setLoading(true);
    fetch(`api/${category}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Product details not found');
        return res.json();
      })
      .then((data: ProductType[]) => {
        const foundProduct = data.find(p => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProduct(null);
        setLoading(false);
      });

    setSelectedImage(0);
    setStartIndex(0);
  }, [productId, category]);

const findTargetVariant = (targetColor: string, targetCapacity: string) => {
  if (!product) return null;

  const baseId = normalize((product as any).namespaceId || getModelBase(productId || ''));

  return allProducts.find(p => {
    const pBase = normalize((p as any).namespaceId || getModelBase(p.itemId));

    const isSameFamily = pBase.includes(baseId) || baseId.includes(pBase);

    const isSameColor = normalize(p.color) === normalize(targetColor);

    const isSameCapacity = normalize(p.capacity) === normalize(targetCapacity);

    return isSameFamily && isSameColor && isSameCapacity;
  });
};

  const handleLikeClick = () => {
    if (!product) return;
    if (isLiked) {
      dispatch(removeFromFavorites(productId!));
    } else {
      const catalogItem = allProducts.find(p => p.itemId === productId) || (product as any);
      dispatch(addToFavorites(catalogItem));
    }
  };

  const handleAddToCart = () => {
    if (!product || isInCart) return;
    dispatch(addToCart({
      id: productId!,
      name: product.name,
      price: 'priceDiscount' in product ? product.priceDiscount : (product as any).price,
      image: product.images[0],
    }));
  };

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex(prev =>
    Math.min(prev + 1, Math.max(0, suggestedProducts.length - 4))
  );

  if (loading) return <div className={s.productPageLoading}><div className={s.loader}>Loading...</div></div>;
  if (!product) return <div className={s.productPageError}><h1>Product not found</h1><button onClick={() => navigate(-1)}>Back</button></div>;

  return (
    <div className={s.productPage}>
      <Breadcrumbs productName={product.name} />

      <div className={s.backButton} onClick={() => navigate(-1)}>
        <img src="./img/Arrow_Left.svg" alt="Back" />
        <span>Back</span>
      </div>

      <h1 className={s.productTitle}>{product.name}</h1>

      <div className={s.productTwoColumns}>
        <div className={s.leftSide}>
          <div className={s.productGallery}>
            <div className={s.galleryThumbnails}>
              {product.images.map((img, index) => (
                <button
                  key={img}
                  className={`${s.thumbnail} ${selectedImage === index ? s.thumbnailActive : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={`./${img}`} alt="" />
                </button>
              ))}
            </div>
            <div className={s.galleryMain}>
              <img src={`./${product.images[selectedImage]}`} alt={product.name} className={s.productMainImage} />
            </div>
          </div>

          <section className={s.aboutSection}>
            <h2 className={s.aboutTitle}>About</h2>
            <hr className={s.divider} />
            {product.description.map(section => (
              <div key={section.title} className={s.aboutSectionContent}>
                <h3 className={s.sectionTitle}>{section.title}</h3>
                {section.text.map((paragraph, i) => <p className={s.paragraph} key={i}>{paragraph}</p>)}
              </div>
            ))}
          </section>
        </div>

        <div className={s.rightSide}>
          <div className={s.productInfoCard}>
            <div className={s.productColors}>
              <div className={s.topContainer}>
                <span className={s.label}>Available colors</span>
                <span className={s.productId}>ID: {product.id}</span>
              </div>
              <div className={s.colorDots}>
                {product.colorsAvailable.map(color => {
                  const variant = findTargetVariant(color, product.capacity);
                  return (
                    <label key={color} className={s.colorLabel}>
                      <input
                        type="radio"
                        name="color"
                        className={s.visuallyHidden}
                        checked={normalize(color) === normalize(product.color)}
                        onChange={() => {
                          if (variant) navigate(`/${category}/${variant.itemId}`);
                        }}
                      />
                      <span
                        className={`${s.colorDot} ${normalize(color) === normalize(product.color) ? s.colorDotActive : ''}`}
                        style={{ backgroundColor: colorMap[color] || color }}
                        onClick={() => variant && navigate(`/${category}/${variant.itemId}`)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <hr className={s.divider} />

            <div className={s.productCapacity}>
              <span className={s.label}>Select capacity</span>
              <div className={s.capacityButtons}>
                {product.capacityAvailable.map(capacity => {
                  let variant = findTargetVariant(product.color, capacity);

                  if (!variant) {
                    const baseId = (product as any).namespaceId || getModelBase(productId || '');
                    variant = allProducts.find(p =>
                      ((p as any).namespaceId === baseId || getModelBase(p.itemId) === baseId) &&
                      normalize(p.capacity) === normalize(capacity)
                    ) || null;
                  }

                  return (
                    <label key={capacity} className={s.capacityLabel}>
                      <input
                        type="radio"
                        name="capacity"
                        className={s.visuallyHidden}
                        checked={normalize(capacity) === normalize(product.capacity)}
                        onChange={() => {
                          if (variant) navigate(`/${category}/${variant.itemId}`);
                        }}
                      />
                      <span
                        className={`${s.capacityItem} ${normalize(capacity) === normalize(product.capacity) ? s.capacityItemActive : ''}`}
                        onClick={() => variant && navigate(`/${category}/${variant.itemId}`)}
                      >
                        {capacity}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <hr className={s.divider} />

            <div className={s.productPricing}>
              <span className={s.currentPrice}>
                ${'priceDiscount' in product ? product.priceDiscount : (product as any).price}
              </span>
              {'priceRegular' in product && product.priceRegular !== product.priceDiscount && (
                <span className={s.originalPrice}>${product.priceRegular}</span>
              )}
            </div>

            <div className={s.productActions}>
              <button
                className={`${s.actionButton} ${isInCart ? s.actionButtonAddedToCart : ''}`}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={`${s.favoriteButton} ${isLiked ? s.liked : ''}`}
                onClick={handleLikeClick}
              >
                <img src={isLiked ? './img/HeartFilled.svg' : './img/Like.svg'} alt="" />
              </button>
            </div>

            <div className={s.productSpecsShort}>
              <div className={s.specRow}><span className={s.specName}>Screen</span><span className={s.specValue}>{product.screen}</span></div>
              <div className={s.specRow}><span className={s.specName}>Resolution</span><span className={s.specValue}>{product.resolution}</span></div>
              <div className={s.specRow}><span className={s.specName}>Processor</span><span className={s.specValue}>{product.processor}</span></div>
              <div className={s.specRow}><span className={s.specName}>RAM</span><span className={s.specValue}>{product.ram}</span></div>
            </div>
          </div>

          <section className={s.techSpecsSection}>
            <h2 className={s.aboutTitle}>Tech specs</h2>
            <hr className={s.divider} />
            <div className={s.productSpecsFull}>
               <div className={s.specRow}><span className={s.specName}>Screen</span><span className={s.specValue}>{product.screen}</span></div>
               <div className={s.specRow}><span className={s.specName}>Resolution</span><span className={s.specValue}>{product.resolution}</span></div>
               <div className={s.specRow}><span className={s.specName}>Processor</span><span className={s.specValue}>{product.processor}</span></div>
               <div className={s.specRow}><span className={s.specName}>RAM</span><span className={s.specValue}>{product.ram}</span></div>
               <div className={s.specRow}><span className={s.specName}>Built in memory</span><span className={s.specValue}>{product.capacity}</span></div>
               <div className={s.specRow}><span className={s.specName}>Camera</span><span className={s.specValue}>{'camera' in product ? product.camera : 'N/A'}</span></div>
               <div className={s.specRow}><span className={s.specName}>Zoom</span><span className={s.specValue}>{'zoom' in product ? product.zoom : 'N/A'}</span></div>
               <div className={s.specRow}><span className={s.specName}>Cell</span><span className={s.specValue}>{'cell' in product ? product.cell.join(', ') : 'N/A'}</span></div>
            </div>
          </section>
        </div>
      </div>

      <section className={s.brandNewModels}>
        <div className={s.containerProducts}>
          <h2>You may also like</h2>
          <div className={s.carouselButtons}>
            <button className={s.carouselArrow} onClick={handlePrev} disabled={startIndex === 0}>
              <img src="./img/Arrow_Left.svg" alt="Prev" />
            </button>
            <button className={s.carouselArrow} onClick={handleNext} disabled={startIndex + 4 >= suggestedProducts.length}>
              <img src="./img/Arrow_Right.svg" alt="Next" />
            </button>
          </div>
        </div>
        <div className={s.productsGrid}>
          {suggestedProducts.slice(startIndex, startIndex + 4).map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
