import React from 'react';

type Category = {
  name: string;
  image: string;
};

export const Categories = () => {
  // Lista fixa (pode ser carregada de API futuramente)
  const categories: Category[] = [
    {
      name: 'Mobile phones',
      image: 'https://via.placeholder.com/150?text=Telefones',
    },
    {
      name: 'Tablets',
      image: 'https://via.placeholder.com/150?text=Tablets',
    },
    {
      name: 'Accessories',
      image: 'https://via.placeholder.com/150?text=Acessórios',
    },
  ];

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__list">
        {categories.map((cat, index) => (
          <article key={index} className="categories__item">
            <img src={cat.image} alt={cat.name} className="categories__image" />
            <h3 className="categories__name">{cat.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
};
