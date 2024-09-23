import { useContext } from 'react';
import { StatesContext } from '../../store/GlobalStateProvider';

export const ShopByCategory = () => {
  const { categories } = useContext(StatesContext);

  return (
    <section className="category">
      <h2>Shop by category</h2>
      <div className="category__container">
        {categories.map(cat => (
          <article className="category__group" key={cat.id}>
            <figure className="category__image-frame">
              <img
                src={`./img/category-${cat.id}-sqr.png`}
                alt={cat.title}
                className="category__image"
              />
              <figcaption className="category__figure-caption">
                <h4>{cat.title}</h4>
                <span className="category__figure-caption-models">
                  {cat.productsCount} models
                </span>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
};
