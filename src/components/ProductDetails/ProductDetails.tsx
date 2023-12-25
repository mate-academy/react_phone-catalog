/* eslint-disable no-console */
import { useParams } from 'react-router-dom';
import './ProductDetails.scss';
import { useEffect, useState } from 'react';
import { getPhones } from '../../api/fetchData';
import { Product } from '../../types/Products';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromServer = await getPhones();

        setProducts(productsFromServer);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  console.log(products[0], productId);

  return (
    <section className="details">
      <div className="container">
        <BreadCrumbs />

      </div>
    </section>

  );
};
