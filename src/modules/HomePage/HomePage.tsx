import './HomePage.module.scss';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { MainSlider } from '../../components/MainSlider';

type CategoryCounts = {
  [key: string]: number;
};

export const HomePage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});

  const categoriesData = [
    {
      name: 'phones',
      title: 'Mobile phones',
      image: 'img/Phones.svg',
      count: categoryCounts.phones || 0,
    },
    {
      name: 'tablets',
      title: 'Tablets',
      image: 'img/Tablets.svg',
      count: categoryCounts.tablets || 0,
    },
    {
      name: 'accessories',
      title: 'Accessories',
      image: 'img/Accessories.svg',
      count: categoryCounts.accessories || 0,
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      const categories = ['phones', 'tablets', 'accessories'];
      const loadedProducts: Product[] = [];
      const counts: CategoryCounts = {};

      for (const category of categories) {
        try {
          const response = await fetch(
            `/react_phone-catalog/api/${category}.json`,
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch ${category}`);
          }

          const products: Product[] = await response.json();

          counts[category] = products.length;

          const productsWithCategory = products.map(product => ({
            ...product,
            category,
          }));

          loadedProducts.push(...productsWithCategory);
        } catch (error) {
          console.error(`Error loading ${category}:`, error);
        }
      }

      setAllProducts(loadedProducts);
      setCategoryCounts(counts);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const phones = allProducts.filter(p => p.category === 'phones');

    const phonesWithDiscount = phones
      .filter(p => p.priceDiscount && p.priceDiscount < p.priceRegular)
      .sort(
        (a, b) =>
          b.priceRegular -
          (b.priceDiscount || 0) -
          (a.priceRegular - (a.priceDiscount || 0)),
      )
      .slice(0, 8);

    setHotPrices(phonesWithDiscount);

    const newestPhones = [...phones]
      .sort((a, b) => b.namespaceId.localeCompare(a.namespaceId))
      .slice(0, 8);

    setNewModels(newestPhones);
  }, [allProducts]);

  return (
    <div className="container">
      <section className="home">
        <div className="home_top-slider">
          <MainSlider />
        </div>

        <div className="home_new-models">
          {newModels.length > 0 && (
            <Slider title="Brand new models" products={newModels} />
          )}
        </div>

        <div className="home_shop-by">
          <ShopByCategory categories={categoriesData} />
        </div>

        <div className="home_hot-prices">
          {hotPrices.length > 0 && (
            <Slider title="Hot prices" products={hotPrices} />
          )}
        </div>
      </section>
    </div>
  );
};
