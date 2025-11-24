import React from 'react';

type PhoneModel = {
  name: string;
  image: string;
};

export const PhoneModels = () => {
  const phoneModels: PhoneModel[] = [
    {
      name: 'iPhone 15 Pro',
      image: 'https://via.placeholder.com/150?text=iPhone+15+Pro',
    },
    {
      name: 'Samsung Galaxy S24',
      image: 'https://via.placeholder.com/150?text=Galaxy+S24',
    },
    {
      name: 'Google Pixel 8',
      image: 'https://via.placeholder.com/150?text=Pixel+8',
    },
    {
      name: 'Xiaomi 14 Ultra',
      image: 'https://via.placeholder.com/150?text=Xiaomi+14+Ultra',
    },
  ];

  return (
    <section className="phone-models">
      <h2 className="phone-models__title">Brand new models</h2>

      <div className="phone-models__list">
        {phoneModels.map((model, index) => (
          <article key={index} className="phone-models__item">
            <img
              src={model.image}
              alt={model.name}
              className="phone-models__image"
            />
            <h3 className="phone-models__name">{model.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
};
