import { ProductsCards } from '../../components/ProductsCards/ProductsCards';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Welcome } from '../../components/Welcome/Welcome';

export const Home: React.FC = () => {
  return (
    <>
      <Welcome />
      <ProductsCards title="Brand new model" priceMode="full" />
      <ShopByCategory />
      <ProductsCards
        title="Hot Prices"
        priceMode="discount"
        filter={p => p.fullPrice !== p.price}
      />
    </>
  );
};
