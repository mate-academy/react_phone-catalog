import { useEffect, useState } from 'react';
import { Banner } from '../components/Banner';
import { ProductsSlider } from '../components/ProductsSlider';
import { Product } from '../types/products';
import {
  getAmountOfProducts,
  getBrandNewModels,
  getHotPriceProducts,
} from '../api/products';
import categoryPhonesImg from '../images/category-phones.webp';
import categoryTabletsImg from '../images/category-tablets.webp';
import categoryAccessoriesImg from '../images/category-accessories.webp';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [productsAmount, setProductsAmount] = useState({
    accessories: 0,
    phones: 0,
    tablets: 0,
  });

  useEffect(() => {
    getBrandNewModels().then(setBrandNewModels);
    getHotPriceProducts().then(setHotPriceProducts);
    getAmountOfProducts().then(setProductsAmount);
  }, []);

  return (
    <main className="flex flex-col gap-16 pb-16 pt-6">
      <Banner />

      <ProductsSlider
        className="content-padding"
        discount={false}
        title="Brand new models"
        slides={brandNewModels}
      />

      <section className="content-padding flex w-full flex-col gap-6">
        <h2>Shop by category</h2>

        <div className="flex w-full flex-col gap-8 md:flex-row md:gap-4">
          <div className="flex w-full flex-col gap-6">
            <Link to="/phones">
              <div
                className="aspect-square w-full overflow-hidden bg-[#6D6474]
                transition hover:scale-110
                hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.102)]"
              >
                <img
                  className="translate-x-16 translate-y-16"
                  src={categoryPhonesImg}
                  alt="Category phones"
                />
              </div>
            </Link>
            <div className="flex flex-col gap-1">
              <h4>Mobile phones</h4>
              <p className="text-secondary">{`${productsAmount.phones} models`}</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6">
            <Link to="/tablets">
              <div
                className="aspect-square w-full overflow-hidden bg-[#8D8D92]
                transition hover:scale-110
                hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.102)]"
              >
                <img
                  className="translate-x-16 translate-y-16"
                  src={categoryTabletsImg}
                  alt="Category phones"
                />
              </div>
            </Link>
            <div className="flex flex-col gap-1">
              <h4>Tablets</h4>
              <p className="text-secondary">{`${productsAmount.tablets} models`}</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6">
            <Link to="/accessories">
              <div
                className="aspect-square w-full overflow-hidden bg-[#973D5F]
                transition hover:scale-110
                hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.102)]"
              >
                <img
                  className="translate-x-16 translate-y-16"
                  src={categoryAccessoriesImg}
                  alt="Category phones"
                />
              </div>
            </Link>
            <div className="flex flex-col gap-1">
              <h4>Accessories</h4>
              <p className="text-secondary">{`${productsAmount.accessories} models`}</p>
            </div>
          </div>
        </div>
      </section>

      <ProductsSlider
        className="content-padding"
        title="Hot prices"
        slides={hotPriceProducts}
      />
    </main>
  );
};
