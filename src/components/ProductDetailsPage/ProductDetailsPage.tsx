import { Link, useParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useProductDetails } from '../../hooks/useProductDetails';
import { assetUrl, categoryNames } from '../../utils/assets';
import { BackButton } from '../BackButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { ProductsSlider } from '../ProductsSlider';
import { ProductGallery } from './ProductGallery';
import { ProductInformation } from './ProductInformation';
import { ProductOptions } from './ProductOptions';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { itemId = '' } = useParams();
  const {
    details,
    product,
    suggestions,
    status,
    isLoading,
    reload,
    images,
    imageIndex,
    selectImage,
    markImageUnavailable,
    findVariant,
    selectVariant,
    summarySpecs,
    fullSpecs,
  } = useProductDetails(itemId);
  const { cart, favorites, addToCart, toggleFavorite } = useShop();

  if (isLoading) {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <div className="container">
        <BackButton />
        <div className="empty-state" role="alert">
          <h1 className="page-title">Something went wrong</h1>
          <p>We could not load this product. Please try again.</p>
          <button className="primary-button" type="button" onClick={reload}>
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (!details || !product) {
    return (
      <div className="container">
        <Breadcrumbs items={[{ label: 'Product was not found' }]} />
        <BackButton />
        <div className="empty-state">
          <img src={assetUrl('img/product-not-found.png')} alt="" />
          <h1 className="page-title">Product was not found</h1>
          <Link className="primary-button" to="/">
            Go to home page
          </Link>
        </div>
      </div>
    );
  }

  const isInCart = cart.some(item => item.id === product.itemId);
  const isFavorite = favorites.some(item => item.itemId === product.itemId);

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs
        items={[
          {
            label: categoryNames[details.category],
            to: `/${details.category}`,
          },
          { label: details.name },
        ]}
      />
      <BackButton />
      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.product}>
        <ProductGallery
          name={details.name}
          images={images}
          imageIndex={imageIndex}
          onSelectImage={selectImage}
          onImageError={markImageUnavailable}
        />
        <ProductOptions
          details={details}
          product={product}
          isInCart={isInCart}
          isFavorite={isFavorite}
          findVariant={findVariant}
          onSelectVariant={selectVariant}
          onAddToCart={() => addToCart(product)}
          onToggleFavorite={() => toggleFavorite(product)}
          summarySpecs={summarySpecs}
        />
      </div>

      <ProductInformation details={details} fullSpecs={fullSpecs} />

      {suggestions.length > 0 && (
        <ProductsSlider title="You may also like" products={suggestions} />
      )}
    </div>
  );
};
