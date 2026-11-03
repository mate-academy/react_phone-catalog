import './NewModels.scss';
import Loading from './Loading';
import Model from './Model';
import { Product } from '../interface/Product';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

const ProductItems = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  // const { product } = useParams();

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

  const [left, setLeft] = useState(0);

  function moveCarousel(direction: 'plus' | 'minus') {
    if (direction === 'plus') {
      if (left === -25.2 * 6) {
        setLeft(0);

        return;
      }

      setLeft(prevLeft => prevLeft - 25.2);
    } else if (direction === 'minus') {
      if (left === 0) {
        setLeft(-25.2 * 7);

        return;
      }

      setLeft(prevLeft => prevLeft + 25.2);
    }
  }

  return (
    <div className="product__items">
      <h2 className="product__title">
        <span>You may also like</span>
        <div className="product__arrows">
          <button
            className="product__arrow"
            onClick={() => moveCarousel('minus')}
          >
            <img alt="Previous" src="/img/left.svg" />
          </button>
          <button
            className="product__arrow"
            onClick={() => moveCarousel('plus')}
          >
            <img alt="Next" src="/img/right.svg" />
          </button>
        </div>
      </h2>
      <div className="models__items product__models">
        {loading ? (
          <Loading />
        ) : (
          <div className="product__slides" style={{ left: `${left}%` }}>
            {data.slice(0, 8).map(item => {
              return <Model item={item} key={item.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItems;
