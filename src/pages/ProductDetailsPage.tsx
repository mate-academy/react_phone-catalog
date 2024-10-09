import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Phone } from '../types/phone';
import { Tablet } from '../types/tablet';
import { Accessory } from '../types/accessory';
import { DetailsBack } from '../components/DetailsHome';
import { DetailsCard } from '../components/DetailsCard';
import { DetailsTechSpecs } from '../components/DetailsTechSpecs/DetailsTechSpecs';
import { BrandNewModelsHome } from '../components/BrandNewModelsHome';

type Product = Phone | Tablet | Accessory;

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        let apiUrl = '';

        if (location.pathname.includes('/phones')) {
          apiUrl = './api/phones.json';
        } else if (location.pathname.includes('/tablets')) {
          apiUrl = './api/tablets.json';
        } else if (location.pathname.includes('/accessories')) {
          apiUrl = './api/accessories.json';
        }

        const response = await fetch(apiUrl);
        const data: Product[] = await response.json();
        const selectedProduct = data.find(item => item.id === productId);

        if (!selectedProduct) {
          throw new Error('Product not found');
        }

        setProduct(selectedProduct);
      } catch (error) {
        setError('Failed to fetch product details');
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, location.pathname]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="details">
      <DetailsBack product={product} />

      <DetailsCard product={product} />

      <DetailsTechSpecs product={product} />

      <BrandNewModelsHome type="You may also like" />
    </div>
  );
};
