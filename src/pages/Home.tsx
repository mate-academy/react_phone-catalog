// import { useEffect, useState } from 'react';
// import { ProductsSlider } from '../components/ProductsSlider';
// import { Product } from '../types/Product';
// import { getProducts } from '../api/products';
// import { getHotPriceProducts } from '../helpers/getHotPriceProducts';
// import { getBrandNewProducts } from '../helpers/getBrandNewProducts';

// import { CategoryList } from '../components/CategoryList';

export const Home = () => {
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const loadedProducts = await getProducts();
  //
  //       setProducts(loadedProducts);
  //     } catch (e) {
  //       throw new Error('getHotPriceProducts errro');
  //     }
  //   }
  //
  //   fetchProducts();
  // }, []);

  // const hotPriceProducts = getHotPriceProducts(products);
  // const brandNewProducts = getBrandNewProducts(products);

  return (
    <>
      {/*<CategoryList />*/}
      {/* <ProductsSlider */}
      {/*  title="Hot prices" */}
      {/*  products={hotPriceProducts} */}
      {/* /> */}
      {/* <ProductsSlider */}
      {/*  title="Brand new models" */}
      {/*  products={brandNewProducts} */}
      {/* /> */}
    </>
  );
};
