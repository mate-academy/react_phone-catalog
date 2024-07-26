import { ProductSlider } from '../ProductSlider';

const cardData = [1, 2, 3, 4, 5, 6, 7];

export const HotPrice = () => {
  return (
    <section id="hotPrice">
      <ProductSlider title="Hot prices" cardData={cardData} />
    </section>
  );
};
