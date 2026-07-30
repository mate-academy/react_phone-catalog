import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByItemId, getSuggestedProducts } from '@/api/products';
import { ProductDetails } from '@/types/ProductDetails';
import { Product, ProductCategory } from '@/types/Product';
import { Loader } from '@/components/Loader';
import { Breadcrumbs, Crumb } from '@/components/Breadcrumbs';
import { Icon } from '@/components/Icon';
import { ProductsList } from '@/components/ProductsList';
import { useCart } from '@/context/CartContext';
import { useFavourites } from '@/context/FavouritesContext';
import { ImageGallery } from './components/ImageGallery';
import { ColorPicker } from './components/ColorPicker';
import { CapacityPicker } from './components/CapacityPicker';
import { TechSpecs } from './components/TechSpecs';
import styles from './ProductDetailsPage.module.scss';

const categoryLabels: Record<ProductCategory, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const buildVariantId = (namespaceId: string, capacity: string, color: string) =>
  `${namespaceId}-${capacity.toLowerCase()}-${color.replace(/\s/g, '').toLowerCase()}`;

const toProduct = (details: ProductDetails): Product => ({
  id: 0,
  category: details.category,
  itemId: details.id,
  name: details.name,
  fullPrice: details.priceRegular,
  price: details.priceDiscount,
  screen: details.screen,
  capacity: details.capacity,
  color: details.color,
  ram: details.ram,
  year: 0,
  image: details.images[0],
});

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  useEffect(() => {
    setIsLoading(true);
    setNotFound(false);
    setProduct(null);

    getProductByItemId(productId).then(details => {
      if (!details) {
        setNotFound(true);
        setIsLoading(false);

        return;
      }

      setProduct(details);
      setIsLoading(false);
      getSuggestedProducts(details).then(setSuggested);
    });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (notFound || !product) {
    return (
      <div className={styles.page}>
        <p className={styles.notFound}>Product was not found</p>
      </div>
    );
  }

  const crumbs: Crumb[] = [
    { label: categoryLabels[product.category], to: `/${product.category}` },
    { label: product.name },
  ];

  const handleColorChange = (color: string) => {
    navigate(
      `/product/${buildVariantId(product.namespaceId, product.capacity, color)}`,
    );
  };

  const handleCapacityChange = (capacity: string) => {
    navigate(
      `/product/${buildVariantId(product.namespaceId, capacity, product.color)}`,
    );
  };

  const productAsProduct = toProduct(product);
  const inCart = isInCart(product.id);
  const isFav = isFavourite(product.id);

  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    ...(product.camera ? [{ label: 'Camera', value: product.camera }] : []),
    ...(product.zoom ? [{ label: 'Zoom', value: product.zoom }] : []),
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          <Icon name="chevron-left" />
          Back
        </button>

        <Breadcrumbs crumbs={crumbs} />
      </div>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.overview}>
        <ImageGallery images={product.images} alt={product.name} />

        <div className={styles.purchaseBlock}>
          <ColorPicker
            colors={product.colorsAvailable}
            selected={product.color}
            onChange={handleColorChange}
          />

          <CapacityPicker
            capacities={product.capacityAvailable}
            selected={product.capacity}
            onChange={handleCapacityChange}
          />

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.priceDiscount}</span>
            {product.priceRegular > product.priceDiscount && (
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={[styles.addToCart, inCart ? styles.added : ''].join(
                ' ',
              )}
              onClick={() =>
                inCart
                  ? removeFromCart(product.id)
                  : addToCart(productAsProduct)
              }
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={[
                styles.favourite,
                isFav ? styles.favouriteActive : '',
              ].join(' ')}
              aria-label={
                isFav ? 'Remove from favourites' : 'Add to favourites'
              }
              aria-pressed={isFav}
              onClick={() => toggleFavourite(productAsProduct)}
            >
              <Icon name={isFav ? 'favourites-filled' : 'favourites'} />
            </button>
          </div>

          <ul className={styles.shortSpecs}>
            <li className={styles.shortSpecRow}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>
            <li className={styles.shortSpecRow}>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </li>
            <li className={styles.shortSpecRow}>
              <span>Processor</span>
              <span>{product.processor}</span>
            </li>
            <li className={styles.shortSpecRow}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>

          {product.description.map(section => (
            <div key={section.title} className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>{section.title}</h3>
              {section.text.map(paragraph => (
                <p key={paragraph} className={styles.descriptionText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <TechSpecs specs={specs} />
        </div>
      </div>

      {suggested.length > 0 && (
        <div className={styles.suggested}>
          <h2 className={styles.sectionTitle}>You may also like</h2>
          <ProductsList products={suggested} />
        </div>
      )}
    </div>
  );
};
