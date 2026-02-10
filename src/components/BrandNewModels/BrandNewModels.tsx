import './BrandNewModels.scss';

export const BrandNewModels = () => {
  const images = [
    '/img/iphones/Product card.png',
    '/img/iphones/Product card (1).png',
    '/img/iphones/Product card (2).png',
    '/img/iphones/Product card (3).png',
  ];

  return (
    <section className="brandNew">
      <div className="brandNew__title">
        <h2>Brand</h2>
        <h2>new</h2>
        <h2>models</h2>
      </div>

      <div className="brandNew__list">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Brand model ${index + 1}`}
            className="brandNew__image"
          />
        ))}
      </div>
    </section>
  );
};
