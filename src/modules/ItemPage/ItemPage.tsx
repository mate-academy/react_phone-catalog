import { useNavigate, useParams } from 'react-router-dom';

import styles from './ItemPage.module.scss';

import { ItemGallery } from './ItemTop/ItemGallery/ItemGallery';
import { ItemInfo } from './ItemTop/ItemInfo/ItemInfo';
import { ItemDescription } from './ItemDetails/ItemDescription/ItemDescription';
import { ItemSpec } from './ItemDetails/ItemSpec/ItemSpec';
import { SuggestedProducts } from './SuggestedProducts';

import { BackButton } from '../../components/BackButton/BackButton';

import { useItemDetails } from '../../hooks/useItemDetails';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';

import { useProducts } from '../../shared/context/ProductsContext';
import { useCart } from '../../shared/context/CartContext';
import { useFavorites } from '../../shared/context/FavoritesContext';

import { getItemUrl } from '../../shared/helpers/getItemUrl';
import { normalizeProduct } from '../../shared/context/normalizeProduct';

export const ItemPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const {
    products: allProducts,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  const { items, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const currentItemId = itemId?.toLowerCase() || '';

  const listProduct = allProducts.find(
    product => product.itemId.toLowerCase() === currentItemId,
  );

  const category = listProduct?.category ?? '';

  const {
    product,
    loading: itemLoading,
    error: itemError,
  } = useItemDetails(currentItemId, category);

  const { suggested, loadingSuggested } = useSuggestedProducts(
    product,
    allProducts,
  );

  if (!itemId) {
    return <div className={styles.skeleton}>Invalid URL</div>;
  }

  if (productsLoading && allProducts.length === 0) {
    return <div className={styles.skeleton}>Loading products...</div>;
  }

  if (productsError) {
    return <div className={styles.skeleton}>Unable to load products</div>;
  }

  if (!listProduct) {
    return <div className={styles.skeleton}>Product not found</div>;
  }

  if (itemLoading && !product) {
    return <div className={styles.skeleton}>Loading item...</div>;
  }

  if (itemError && !product) {
    return <div className={styles.skeleton}>Unable to load item</div>;
  }

  if (!product) {
    return null;
  }

  const normalized = normalizeProduct(product);

  const isInCart = items.some(item => item.id === normalized.id);

  const isFavorite = favorites.some(favorite => favorite.id === normalized.id);

  const handleColorChange = (newColor: string) => {
    navigate(getItemUrl(product.namespaceId, product.capacity, newColor));
  };

  const handleCapacityChange = (newCapacity: string) => {
    navigate(getItemUrl(product.namespaceId, newCapacity, product.color));
  };

  return (
    <section className={styles.page}>
      <BackButton className={styles.back} />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.productGrid}>
        <div className={styles.gallery}>
          <ItemGallery images={product.images} />
        </div>

        <div className={styles.info}>
          <ItemInfo
            product={product}
            normalized={normalized}
            isInCart={isInCart}
            isFavorite={isFavorite}
            onColorChange={handleColorChange}
            onCapacityChange={handleCapacityChange}
            onAddToCart={() => addToCart(normalized)}
            onToggleFavorite={() => toggleFavorite(normalized)}
          />
        </div>

        <div className={styles.description}>
          <ItemDescription product={product} />
        </div>

        <div className={styles.spec}>
          <ItemSpec product={product} />
        </div>
      </div>

      {!loadingSuggested && suggested.length > 0 && (
        <SuggestedProducts products={suggested} />
      )}
    </section>
  );
};
