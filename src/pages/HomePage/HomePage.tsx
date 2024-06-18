import './HomePage.scss';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { ProductsSlider } from '../../components/ProductsSlider';
import { PictureSlider } from '../../components/PictureSlider';
import { Categories } from '../../components/Categories';
import { getProducts } from '../../api/products';
import { ProductCategories } from '../../types/ProductCategories';

const blankProducts: null[] = new Array(10).fill(null);

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productNumbers, setProductNumbers] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  const calculateProductsNumber = (productsFromServer: Product[]) => {
    const initialProductNumber = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    productsFromServer.forEach(product => {
      switch (product.category) {
        case ProductCategories.ACCESSORIES:
          initialProductNumber.accessories++;
          break;

        case ProductCategories.PHONES:
          initialProductNumber.phones++;
          break;

        case ProductCategories.TABLETS:
          initialProductNumber.tablets++;
          break;
      }
    });

    setProductNumbers(initialProductNumber);
  };

  const loadProducts = async () => {
    try {
      const productsFromServer = await getProducts();

      calculateProductsNumber(productsFromServer);
      setProducts(productsFromServer);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const hotProducts = products
    .toSorted((product, nextProduct) => {
      return (
        nextProduct.fullPrice -
        nextProduct.price -
        product.fullPrice -
        product.price
      );
    })
    .slice(0, 20);

  const newProducts = products
    .toSorted((product, nextProduct) => {
      return nextProduct.year - product.year;
    })
    .slice(0, 20);

  return (
    <main className="homepage container">
      <div className="homepage__content">
        <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>
        <PictureSlider />

        <ProductsSlider
          products={newProducts.length > 0 ? newProducts : blankProducts}
          title="Brand new models"
        />

        <Categories productNumbers={productNumbers} />

        <ProductsSlider
          products={hotProducts.length > 0 ? hotProducts : blankProducts}
          title="Hot prices"
        />
      </div>
    </main>
  );
};
