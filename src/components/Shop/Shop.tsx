import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  const categories = [
    { category_name: 'phones', products_count: 20 },
    { category_name: 'tablets', products_count: 10 },
    { category_name: 'accessories', products_count: 5 },
  ];

  return (
    <section className="category">
      <h2>Shop by category</h2>
      <div className="category__container">
        {categories.map(cat => (
          <article className="category__group" key={cat.category_name}>
            <Link to={`/${cat.category_name}`} className="category__link">
              <figure className="category__image-frame">
                <img
                  src={`./img/category-${cat.category_name}-sqr.png`}
                  alt={cat.category_name}
                  className="category__image"
                />
                <figcaption className="category__figure-caption">
                  <h4>{cat.category_name}</h4>
                  <span className="category__figure-caption-models">
                    {cat.products_count} models
                  </span>
                </figcaption>
              </figure>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
