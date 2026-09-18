import './Main.scss';
import { ProductsSlider } from './ProductsSlider';
import { Banners } from './Banners';
import productsData from '../../../public/api/products.json';
import { Category } from './Category';
import { Hotprices } from './Hotprices';
import { Footer } from '../Footer/Footer';

export const Main = () => {
  const brandNewProducts = [...productsData].sort((a, b) => b.year - a.year);
  const brandNewProductsSort = brandNewProducts;

  return (
    <>
      <main className="main">
        <h1 className="main__title">Product Catalog</h1>

        <div className="main__content">
          <Banners />
          <ProductsSlider products={brandNewProductsSort} />
          <Category />
          <Hotprices products={brandNewProductsSort} />
        </div>
      </main>
      <Footer />
    </>
  );
};
