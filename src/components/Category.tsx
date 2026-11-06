import { CategoriyItem } from '../interface/Product';
import { Link } from 'react-router-dom';

interface CategoryProps {
  item: CategoriyItem;
}

const Category = ({ item }: CategoryProps) => {
  return (
    <article className="categories__category">
      <Link className="categories__link" to={`/${item.id}`}>
        <div className="categories__box">
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/img/${item.image}.webp`}
            alt="phone category"
            className="categories__image"
          />
        </div>
        <h3 className="categories__title">{item.title}</h3>
        <p className="categories__subtitle">{item.quantity} models</p>
      </Link>
    </article>
  );
};

export default Category;
