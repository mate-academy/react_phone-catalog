import { useContext } from 'react';
import { StatesContext } from '../../store/GlobalStateProvider';

export const ShopByCategory = () => {
  const { phones, tablets, accessories } = useContext(StatesContext);
  const categories = [
    {
      id: 1,
      category: 'phone',
      title: 'Mobile phones',
      img: '../img/category-phones-sqr.png',
      totalItens: phones.length,
    },
    {
      id: 2,
      category: 'tablets',
      title: 'Tablets',
      img: '../img/category-tablets-sqr.png',
      totalItens: tablets.length,
    },
    {
      id: 3,
      category: 'accessories',
      title: 'Accessories',
      img: '../img/category-accessories-sqr.png',
      totalItens: accessories.length,
    },
  ];

  return (
    <section className="category">
      <h2>Shop by category</h2>
      <div className="category__container">
        {categories.map(cat => (
          <article className="category__group" key={cat.id}>
            <figure className="category__image-frame">
              <img src={cat.img} alt={cat.title} className="category__image" />
              <figcaption className="category__figure-caption">
                <h4>{cat.title}</h4>
                <span className="category__figure-caption-models">
                  {cat.totalItens} models
                </span>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
};
