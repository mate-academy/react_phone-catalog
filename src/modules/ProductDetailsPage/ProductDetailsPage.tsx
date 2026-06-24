/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCart,
  removeFromCart,
  toggleFavourite,
} from '../../features/cartAndFavoritesSlice';
import styles from './ProductDetailsPage.module.scss';
import { RootState } from '../../app/store';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsSlider } from '../shared/components/ProductSlider';
import { Product } from '../../types/Product';

export const ProductDetailsPage: React.FC = () => {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [allCategoryProducts, setAllCategoryProducts] = useState<
    ProductDetails[]
  >([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const cart = useAppSelector((state: RootState) => state.shop.cart);
  const favourites = useAppSelector(
    (state: RootState) => state.shop.favourites,
  );

  const isInCart = cart.some(item => item.itemId === itemId);
  const isFavorite = favourites.some(item => item.itemId === itemId);

  useEffect(() => {
    setLoading(true);

    fetch(`api/${category}.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Category file not found');
        }

        return res.json();
      })
      .then((data: ProductDetails[]) => {
        setAllCategoryProducts(data);
        const foundProduct = data.find(
          item => item.id === itemId || item.namespaceId === itemId,
        );

        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.images && foundProduct.images.length > 0) {
            setMainImage(foundProduct.images[0]);
          }
        } else {
          setProduct(null);
        }

        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [category, itemId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const suggestedProducts: Product[] = allCategoryProducts
    .filter(item => item.id !== product.id)
    .slice(0, 10)
    .map(item => ({
      id: item.id,
      category: item.category || category || '',
      itemId: item.id,
      name: item.name,
      fullPrice: item.priceRegular,
      price: item.priceDiscount,
      screen: item.screen,
      capacity: item.capacity,
      ram: item.ram,
      image: item.images && item.images.length > 0 ? item.images[0] : '',
      year: item.year || 2022,
    }));

  const {
    name,
    images,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    description,
    year,
  } = product;

  const handleParamChange = (newColor: string, newCapacity: string) => {
    if (!product) {
      return;
    }

    const formattedCapacity = newCapacity.toLowerCase();
    const formattedColor = newColor.toLowerCase().replace(/[\s-]+/g, '');
    const newId = `${product.namespaceId}-${formattedCapacity}-${formattedColor}`;

    navigate(`/${category}/${newId}`);
  };

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.homeLink}>
            <img src={`img/Home.svg`} alt="Home" />
          </Link>
          <img
            src={`img/arrow-right.svg`}
            alt="Arrow"
            className={styles.arrow}
          />
          <Link to={`/${category}`} className={styles.catalogLink}>
            {category?.charAt(0).toUpperCase()}
            {category?.slice(1)}
          </Link>
          <img
            src={`img/arrow-right.svg`}
            alt="Arrow"
            className={styles.arrow}
          />
          <span className={styles.currentPath}>{name}</span>
        </div>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <img src={`img/arrow-left.svg`} alt="Back" />
          Back
        </button>

        <h1 className={styles.title}>{name}</h1>

        <div className={styles.mainContent}>
          <div className={styles.gallerySection}>
            <div className={styles.thumbnails}>
              {images.map(img => (
                <button
                  key={img}
                  type="button"
                  className={`${styles.thumbButton} ${mainImage === img ? styles.activeThumb : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img.startsWith('/') ? img.slice(1) : img}
                    alt="Thumbnail"
                  />
                </button>
              ))}
            </div>
            <div className={styles.mainImageWrapper}>
              <img
                src={mainImage.startsWith('/') ? mainImage.slice(1) : mainImage}
                alt={name}
                className={styles.mainImage}
              />
            </div>
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.optionBlock}>
              <span className={styles.optionLabel}>Available colors</span>
              <div className={styles.colorPicker}>
                {colorsAvailable.map(c => (
                  <button
                    key={c}
                    type="button"
                    style={{ backgroundColor: c }}
                    className={`${styles.colorCircle} ${color === c ? styles.activeColor : ''}`}
                    title={c}
                    onClick={() => handleParamChange(c, capacity)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.optionBlock}>
              <span className={styles.optionLabel}>Select capacity</span>
              <div className={styles.capacityPicker}>
                {capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    type="button"
                    className={`${styles.capacityButton} ${capacity === cap ? styles.activeCapacity : ''}`}
                    onClick={() => handleParamChange(color, cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.priceBlock}>
              <span className={styles.priceDiscount}>${priceDiscount}</span>
              <span className={styles.priceRegular}>${priceRegular}</span>
            </div>

            <div className={styles.buttonsRow}>
              <button
                type="button"
                className={`${styles.addToCart} ${isInCart ? styles.inCart : ''}`}
                onClick={() => {
                  if (!isInCart) {
                    dispatch(
                      addToCart({
                        id: product.id,
                        category: product.category,
                        itemId: itemId || product.id,
                        name,
                        price: priceDiscount,
                        fullPrice: priceRegular,
                        screen,
                        capacity,
                        ram,
                        image: images[0],
                        year,
                      }),
                    );
                  } else {
                    dispatch(removeFromCart(itemId || product.id));
                  }
                }}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <img
                src={`img/${isFavorite ? 'Added.svg' : 'Favourites.svg'}`}
                alt="Toggle favourite"
                className={`${styles.favouriteButton} ${isFavorite ? styles.isFavourite : ''}`}
                onClick={() =>
                  dispatch(
                    toggleFavourite({
                      id: product.id,
                      category: product.category,
                      itemId: itemId || product.id,
                      name,
                      price: priceDiscount,
                      fullPrice: priceRegular,
                      screen,
                      capacity,
                      ram,
                      image: images[0],
                      year,
                    }),
                  )
                }
              />
            </div>

            <div className={styles.shortSpecs}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Screen</span>
                <span className={styles.specValue}>{screen}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Resolution</span>
                <span className={styles.specValue}>{resolution}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Processor</span>
                <span className={styles.specValue}>{processor}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>RAM</span>
                <span className={styles.specValue}>{ram}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.descriptionBlock}>
            <h2 className={styles.sectionTitle}>About</h2>
            <div className={styles.divider} />
            {description.map(section => (
              <div key={section.title} className={styles.descSection}>
                <h3 className={styles.descSubtitle}>{section.title}</h3>
                {section.text.map((p, idx) => (
                  <p key={idx} className={styles.descText}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.techSpecsBlock}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>
            <div className={styles.divider} />
            <div className={styles.fullSpecsList}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Screen</span>
                <span className={styles.specValue}>{screen}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Resolution</span>
                <span className={styles.specValue}>{resolution}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Processor</span>
                <span className={styles.specValue}>{processor}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>RAM</span>
                <span className={styles.specValue}>{ram}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Camera</span>
                <span className={styles.specValue}>{product.camera}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Zoom</span>
                <span className={styles.specValue}>{product.zoom}</span>
              </div>
            </div>
          </div>
        </div>

        {suggestedProducts.length > 0 && (
          <div className={styles.suggestedSection}>
            <ProductsSlider
              title="You may also like"
              products={suggestedProducts}
              prevButtonId="suggested-prev"
              nextButtonId="suggested-next"
            />
          </div>
        )}
      </div>
    </div>
  );
};
