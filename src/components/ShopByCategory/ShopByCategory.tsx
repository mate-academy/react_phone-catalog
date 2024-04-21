import './ShopByCategory.scss';
import { Category } from '../Category';
import { categoryLinks } from '../../services/categoryLinks';

export const ShopByCategory = () => {
  return (
    <section className="shop-by-category">
      <div className="shop-by-category__content">
        <h2 className="title">Shop by category</h2>

        <div
          data-cy="categoryLinksContainer"
          className="shop-by-category__categories"
        >
          {categoryLinks.map((category) => (
            <Category key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
