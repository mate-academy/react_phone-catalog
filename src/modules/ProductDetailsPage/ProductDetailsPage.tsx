import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { BackButton } from '../shared/components/BackButton';
import { Loader } from '../shared/components/Loader';
import { ImageGallery } from './components/ImageGallery';
import { ColorSelector } from './components/ColorSelector';
import { CapacitySelector } from './components/CapacitySelector';
import { PriceSection } from './components/PriceSection';
import { AddToCartButton } from './components/AddToCartButton';
import { FavoriteButton } from './components/FavoriteButton';
import { AboutSection } from './components/AboutSection';
import { TechSpecsSection } from './components/TechSpecsSection';
import { YouMayAlsoLike } from './components/YouMayAlsoLike';
import { ProductDetailsError } from './components/ProductDetailsError';
import { useProductDetails } from './hooks/useProductDetails';
import styles from './ProductDetailsPage.module.scss';

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  return labels[category] || category;
}

export function ProductDetailsPage(): JSX.Element {
  const {
    details,
    loading,
    error,
    suggestedProducts,
    findProductByItemId,
    currentColor,
    currentCapacity,
    handleColorChange,
    handleCapacityChange,
  } = useProductDetails();

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (error || !details) {
    return <ProductDetailsError />;
  }

  const categoryLabel = getCategoryLabel(details.category);
  const breadcrumbItems = [
    { label: categoryLabel, to: `/${details.category}` },
    { label: details.name, to: undefined },
  ];

  const productForCart = findProductByItemId(details.id);
  const productForFavorites = productForCart;

  return (
    <div className={styles.container}>
      <Breadcrumbs items={breadcrumbItems} />
      <div className={styles.backWrapper}>
        <BackButton />
      </div>
      <h1 className={styles.title}>{details.name}</h1>
      <div className={styles.content}>
        <div className={styles.gallerySection}>
          <ImageGallery images={details.images} />
          <ColorSelector
            colors={details.colorsAvailable}
            selectedColor={currentColor}
            onChange={handleColorChange}
          />
          <CapacitySelector
            capacities={details.capacityAvailable}
            selectedCapacity={currentCapacity}
            onChange={handleCapacityChange}
          />
        </div>
        <div className={styles.infoSection}>
          <PriceSection
            priceDiscount={details.priceDiscount}
            priceRegular={details.priceRegular}
          />
          <div className={styles.actions}>
            {productForCart && <AddToCartButton product={productForCart} />}
            {productForFavorites && (
              <FavoriteButton product={productForFavorites} />
            )}
          </div>
          <AboutSection description={details.description} />
          <TechSpecsSection
            screen={details.screen}
            resolution={details.resolution}
            processor={details.processor}
            ram={details.ram}
            camera={details.camera}
            zoom={details.zoom}
            cell={details.cell}
          />
        </div>
      </div>
      <YouMayAlsoLike products={suggestedProducts} />
    </div>
  );
}
