import { useEffect, useState } from 'react';
import { CategoryList } from '../../components/CategoryList';
import { Loader } from '../../components/Loader';
import { MainSlider } from '../../components/MainSlider';
import { ProductSlider } from '../../components/ProductSlider';
import {
  getAmountOfProducts,
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/api/fetchProducts';
import { categoryArray } from '../../helpers/constants/constants';
import { CategoryCard } from '../../types/Category';
import { Product } from '../../types/Product';
import './styles.scss';

export const HomePage: React.FC = () => {
  const [hotProducts, setHotProducts] = useState<Product[] | null>(null);
  const [newProducts, setNewProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<CategoryCard[] | null>(null);

  const fetchAmountOfProducts = async () => {
    const arrayOfQuantity = await getAmountOfProducts();

    for (let i = 0; i < arrayOfQuantity.length; i += 1) {
      categoryArray[i].quantity = arrayOfQuantity[i] || 0;
    }

    setCategories(categoryArray);
  };

  const fetchHotProducts = async () => {
    const productsFromServer: Product[] = await getHotPriceProducts();

    setHotProducts(productsFromServer);
  };

  const fetchNewProducts = async () => {
    const productsFromServer: Product[] = await getBrandNewProducts();

    setNewProducts(productsFromServer);
  };

  useEffect(() => {
    Promise.all([
      fetchHotProducts(),
      fetchNewProducts(),
      fetchAmountOfProducts(),
    ]);
  }, []);

  return (
    <section className="home-page">
      <MainSlider />
      <div className="hot-prices home-page__block home-page__hot-prices">
        {hotProducts ? (
          <ProductSlider title="Hot Prices" products={hotProducts} />
        ) : (
          <Loader />
        )}
      </div>

      <div className="home-page__block">
        {categories ? (
          <CategoryList categories={categories} />
        ) : (
          <Loader />
        )}
      </div>

      <div className="brand-new home-page__block">
        {newProducts ? (
          <ProductSlider title="Brand new models" products={newProducts} />
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};
