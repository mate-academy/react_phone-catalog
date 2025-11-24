import React from 'react';
import { Header } from '../modules/shared/components/Header/Header';
import { Footer } from '../modules/shared/components/Footer/Footer';

type Phone = {
  id: number;
  name: string;
  image: string;
  price: string;
};

export const PhonesPage = () => {
  // Quatro modelos base
  const baseModels: Phone[] = [
    {
      id: 1,
      name: 'Galaxy S24 Ultra',
      image: 'https://via.placeholder.com/180x180?text=Galaxy+S24+Ultra',
      price: 'R$ 6.499,00',
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max',
      image: 'https://via.placeholder.com/180x180?text=iPhone+15+Pro+Max',
      price: 'R$ 9.299,00',
    },
    {
      id: 3,
      name: 'Xiaomi 14 Pro',
      image: 'https://via.placeholder.com/180x180?text=Xiaomi+14+Pro',
      price: 'R$ 4.199,00',
    },
    {
      id: 4,
      name: 'Motorola Edge 50',
      image: 'https://via.placeholder.com/180x180?text=Motorola+Edge+50',
      price: 'R$ 3.499,00',
    },
  ];

  // Gera 16 itens repetindo os 4 modelos
  const phones: Phone[] = Array.from({ length: 16 }, (_, index) => {
    const base = baseModels[index % baseModels.length];

    return { ...base, id: index + 1 };
  });

  return (
    <>
      <Header />
      <main className="phones">
        <section className="phones__intro">
          <h1 className="phones__title">Modelos de Telefones</h1>
          <p className="phones__text">
            Explore nossa seleção com os melhores smartphones do mercado.
          </p>
        </section>

        <section className="phones__grid">
          {phones.map(phone => (
            <article key={phone.id} className="phones__item">
              <img
                src={phone.image}
                alt={phone.name}
                className="phones__image"
              />
              <h3 className="phones__name">{phone.name}</h3>
              <p className="phones__price">{phone.price}</p>

              <div className="phones__actions">
                <button className="phones__btn">Adicionar ao carrinho</button>
                <button className="phones__btn">Favoritar</button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};
