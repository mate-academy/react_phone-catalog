import { useEffect, useState } from 'react';

import { getPhones } from '../../api/getProduct';
import Product from '../../types/Product';

const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  window.console.log(phones);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  return <div>PhonesPage</div>;
};

export default PhonesPage;
