import React, { useMemo } from 'react';
import { publicPath } from '../../utils/publicPath';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useShop } from '../../context/ShopContext';
import { toProduct } from '../../utils/mapProduct';
import { Category, DeviceDetails, Product } from '../../types/product.types';
import { formatPrice, toDisplayId } from '../../utils/format';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductGallery } from '../../components/ProductGallery';
import { ColorSwatches } from '../../components/ColorSwatches';
import { CapacityPicker } from '../../components/CapacityPicker';
import { AddToCartButton } from '../../components/AddToCartButton';
import { IconButton } from '../../components/IconButton';
import { Icon } from '../../components/Icon';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import './ProductPage.scss';

const CATEGORIES: Category[] = ['phones', 'tablets', 'accessories'];

const CATEGORY_LABELS: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const specRows = (
  details: DeviceDetails,
): { label: string; value?: string }[] => [
  { label: 'Screen', value: details.screen },
  { label: 'Resolution', value: details.resolution },
  { label: 'Processor', value: details.processor },
  { label: 'RAM', value: details.ram },
];

const techSpecRows = (
  details: DeviceDetails,
): { label: string; value?: string }[] => [
  { label: 'Screen', value: details.screen },
  { label: 'Resolution', value: details.resolution },
  { label: 'Processor', value: details.processor },
  { label: 'RAM', value: details.ram },
  { label: 'Built in memory', value: details.capacity },
  { label: 'Camera', value: details.camera },
  { label: 'Zoom', value: details.zoom },
  { label: 'Cell', value: details.cell.join(', ') },
];

function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

export const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ category: string; itemId: string }>();
  const category = params.category as Category;
  const { itemId } = params;

  const isKnownCategory = CATEGORIES.includes(category);

  const {
    data: catalog,
    isLoading,
    error,
  } = useFetch<DeviceDetails[]>(
    isKnownCategory ? publicPath(`/api/${category}.json`) : '',
  );
  const { data: allProducts } = useFetch<Product[]>(
    publicPath('/api/products.json'),
  );
  const { favouriteIds, cartIds, toggleFavourite, addToCart } = useShop();

  const product = catalog?.find(item => item.id === itemId);

  useDocumentTitle(product ? `${product.name} - Nice Gadgets` : 'Nice Gadgets');

  const variants = useMemo(
    () =>
      (catalog ?? []).filter(item => item.namespaceId === product?.namespaceId),
    [catalog, product],
  );

  const selectVariant = (color: string, capacity: string) => {
    const match = variants.find(
      item => item.color === color && item.capacity === capacity,
    );

    if (match) {
      navigate(`/${category}/${match.id}`);
    }
  };

  const relatedProducts = useMemo(
    () =>
      pickRandom(
        (allProducts ?? []).filter(
          item => item.category === category && item.itemId !== itemId,
        ),
        8,
      ),
    [allProducts, category, itemId],
  );

  if (!isKnownCategory) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load the product" />;
  }

  if (!product) {
    return (
      <NotFoundPage
        image={publicPath('/img/product-not-found.png')}
        title="Product was not found"
        linkTo={`/${category}`}
        linkLabel={`Back to ${CATEGORY_LABELS[category]}`}
      />
    );
  }

  const asProduct = toProduct(product);
  const isFavourite = favouriteIds.has(product.id);
  const isInCart = cartIds.has(product.id);
  const hasDiscount = product.priceRegular > product.priceDiscount;

  return (
    <div className="product-page">
      <Breadcrumbs
        items={[
          { label: CATEGORY_LABELS[category], to: `/${category}` },
          { label: product.name },
        ]}
      />

      <button
        type="button"
        className="product-page__back"
        onClick={() => navigate(`/${category}`)}
      >
        <Icon name="chevron-left" />
        Back
      </button>

      <h1 className="product-page__title">{product.name}</h1>

      <div className="product-page__top">
        <ProductGallery images={product.images} alt={product.name} />

        <div className="product-page__purchase">
          <div className="product-page__option">
            <div className="product-page__option-header">
              <span className="product-page__option-label">
                Available colors
              </span>
              <span className="product-page__id">
                ID: {toDisplayId(product.id)}
              </span>
            </div>
            <ColorSwatches
              name={`color-${product.namespaceId}`}
              colors={product.colorsAvailable}
              selected={product.color}
              onSelect={color => selectVariant(color, product.capacity)}
            />
          </div>

          <div className="product-page__option">
            <span className="product-page__option-label">Select capacity</span>
            <CapacityPicker
              name={`capacity-${product.namespaceId}`}
              options={product.capacityAvailable}
              selected={product.capacity}
              onSelect={capacity => selectVariant(product.color, capacity)}
            />
          </div>

          <div className="product-page__price">
            <span className="product-page__price-current">
              {formatPrice(product.priceDiscount)}
            </span>
            {hasDiscount && (
              <span className="product-page__price-old">
                {formatPrice(product.priceRegular)}
              </span>
            )}
          </div>

          <div className="product-page__actions">
            <div className="product-page__cart-btn-wrapper">
              <AddToCartButton
                isInCart={isInCart}
                onClick={() => addToCart(asProduct)}
              />
            </div>
            <IconButton
              icon={isFavourite ? 'heart-filled' : 'heart'}
              ariaLabel="Add to favourites"
              active={isFavourite}
              onClick={() => toggleFavourite(asProduct)}
            />
          </div>

          <dl className="product-page__mini-specs">
            {specRows(product).map(row => (
              <div key={row.label} className="product-page__mini-spec">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="product-page__details">
        <section className="product-page__about">
          <h2>About</h2>
          {product.description.map(block => (
            <div key={block.title} className="product-page__about-block">
              <h3>{block.title}</h3>
              {block.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </section>

        <section className="product-page__tech-specs">
          <h2>Tech specs</h2>
          <dl className="product-page__specs-list">
            {techSpecRows(product)
              .filter(row => row.value)
              .map(row => (
                <div key={row.label} className="product-page__spec-row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
          </dl>
        </section>
      </div>

      {relatedProducts.length > 0 && (
        <div className="product-page__related">
          <ProductsSlider
            title="You may also like"
            products={relatedProducts}
            favouriteIds={favouriteIds}
            cartIds={cartIds}
            onToggleFavourite={toggleFavourite}
            onAddToCart={addToCart}
          />
        </div>
      )}
    </div>
  );
};
