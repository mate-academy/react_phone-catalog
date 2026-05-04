import { useContext } from 'react';
import Carousel from '../components/base/Carousel';
import ProductSlider from '../components/base/ProductSlider';
import CategoryBox from '../components/ui/CategoryBox';
import { ProductContext } from '../context/ProductContext';

const boxes = [
  {
    modelQuantity: 95,
    name: 'Mobile phones',
    background: 'bg-gray-700',
    image: '/img/category-phones.webp',
    alt: 'phones category',
    categoryRoute: 'phones',
  },
  {
    modelQuantity: 24,
    name: 'Tablets',
    background: 'bg-[#8D8D92]',
    image: '/img/category-tablets.webp',
    alt: 'tablets category',
    categoryRoute: 'tablets',
  },
  {
    modelQuantity: 100,
    name: 'Accessories',
    background: 'bg-[#D53C51]',
    image: '/img/category-accessories.webp',
    alt: 'accessories category',
    categoryRoute: 'accessories',
  },
];

const HomePage = () => {
  const { products } = useContext(ProductContext);

  const filteredProductsByPrice = [...products].sort(
    (a, b) => b.price - a.price,
  );

  const filteredProductsByYear = [...products].sort((a, b) => b.year - a.year);

  return (
    <main className="flex flex-col w-full h-full p-4 sm:p-6 md:p-8  gap-20">
      <h1 className="text-5xl font-bold pt-14">
        Welcome to Nice Gadgets store!
      </h1>
      <div className="flex w-full flex-col items-center">
        <Carousel />
      </div>
      <div className="felx items-center">
        <ProductSlider
          title="Brand new models"
          filteredProducts={filteredProductsByYear}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold">Shop by category</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {boxes.map(box => (
            <CategoryBox key={box.name} {...box} />
          ))}
        </div>
      </div>
      <div>
        <ProductSlider
          title="Hot prices"
          filteredProducts={filteredProductsByPrice}
        />
      </div>
    </main>
  );
};

export default HomePage;
