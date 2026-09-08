import { useEffect, useState } from 'react';
import { PhoneSlider } from './PhoneSlider';
import { Phone } from '../../Interface';

export default function NewBrand() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('api/phones.json')
      .then(response => response.json())
      .then(data => {
        setPhones(data.slice(20, 32));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load phones');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <PhoneSlider title="Hot Prices" phones={phones} />;
}
