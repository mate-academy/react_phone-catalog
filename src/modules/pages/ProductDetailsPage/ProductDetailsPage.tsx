import { assetUrl } from '../../../utils/url';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllProducts, fetchProductById } from '../../../api/fetchProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CapacitySelector } from '../../components/CapacitySelector';
import { ColorSelector } from '../../components/ColorSelector';
import { ImageGallery } from '../../components/ImageGallery';
import { Loader } from '../../components/Loader';
import { ProductSlider } from '../../components/ProductSlider';
import { TechSpecs } from '../../components/TechSpecs';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addToCart } from '../../../store/cartSlice';
import { toggleFavourite } from '../../../store/favouritesSlice';
import type { Category, Product, ProductDetails } from '../../../types';
import './ProductDetailsPage.scss';

const CATEGORY_TITLES: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const VALID_CATEGORIES: Category[] = ['phones', 'tablets', 'accessories'];

export function ProductDetailsPage() {
  const { category, productId } = useParams<{ category: string; productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const safeCategory = VALID_CATEGORIES.includes(category as Category)
    ? (category as Category)
    : null;

  useEffect(() => {
    if (!safeCategory || !productId) {
      navigate('*', { replace: true });
      return;
    }

    setLoading(true);
    setError(false);

    Promise.all([
      fetchProductById(safeCategory, productId),
      fetchAllProducts(),
    ])
      .then(([det, prods]) => {
        setDetails(det);
        setAllProducts(prods);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [safeCategory, productId, navigate]);

  // Product object (from products.json) needed for cart / favourites
  const product = useMemo(
    () => allProducts.find((p) => p.itemId === productId) ?? null,
    [allProducts, productId],
  );

  const inCart = useAppSelector((state) =>
    product ? state.cart.items.some((item) => item.product.itemId === product.itemId) : false,
  );

  const isFavourite = useAppSelector((state) =>
    product ? state.favourites.items.some((item) => item.itemId === product?.itemId) : false,
  );

  const handleAddToCart = () => {
    if (product && !inCart) {
      dispatch(addToCart(product));
    }
  };

  const handleToggleFavourite = () => {
    if (product) {
      dispatch(toggleFavourite(product));
    }
  };

  // "You may also like" — same category, different product family
  const suggestedProducts = useMemo(() => {
    if (!details) {
      return [];
    }
    return allProducts
      .filter(
        (p) =>
          p.category === safeCategory &&
          !p.itemId.startsWith(details.namespaceId),
      )
      .slice(0, 12);
  }, [allProducts, details, safeCategory]);

  if (loading) {
    return <Loader />;
  }

  if (error || !details) {
    return (
      <div className="product-details-page__error">
        <p>Product not found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const categoryTitle = safeCategory ? CATEGORY_TITLES[safeCategory] : 'Catalog';
  const categoryPath = safeCategory ? `/${safeCategory}` : '/';

  const techSpecRows = [
    { label: 'Screen', value: details.screen },
    { label: 'Resolution', value: details.resolution },
    { label: 'Processor', value: details.processor },
    { label: 'RAM', value: details.ram },
    ...(details.camera ? [{ label: 'Camera', value: details.camera }] : []),
    ...(details.zoom ? [{ label: 'Zoom', value: details.zoom }] : []),
    { label: 'Cell', value: details.cell.join(', ') },
  ];

  return (
    <div className="product-details-page">
      <Breadcrumbs
        items={[
          { label: categoryTitle, to: categoryPath },
          { label: details.name },
        ]}
      />

      <button className="product-details-page__back" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <h1 className="product-details-page__title">{details.name}</h1>

      <div className="product-details-page__main">
        <div className="product-details-page__gallery">
          <ImageGallery images={details.images} name={details.name} />
        </div>

        <div className="product-details-page__controls">
          <ColorSelector
            colors={details.colorsAvailable}
            selected={details.color}
            category={details.category}
            namespaceId={details.namespaceId}
            capacity={details.capacity}
          />

          <div className="product-details-page__divider" />

          <CapacitySelector
            capacities={details.capacityAvailable}
            selected={details.capacity}
            category={details.category}
            namespaceId={details.namespaceId}
            color={details.color}
          />

          <div className="product-details-page__divider" />

          <div className="product-details-page__price">
            <span className="product-details-page__price-current">
              ${details.priceDiscount}
            </span>
            {details.priceDiscount !== details.priceRegular && (
              <span className="product-details-page__price-regular">
                ${details.priceRegular}
              </span>
            )}
          </div>

          <div className="product-details-page__actions">
            <button
              className={`product-details-page__btn-cart${inCart ? ' product-details-page__btn-cart--added' : ''}`}
              onClick={handleAddToCart}
              disabled={inCart}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={`product-details-page__btn-fav${isFavourite ? ' product-details-page__btn-fav--active' : ''}`}
              onClick={handleToggleFavourite}
              aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            >
              <img
                src={isFavourite ? assetUrl('/icons/icon--favourites-filled.svg') : assetUrl('/icons/icon--favourites.svg')}
                alt=""
              />
            </button>
          </div>

          <div className="product-details-page__short-specs">
            <div className="product-details-page__spec-row">
              <span className="product-details-page__spec-label">Screen</span>
              <span className="product-details-page__spec-value">{details.screen}</span>
            </div>
            <div className="product-details-page__spec-row">
              <span className="product-details-page__spec-label">Resolution</span>
              <span className="product-details-page__spec-value">{details.resolution}</span>
            </div>
            <div className="product-details-page__spec-row">
              <span className="product-details-page__spec-label">Processor</span>
              <span className="product-details-page__spec-value">{details.processor}</span>
            </div>
            <div className="product-details-page__spec-row">
              <span className="product-details-page__spec-label">RAM</span>
              <span className="product-details-page__spec-value">{details.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-page__info">
        <div className="product-details-page__about">
          <h2 className="product-details-page__section-title">About</h2>
          <div className="product-details-page__divider" />
          {details.description.map((section) => (
            <div key={section.title} className="product-details-page__description-section">
              <h3 className="product-details-page__description-title">{section.title}</h3>
              {section.text.map((paragraph) => (
                <p key={paragraph} className="product-details-page__description-text">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="product-details-page__specs">
          <TechSpecs specs={techSpecRows} />
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div className="product-details-page__suggested">
          <ProductSlider title="You may also like" products={suggestedProducts} />
        </div>
      )}
    </div>
  );
}
