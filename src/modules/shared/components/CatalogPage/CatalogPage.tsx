import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import PageHeader from '../PageHeader/PageHeader';
import SliderItem from '../SliderItem/SliderItem';
import { Product } from '@/types/Product';
import { useParams } from 'react-router-dom';

type CatalogPageProps = {
  fetchReq: () => Promise<Product[]>;
  pageTitle?: string;
};

const CatalogPage: React.FC<CatalogPageProps> = ({
  fetchReq,
  pageTitle = '',
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { category } = useParams();
  useEffect(() => {
    setLoading(true);
    fetchReq()
      .then(products => {
        setProducts(products);
      })
      .finally(() => setLoading(false));
  }, [category]);
  const preparedProducts = products.filter(product => {
    if (!category) return true;
    return product.category.toLowerCase() === category.toLowerCase();
  });
  return (
    <div>
      <PageHeader title={pageTitle} />
      <div>{preparedProducts.length} models</div>
      <div>
        <select name="sortBy" id=""></select>
        <select name="displayCount" id=""></select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {preparedProducts.map(product => (
            <SliderItem key={product.id} item={product} showDiscount={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
