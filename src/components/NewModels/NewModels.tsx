import { ProductSlider } from '../ProductSlider';

const cardData = [1, 2, 3, 4, 5, 6, 7];

export const NewModels = () => {
  return (
    <section id="newModels">
      <ProductSlider title="Brand new models" cardData={cardData} />
    </section>
  );
};
