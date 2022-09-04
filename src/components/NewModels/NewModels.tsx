import { useMemo } from 'react';
import { Phone } from '../../types/Phone';
import { ItemCarousel } from '../ItemCarousel';

import './NewModels.scss';

type Props = {
  products: Phone[],
};

export const NewModels: React.FC<Props> = ({ products }) => {
  const newPhones = useMemo(() => {
    const preparedPhones = products.filter(phone => phone.age < 10);

    return preparedPhones.sort((phone1, phone2) => phone1.age - phone2.age);
  },
  [products]);

  return (
    <section className="newModels">
      {newPhones
        && <ItemCarousel title="Brand new models" items={newPhones} />}
    </section>
  );
};
