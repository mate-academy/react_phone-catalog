import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import {
  getPhones,
  getTablets,
  getAccessories,
} from '../api/productsApi';

interface Product {
  id: string;
  namespaceId: string;
  name: string;
  category: 'phones' | 'tablets' | 'accessories';
  priceDiscount: number;
  color?: string;
  colorsAvailable?: string[];
  capacity?: string;
  capacityAvailable?: string[];
  images?: string[];
  image?: string;
  description?: Array<{
    title: string;
    text: string[];
  }>;
}

interface PreparedProduct extends Product {
  configId: string;
  quantity?: number;
}

interface CartItem extends Product {
  configId: string;
  quantity: number;
}

interface FavoriteItem extends Product {
  configId?: string;
}

interface ProductDetailsProps {
  cart: CartItem[];
  favorites: FavoriteItem[];
  addToCart: (product: PreparedProduct) => void;
  addToFavorites: (product: PreparedProduct) => void;
}

interface RouteParams {
  category?: string;
  productId?: string;
}

function ProductDetails({
  cart,
  favorites,
  addToCart,
  addToFavorites,
}: ProductDetailsProps) {
  const { category, productId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);


  useEffect(() => {
    const loaders: Record<string, () => Promise<Product[]>> = {
      phones: getPhones,
      tablets: getTablets,
      accessories: getAccessories,
    };

    if (!category || !productId) return;

    const loader = loaders[category];
    if (!loader) {
      setLoading(false);
      return;
    }

    loader().then(items => {
      const found = items.find(p => p.id === productId);
      setProduct(found || null);

      if (found) {
        setSelectedColor(found.color || found.colorsAvailable?.[0] || null);
        setSelectedCapacity(found.capacity || found.capacityAvailable?.[0] || null);
      }

      setLoading(false);
    });
  }, [category, productId]);


  const computedPrice = useMemo(() => {
    if (!product || !selectedCapacity) return product?.priceDiscount;

    if (!product.capacityAvailable) {
      return product.priceDiscount;
    }

    const baseIndex = product.capacityAvailable.indexOf(product.capacity || '');
    const currentIndex = product.capacityAvailable.indexOf(selectedCapacity);

    return product.priceDiscount + (currentIndex - baseIndex) * 100;
  }, [product, selectedCapacity]);


  const computedImage = useMemo(() => {
    if (!product || !selectedColor || !product.images?.length) return null;

    const baseImage = product.images[0];
    const basePath = baseImage.split(`/${product.color}/`)[0];

    return `${process.env.PUBLIC_URL}/${basePath}/${selectedColor}/00.webp`;
  }, [product, selectedColor]);

  if (loading) return <div className="page">Loading...</div>;
  if (!product) return <div className="page">Product not found</div>;


  const configId = `${product.namespaceId}-${selectedColor}-${selectedCapacity}`;

  const isInCart = cart.some(item => item.configId === configId);
  const isFavorite = favorites.some(item => item.configId === configId);

  const preparedProduct: PreparedProduct = {
    ...product,
    color: selectedColor || undefined,
    capacity: selectedCapacity || undefined,
    name: `${product.name.split(' (')[0]} (${selectedColor}, ${selectedCapacity})`,
    priceDiscount: computedPrice || product.priceDiscount,
    image: computedImage || product.image,
    configId,
  };

  return (
    <div className="page">
      <button className="neon-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="neon-text" style={{ marginTop: 24 }}>
        {preparedProduct.name}
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 48,
          marginTop: 32,
        }}
      >

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {computedImage && (
            <img
              src={computedImage}
              alt={preparedProduct.name}
              style={{
                maxWidth: '260px',
                maxHeight: '420px',
                objectFit: 'contain',
                filter:
                  'drop-shadow(0 0 14px rgba(255,255,255,0.55)) drop-shadow(0 0 28px rgba(255,255,255,0.35))',
              }}
            />
          )}
        </div>


        <div>
          <p style={{ opacity: 0.6 }}>{product.category}</p>

          <p className="neon-text" style={{ fontSize: 24, margin: '16px 0' }}>
            ${computedPrice}
          </p>


          {product.colorsAvailable && (
            <>
              <h3>Available colors</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      background: color,
                      boxShadow:
                        color === selectedColor
                          ? '0 0 10px rgba(255,255,255,1)'
                          : '0 0 6px rgba(255,255,255,0.4)',
                    }}
                  />
                ))}
              </div>
            </>
          )}


          {product.capacityAvailable && (
            <>
              <h3 style={{ marginTop: 24 }}>Display</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    className="neon-btn"
                    onClick={() => setSelectedCapacity(cap)}
                    style={{ opacity: cap === selectedCapacity ? 1 : 0.5 }}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </>
          )}


          <div style={{ marginTop: 32, display: 'flex', gap: 24 }}>
            <button
              className={`neon-btn ${isInCart ? 'active' : ''}`}
              disabled={isInCart}
              onClick={() => addToCart(preparedProduct)}
            >
              {isInCart ? '✓ Added' : 'Add to cart'}
            </button>

            <button
              className={`neon-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => !isFavorite && addToFavorites(preparedProduct)}
            >
              {isFavorite ? '♥ Favorited' : '♡ Favorite'}
            </button>
          </div>
        </div>
      </div>


      {product.description && (
        <div style={{ marginTop: 64, maxWidth: 960 }}>
          <h2 className="neon-text" style={{ marginBottom: 24 }}>
            Description
          </h2>

          {product.description.map(section => (
            <div key={section.title} style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontSize: 18,
                  marginBottom: 12,
                  textShadow: '0 0 6px rgba(255,255,255,0.6)',
                }}
              >
                {section.title}
              </h3>

              {section.text.map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{
                    opacity: 0.75,
                    lineHeight: 1.6,
                    marginBottom: 8,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
