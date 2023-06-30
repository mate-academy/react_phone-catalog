import './ShopCategories.scss';
import { useProducts } from '../../../contexts/productsContext';
import { ShopCategory } from './ShopCategory';

export const ShopCategories = () => {
  const { products } = useProducts();

  const categories = [
    {
      imageUrl: 'img/category-phones.png',
      name: 'Mobile phones',
      count: products.phones.length,
      to: 'phones',
    },
    {
      imageUrl: 'img/category-tablets.png',
      name: 'Tablets',
      count: products.tablets.length,
      to: 'tablets',
    },
    {
      imageUrl: 'img/category-accessories.png',
      name: 'Accessories',
      count: products.accessories.length,
      to: 'accessories',
    },
  ];

  return (
    <div className="shop-categories">
      <h1 className="shop-categories__title">Shop by category</h1>

      <div
        className="shop-categories__container"
        data-cy="categoryLinksContainer"
      >
        {categories.map(category => (
          <ShopCategory key={category.name} {...category} />
        ))}
      </div>
    </div>
  );
};
