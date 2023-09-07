import { useEffect, useState } from 'react';
import { Mobiles } from '../mobiles/Mobiles';
import { Phone } from '../../types/phone';

export const PhonesTab = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    fetch('../../api/products.json')
      .then(response => response.json())
      .then(data => setPhones(data));
  }, []);

  return (
    <Mobiles
      phones={phones}
      title="Mobile phones"
      showOldPrice={!false}
    />
  );
};
