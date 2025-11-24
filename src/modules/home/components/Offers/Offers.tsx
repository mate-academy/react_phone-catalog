import React from 'react';

type Offer = {
  name: string;
  image: string;
  price: string;
  oldPrice?: string; // opcional, caso queira exibir o preço anterior
};

export const Offers = () => {
  // Lista simulada de ofertas (pode vir de API futuramente)
  const offers: Offer[] = [
    {
      name: 'iPhone 15 Pro',
      image: 'https://via.placeholder.com/150?text=iPhone+15+Pro',
      price: 'R$ 6.499,00',
      oldPrice: 'R$ 7.199,00',
    },
    {
      name: 'Samsung Galaxy S24',
      image: 'https://via.placeholder.com/150?text=Galaxy+S24',
      price: 'R$ 5.299,00',
    },
    {
      name: 'Fone Bluetooth',
      image: 'https://via.placeholder.com/150?text=Fone+Bluetooth',
      price: 'R$ 199,00',
    },
    {
      name: 'Carregador Turbo 30W',
      image: 'https://via.placeholder.com/150?text=Carregador+Turbo',
      price: 'R$ 149,00',
    },
  ];

  return (
    <section className="offers">
      <h2 className="offers__title">Ofertas Especiais</h2>

      <div className="offers__list">
        {offers.map((offer, index) => (
          <article key={index} className="offers__item">
            <img src={offer.image} alt={offer.name} className="offers__image" />

            <h3 className="offers__name">{offer.name}</h3>

            <div className="offers__prices">
              {offer.oldPrice && (
                <span className="offers__old-price">{offer.oldPrice}</span>
              )}
              <span className="offers__price">{offer.price}</span>
            </div>

            <button className="offers__button">Adicionar ao Carrinho</button>
          </article>
        ))}
      </div>
    </section>
  );
};
