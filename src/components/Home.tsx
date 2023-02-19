import { FC } from 'react';
import { Product } from '../types/Product';
import { Footer } from './Footer';
import { Header } from './Header';
import { HomeImages } from './HomeImages';
import { ProductsSlider } from './ProductsSlider';
import { ShopByCategory } from './ShopByCategory';

type Props = {
  products: Product[];
};

export const Home: FC<Props> = ({ products }) => {
  const sortByDiscount = [...products].filter(product => product.discount !== 0)
    .sort((a, b) => a.discount - b.discount);
  const sortByPrice = [...products].filter(product => product.discount === 0)
    .sort((a, b) => b.price - a.price);

  return (
    <>
      <Header />
      <main>
        <HomeImages />
        <ProductsSlider
          products={sortByDiscount}
          title="Hot prices"
        />
        <ShopByCategory products={products} />
        <ProductsSlider
          products={sortByPrice}
          title="Brand new models"
        />

      </main>
      <Footer />
    </>
  );
};
