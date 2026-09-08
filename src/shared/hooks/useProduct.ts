import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/products.service';
import { Product } from '../models';

export function useProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then(p => {
        setProduct(p ?? null);
      })
      .catch(err => {
        console.error('Failed to load product in breadcrumb hook', err);
        setProduct(null);
      });
  }, [id]);

  return product;
}
