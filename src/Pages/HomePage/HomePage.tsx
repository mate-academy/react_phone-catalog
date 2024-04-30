import { useEffect, useMemo, useState } from 'react';
import { Banner } from '../../Components/Banner';
import './HomePage.scss';
import { Product } from '../../Types/Product';
import { getProducts } from '../../api/apiProducts';
import { calculateProductAmount } from '../../helpers/calculateProductAmount';
import { ProductsList } from '../../Components/ProductsList';
import { Categories } from '../../Components/Categories';

export const HomePage = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getHotPricesProducts = (allProducts: Product[]) => {
    return [...allProducts].sort((product1, product2) => {
      const items1 = product2.fullPrice - product2.price;
      const items2 = product1.fullPrice - product1.price;

      return items1 - items2;
    });
  };

  const getBrandNewProducts = (allProducts: Product[]) => {
    return [...allProducts]
      .filter(product => product.name.includes('14'))
      .sort((product1, product2) => product2.price - product1.price);
  };

  const productsAmount = useMemo(
    () => calculateProductAmount(productsList),
    [productsList],
  );

  const hotPriceProducts = getHotPricesProducts(productsList);
  const brandNewProducts = getBrandNewProducts(productsList);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProductsList)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="homepage">
      <div className="container">
        <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>
      </div>

      <section className="homepage__banner">
        <Banner />
      </section>

      {!isError && !isLoading && (
        <section className="homepage__proposal">
          <div className="container">
            <ProductsList
              title="Brand new models"
              products={brandNewProducts.slice(0, 30)}
            />
          </div>
        </section>
      )}

      <section className="homepage__categories">
        <div className="container">
          <Categories amount={productsAmount} />
        </div>
      </section>

      {!isError && !isLoading && (
        <section className="homepage__proposal">
          <div className="container">
            <ProductsList
              title="Hot prices"
              products={hotPriceProducts.slice(0, 30)}
            />
          </div>
        </section>
      )}
    </main>
  );
};
