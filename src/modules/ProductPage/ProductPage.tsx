import React, { useEffect, useState } from 'react';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';
import { Product } from '@/types/Product';
type ProductPageProps = {
  fetchReq: () => Promise<Product[]>;
};

const ProductPage: React.FC<ProductPageProps> = ({ fetchReq }) => {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchReq()
      .then(products => {
        setProducts(products);
        const foundProduct = products.find(p => p.itemId === productSlug);
        setProduct(foundProduct || null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productSlug]);

  return (
    <>
      <PageHeader title={product ? product.name : ''} />
      <div>ProductPage</div>
    </>
  );
};

export default ProductPage;
