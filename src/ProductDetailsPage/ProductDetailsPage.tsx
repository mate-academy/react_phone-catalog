/* eslint-disable import/extensions */
import styles from './ProductDetailsPage.module.scss';
import { Link } from 'react-router-dom';
import { getData } from '../../fetch/httpClient';
import { useParams } from 'react-router-dom';
import { FullProduct } from '../types/Alltypes';
import { useEffect, useState } from 'react';

export const ProductDetailsPage = () => {
  const { id: productId } = useParams();

  const [phone, setPhones] = useState<FullProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [capacity, setCapacity] = useState('');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getData<FullProduct[]>('./api/phones.json')
      .then(data => {
        const product = data.find(item => item.id === productId);

        setPhones(product || null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error} <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!phone) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.containerPhones}>
      <Link to="/phones" className={styles.back}>
        <button className={styles.backButton}>
          <img src="/img/left.svg" alt="back" className={styles.backImg} />
        </button>
      </Link>
      <h2 className={styles.linkId}>
        <Link to="/phones" className={styles.linkId}>
          {phone.name}
        </Link>
      </h2>
      <div className={styles.colorsAvailableBlock}>
        {phone.colorsAvailable.map(color => (
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
      <div className={styles.capacityBlock}>
        {phone.capacity.map(cap => (
          <label key={cap}>
            <input
              type="radio"
              name="capacity"
              value={cap}
              checked={capacity === cap}
              onChange={() => setCapacity(cap)}
            />
            {cap}
          </label>
        ))}
      </div>
    </div>
  );
};
