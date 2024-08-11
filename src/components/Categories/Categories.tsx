import { useContext } from 'react';
import { ProductContext } from '../../shared/Context/ProductContext';
import { categories } from '../../utils/kit';
import { Link } from 'react-router-dom';
import './Categories.scss';

export const Categories: React.FC = () => {
  const { products } = useContext(ProductContext);

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>
      <div className="categories__container">
        {categories.map(category => {
          const cardNum = products.filter(
            item => item.category === category.alt,
          ).length;

          return (
            <div className="categories__card" key={category.id}>
              <Link to={category.href}>
                <img
                  className="categories__card-img"
                  src={category.img}
                  alt={category.alt}
                />
              </Link>

              <h4 className="categories__card-title">{category.title}</h4>
              <p className="categories__card-num">{`${cardNum} models`}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
