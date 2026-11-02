import './NewModels.scss';
import Loading from './Loading';
import Model from './Model';
import { Product } from '../interface/Product';
import { useEffect, useState } from 'react';

const ProductItems = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5173/api/products.json')
      .then(response => response.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="product__items">
      <h2 className="product__title">You may also like</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="product__slides">
          {data.slice(0, 8).map(item => {
            return <Model item={item} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ProductItems;
