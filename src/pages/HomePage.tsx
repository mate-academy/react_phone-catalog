import { Category } from '../components/Category';
import { ProductSlider } from '../components/ProductSlider';
import { Welcome } from '../components/Welcome';

const cardData = [1, 2, 3, 4, 5, 6, 7];

export const HomePage = () => {
  return (
    <>
      <Welcome />
      <ProductSlider title="New Models" cardData={cardData} />
      <Category />
      <ProductSlider title="Hot Price" cardData={cardData} />
    </>
  );
};
