import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { ProductDetails } from '@/types/ProductDetails';

type CatalogPageProps = {
  fetchReq: () => Promise<ProductDetails[]>;
};

const CatalogPage: React.FC<CatalogPageProps> = ({ fetchReq }) => {
  const { category } = useParams<{ category: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // Fetch catalog data based on category
    if (category === 'phone') {
      setLoading(true);
      fetchReq()
        .then(products => {
          console.log('Fetched phones:', products);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return loading ? <Loader /> : <div>CatalogPage</div>;
};

export default CatalogPage;
