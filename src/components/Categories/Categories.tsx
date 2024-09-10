import { Category } from '../Category';

import styles from './Categories.module.scss';
const { categories, categories__title } = styles;

export const Categories = () => {
  return (
    <div className={categories}>
      <h2 className={categories__title}>Shop by category</h2>

      <Category
        name="Mobile phones"
        photo="/img/category-phones.webp"
        url="/catalog/phones"
        products="/api/phones.json"
        additionalStyles={{ backgroundColor: '#6D6474' }}
      />

      <Category
        name="Tablets"
        photo="/img/category-tablets.webp"
        url="/catalog/tablets"
        products="/api/tablets.json"
        additionalStyles={{ backgroundColor: '#8D8D92' }}
      />

      <Category
        name="Accessories"
        photo="/img/category-accessories.webp"
        url="/catalog/accessories"
        products="/api/accessories.json"
        additionalStyles={{ backgroundColor: '#973D5F' }}
      />
    </div>
  );
};
