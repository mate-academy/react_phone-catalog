import './NewModels.scss';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Model from './Model';
import { Product } from '../interface/Product';

const NewModels = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      `https://johnnyvasconcelos.github.io/react_phone-catalog/api/products.json`,
    )
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
    <section className="models">
      <div className="container column">
        <h2 className="models__title">Brand new models</h2>
        {loading && <Loading />}
        <div className="models__items">
          {data.slice(0, 4).map(item => {
            return <Model item={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default NewModels;
