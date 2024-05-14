import { useEffect, useState } from 'react';
import { CategoryCard } from '../CategoryCard';
import { getProducts } from '../../../../helpers/getProducts';
import { ProductCategories } from '../../../../types/ProductCategories';
import { Product } from '../../../../types/Product';
import './Categories.scss';

export const Categories: React.FC = () => {
  const [phoneModelsAmount, setPhoneModelsAmount] = useState<number>(0);
  const [tabletModelsAmount, setTabletModelsAmount] = useState<number>(0);
  const [accessoryModelsAmount, setAccessoryModelsAmount] = useState<number>(0);

  useEffect(() => {
    getProducts(ProductCategories.Phones).then((phones: Product[]) => {
      setPhoneModelsAmount(phones.length);
    });

    getProducts(ProductCategories.Tablets).then((phones: Product[]) => {
      setTabletModelsAmount(phones.length);
    });

    getProducts(ProductCategories.Accessories).then((phones: Product[]) => {
      setAccessoryModelsAmount(phones.length);
    });
  }, []);

  return (
    <div className="categories">
      <div className="categories__category-wrapper">
        <CategoryCard
          title="Mobile phones"
          photoSrc="./img/category-phones.jpeg"
          modelsAmount={phoneModelsAmount}
          linkSrc="/phones"
        />
      </div>
      <div className="categories__category-wrapper">
        <CategoryCard
          title="Tablets"
          photoSrc="./img/category-tablets.jpeg"
          modelsAmount={tabletModelsAmount}
          linkSrc="/tablets"
        />
      </div>
      <div className="categories__category-wrapper">
        <CategoryCard
          title="Accessories"
          photoSrc="./img/category-accessories.jpeg"
          modelsAmount={accessoryModelsAmount}
          linkSrc="/accessories"
        />
      </div>
    </div>
  );
};
