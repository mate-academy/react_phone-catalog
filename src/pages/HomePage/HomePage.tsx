import { Slider } from '../../components/Slider/Slider';
import './HomePage.scss';
import { ProductDetailShort } from '../../types/ProductDetailShort';
import { useMemo } from 'react';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import { Link } from 'react-router-dom';
import { getPublicUrl } from '../../utils/publicUrl';

interface Props {
  products: ProductDetailShort[];
}

export const HomePage: React.FC<Props> = ({ products }) => {
  const phones = [...products];

  const hotPricesProducts = useMemo(() => {
    return [...phones]
      .filter(p => p.price < p.fullPrice)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 8);
  }, [phones]);

  const brandNewProducts = [...phones]
    .sort((a, b) => b.year - a.year)
    .slice(0, 8);

  return (
    <div className="HomePage grid">
      <div className="grid--sub">
        <h1 className="HomePage-title hiden">Product Catalog</h1>
        <h2 className="HomePage-title ">Welcome to Nice Gadgets store!</h2>
      </div>
      <Slider />
      <ProductSlider products={brandNewProducts} title="Brand new models" />
      <div className="Categories grid--sub">
        <h2 className="Categories-title">Shop by category</h2>
        <div className="Categories-list grid--sub">
          <Link className="Categories-list-item" to="/phones">
            <CategoryCard
              imageSrc={getPublicUrl('img/category-phones-photo.png')}
              title="Mobile phones"
              amount={phones.filter(a => a.category === 'phones').length}
            />
          </Link>
          <Link className="Categories-list-item" to="/tablets">
            <CategoryCard
              imageSrc={getPublicUrl('img/category-tables-photo.png')}
              title="Tablets"
              amount={phones.filter(a => a.category === 'tablets').length}
            />
          </Link>
          <Link className="Categories-list-item" to="/accessories">
            <CategoryCard
              imageSrc={getPublicUrl('img/category-accessories-photo.png')}
              title="Accessories"
              amount={phones.filter(a => a.category === 'accessories').length}
            />
          </Link>
        </div>
      </div>
      <ProductSlider products={hotPricesProducts} title="Hot prices" />
    </div>
  );
};
