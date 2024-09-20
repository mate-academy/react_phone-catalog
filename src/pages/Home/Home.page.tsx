import { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { ProductSlider } from '../../components/base/ProductSlider/ProductSlider.component';
// eslint-disable-next-line max-len
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory.component';
import { Welcome } from '../../components/Welcome/Welcome.component';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { getProductsSummary } from '../../api/products';
import { ProductSummary } from '../../types/ProductSummary';

export const HomePage = () => {
  const [sortByYear, setSortByYear] = useState<ProductSummary[]>([]);
  const [sortByDiscount, setSortByDiscount] = useState<ProductSummary[]>([]);

  useEffect(() => {
    getProductsSummary().then(products => {
      setSortByYear([...products].sort((a, b) => b.year - a.year));
      setSortByDiscount(
        [...products].sort(
          (a, b) => calculateDiscount(b) - calculateDiscount(a),
        ),
      );
    });
  }, []);

  return (
    <div className="home-page">
      <Welcome />
      <ProductSlider
        title={'Brand new models'}
        products={sortByYear}
        showDiscount={false}
      />
      <ShopByCategory />
      <ProductSlider
        title={'Hot prices'}
        products={sortByDiscount}
        showDiscount={true}
      />
    </div>
  );
};
