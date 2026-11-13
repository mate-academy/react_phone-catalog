import './Categories.scss';
import Category from './Category';

const Categories = () => {
  const categories = [
    {
      id: 'phones',
      title: 'Mobile phones',
      image: 'category-phones',
      quantity: 10,
    },
    {
      id: 'tablets',
      title: 'Tablets',
      image: 'category-tablets',
      quantity: 10,
    },
    {
      id: 'accessories',
      title: 'Accessories',
      image: 'category-accessories',
      quantity: 10,
    },
  ];

  return (
    <section className="categories">
      <div className="container column">
        <h2 className="categories__title">Shop by category</h2>
        <div className="categories__section">
          {categories.map(item => {
            return <Category key={item.id} item={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
