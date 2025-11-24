import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SuggestedProducts } from './components/SuggestedProducts';
import { ProductSpecs } from './components/ProductSpecs';

// src/types/Product.ts
export type Product = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  price?: any;
  discount?: any;
  year?: any;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
};

// Mock products
const allProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15',
    category: 'phones',
    description: 'Latest Apple smartphone',
    price: 6000,
    discount: 500,
    colorsAvailable: ['Black', 'White', 'Red'],
    capacityAvailable: ['128GB', '256GB', '512GB'],
    images: [
      'https://via.placeholder.com/300x300?text=iPhone+1',
      'https://via.placeholder.com/300x300?text=iPhone+2',
    ],
    year: 2025,
  },
  {
    id: 2,
    name: 'Galaxy Tab S8',
    category: 'tablets',
    description: 'Samsung tablet',
    price: 2800,
    discount: 200,
    colorsAvailable: ['Gray', 'Silver'],
    capacityAvailable: ['128GB', '256GB'],
    images: ['https://via.placeholder.com/300x300?text=Tab+1'],
    year: 2023,
  },
  // Adicione mais produtos conforme desejar
];

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Simula fetch de produto
  useEffect(() => {
    setLoading(true);
    setError(false);

    const timer = setTimeout(() => {
      const prod = allProducts.find(p => p.id === Number(productId));

      if (!prod) {
        setError(true);
      } else {
        setProduct(prod);
        setSelectedColor(prod.colorsAvailable[0] || '');
        setSelectedCapacity(prod.capacityAvailable[0] || '');
        setSelectedImage(prod.images[0] || '');
      }

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <p>Product was not found</p>;
  }

  const handleBack = () => navigate(-1);

  return (
    <main className="product-details-page">
      <Breadcrumbs product={product} />

      <button onClick={handleBack}>Back</button>

      <div className="product-main">
        <div className="product-images">
          <img src={selectedImage} alt={product.name} className="main-image" />
          <div className="thumbnails">
            {product.images.map(img => (
              <img
                key={img}
                src={img}
                alt={product.name}
                onClick={() => setSelectedImage(img)}
                className={img === selectedImage ? 'selected' : ''}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p>
            Price: R$ {(product.price - product.discount).toFixed(2)}{' '}
            <span className="old-price">R$ {product.price.toFixed(2)}</span>
          </p>

          <div className="options">
            <div>
              <p>Colors:</p>
              {product.colorsAvailable.map(color => (
                <label key={color}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                  />
                  {color}
                </label>
              ))}
            </div>

            <div>
              <p>Capacity:</p>
              {product.capacityAvailable.map(cap => (
                <label key={cap}>
                  <input
                    type="radio"
                    name="capacity"
                    value={cap}
                    checked={selectedCapacity === cap}
                    onChange={() => setSelectedCapacity(cap)}
                  />
                  {cap}
                </label>
              ))}
            </div>
          </div>

          <section className="about">
            <h2>About</h2>
            <p>{product.description}</p>
          </section>

          <ProductSpecs product={product} />
        </div>
      </div>

      <SuggestedProducts currentProduct={product} allProducts={allProducts} />
    </main>
  );
};
