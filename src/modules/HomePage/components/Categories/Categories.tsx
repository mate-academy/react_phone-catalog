import { StateContext } from '../../../utils/GlobalStateProvider';
import { Category } from '../Category';
import './Categories.scss';

import { useContext } from 'react';

type Props = {
  isLoading: boolean;
};

export const Categories: React.FC<Props> = ({ isLoading }) => {
  const { products } = useContext(StateContext);
  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  const categoriesData = [
    {
      id: 0,
      img: '/img/phones-category.png',
      title: 'Mobile phones',
      ammount: phones.length,
      link: 'phones',
    },
    {
      id: 1,
      img: '/img/tablets-category.png',
      title: 'Tablets',
      ammount: tablets.length,
      link: 'tablets',
    },
    {
      id: 2,
      img: '/img/accessories-category.png',
      title: 'Accessories',
      ammount: accessories.length,
      link: 'accessories',
    },
  ];

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>
      {categoriesData.map(category => (
        <Category isLoading={isLoading} category={category} key={category.id} />
      ))}
    </section>
  );
};
