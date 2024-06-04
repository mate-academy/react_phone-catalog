import { useEffect, useState } from 'react';

import Product from '../../Types/Productю';
import { getPhones } from '../../api/getProduct';

const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  window.console.log(phones);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  return <div>PhonesPage</div>;
};

export default PhonesPage;
