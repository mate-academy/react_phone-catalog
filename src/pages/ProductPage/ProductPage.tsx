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
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoritesSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { colorMap } from '../../../public/utils/colorMap';

import s from './ProductPage.module.scss';

type ProductType = Phone | Tablet | Accessory;

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

  const products = useAppSelector(state => state.products.items) as ProductType[];
  const favorites = useAppSelector(state => state.favorites.items);
  const cartItems = useAppSelector(state => state.cart.items);

  const suggestedProducts = useMemo(() => {
    return [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(p => p as unknown as CatalogProduct);
  }, [products, productId]); 

  const visibleCount = 4;
  const isLiked = favorites.some(item => item.id === product?.id);
  const isInCart = cartItems.some(item => item.id === product?.id);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!productId || products.length === 0) return;

    const foundProduct = products.find(p => p.id === productId);

    setProduct(foundProduct || null);
    setLoading(false);
    setSelectedImage(0);
    setStartIndex(0);
  }, [productId, products]);

  const handleLikeClick = () => {
    if (!product) return;
    if (isLiked) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product as unknown as CatalogProduct));
    }
  };

  const handleAddToCart = () => {
    if (!product || isInCart) return;
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.priceDiscount,
      image: product.images[0],
    }));
  };

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex(prev =>
    Math.min(prev + 1, Math.max(0, suggestedProducts.length - visibleCount))
  );

  const visibleProducts = suggestedProducts.slice(startIndex, startIndex + visibleCount);

  if (loading) {
    return (
      <div className={s.productPageLoading}>
        <div className={s.loader}>Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={s.productPageError}>
        <Breadcrumbs productName="Product was not found" />
        <h1 className={s.productTitle}>Product was not found</h1>
        <button onClick={() => navigate(-1)} className={s.backButton}>Back</button>
      </div>
    );
  }


  const colorVariants = products.filter(p => p.namespaceId === product.namespaceId && p.capacity === product.capacity);
  const capacityVariants = products.filter(p => p.namespaceId === product.namespaceId && p.color === product.color);

  return (
    <div className={s.productPage}>
      <Breadcrumbs productName={product.name} />

      <div className={s.backButton} onClick={() => navigate(-1)}>
        <img src="./img/Arrow_Left.svg" alt="" />
        <span>Back</span>
      </div>

      <h1 className={s.productTitle}>{product.name}</h1>

      <div className={s.productTwoColumns}>
        <div className={s.leftSide}>
          <div className={s.productGallery}>
            <div className={s.galleryThumbnails}>
              {product.images.map((img, index) => (
                <button
                  key={index}
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
                {section.text.map((paragraph, i) => (
                  <p className={s.paragraph} key={i}>{paragraph}</p>
                ))}
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
                {colorVariants.map(variant => (
                  <label key={variant.id} className={s.colorLabel}>
                    <input
                      type="radio"
                      name="color"
                      className={s.visuallyHidden}
                      checked={variant.color === product.color}
                      onChange={() => navigate(`/${category}/${variant.id}`)}
                    />
                    <span
                      className={`${s.colorDot} ${variant.color === product.color ? s.colorDotActive : ''}`}
                      style={{ backgroundColor: colorMap[variant.color] || '#ccc' }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <hr className={s.divider} />

            <div className={s.productCapacity}>
              <span className={s.label}>Select capacity</span>
              <div className={s.capacityButtons}>
                {capacityVariants.map(variant => (
                  <label key={variant.id} className={s.capacityLabel}>
                    <input
                      type="radio"
                      name="capacity"
                      className={s.visuallyHidden}
                      checked={variant.capacity === product.capacity}
                      onChange={() => navigate(`/${category}/${variant.id}`)}
                    />
                    <span className={`${s.capacityItem} ${variant.capacity === product.capacity ? s.capacityItemActive : ''}`}>
                      {variant.capacity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className={s.divider} />

            <div className={s.productPricing}>
              <span className={s.currentPrice}>${product.priceDiscount}</span>
              {product.priceRegular !== product.priceDiscount && (
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
              <button className={`${s.favoriteButton} ${isLiked ? s.liked : ''}`} onClick={handleLikeClick}>
                <img src={isLiked ? './img/HeartFilled.svg' : './img/Like.svg'} alt="" />
              </button>
            </div>

            <div className={s.productSpecsShort}>
              {[
                { label: 'Screen', value: product.screen },
                { label: 'Resolution', value: product.resolution },
                { label: 'Processor', value: product.processor },
                { label: 'RAM', value: product.ram }
              ].map(spec => (
                <div key={spec.label} className={s.specRow}>
                  <span className={s.specName}>{spec.label}</span>
                  <span className={s.specValue}>{spec.value}</span>
                </div>
              ))}
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
              <img src="./img/Arrow_Left.svg" alt="" />
            </button>
            <button className={s.carouselArrow} onClick={handleNext} disabled={startIndex + visibleCount >= suggestedProducts.length}>
              <img src="./img/Arrow_Right.svg" alt="" />
            </button>
          </div>
        </div>
        <div className={s.productsGrid}>
          {visibleProducts.map(item => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  );
};
