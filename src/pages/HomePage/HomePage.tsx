import { useCallback, useContext } from 'react';
import { ProductsContext } from '@/store/ProductsContext';
import { CategoryType } from '@/types/CategoryType';
import { CategoryData } from '@/types/CategoryData';
import { Category } from '@/components/Category/Category';
import { HotProductsSlider } from '@/components/HotProductsSlider/HotProductsSlider';
import { BrandNewModelsSlider } from '@/components/BrandNewModels/BrandNewModels';
import { PicturesSlider } from '@/components/PicturesSlider/PicturesSlider';
import React from 'react';

export default function HomePage() {
  const { products } = useContext(ProductsContext);

  const phones = products.filter(p => p.category === 'phones');

  const getCountItems = useCallback(
    (category: CategoryType) => {
      return products.filter(product => product.category === category).length;
    },
    [products],
  );

  const getDataCategory = useCallback(
    (category: CategoryType) => {
      const data: CategoryData = {
        title: '',
        link: category,
        img: 'img/product-not-found.png',
        amountItems: getCountItems(category),
      };

      switch (category) {
        case CategoryType.PHONES:
          data.title = 'Mobile phones';
          data.img = 'img/category-phones.png';
          break;

        case CategoryType.TABLETS:
          data.title = 'Tablets';
          data.img = 'img/category-tablets.png';
          break;

        case CategoryType.ACCESSORIES:
          data.title = 'Accessories';
          data.img = 'img/category-accessories.png';
          break;
      }

      return data;
    },
    [getCountItems],
  );

  return (
    <section className="flex flex-col justify-center gap-20">
      <h1 className="hidden">Product Catalog</h1>
      <PicturesSlider />
      <div className="px-6 xl:px-[152px] flex flex-col gap-20">
        <BrandNewModelsSlider products={phones} />
        <div className="flex flex-col gap-8">
          <h2 className="font-extrabold text-[22px] sm:text-[32px] text-[#0F0F11]">
            Shop by category
          </h2>
          <div className="flex flex-col sm:flex-row justify-between gap-10 sm:gap-2">
            <Category data={getDataCategory(CategoryType.PHONES)} />
            <Category data={getDataCategory(CategoryType.TABLETS)} />
            <Category data={getDataCategory(CategoryType.ACCESSORIES)} />
          </div>
        </div>

        <HotProductsSlider products={phones} />
      </div>
    </section>
  );
}
