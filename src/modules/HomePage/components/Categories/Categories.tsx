import { useContext } from 'react';
import scss from './Categories.module.scss';
import { DataContext } from '../../../../context/ContextProvider';
import { Shop } from './Shop';

export const Categories = () => {
  const { phones, tablets, accessories } = useContext(DataContext);

  return (
    <section className={scss.categories}>
      <h2>Shop by category</h2>
      <Shop
        category={'phones'}
        name={'Mobile Phones'}
        amount={phones.length}
        background={'rgba(109, 100, 116, 1)'}
      />
      <Shop
        category={'tablets'}
        name={'Tablets'}
        amount={tablets.length}
        background={'rgba(141, 141, 146, 1)'}
      />
      <Shop
        category={'accessories'}
        name={'Accessories'}
        amount={accessories.length}
        background={'rgba(213, 60, 81, 1)'}
      />
    </section>
  );
};
