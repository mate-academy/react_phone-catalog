import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { calculateProductAmount } from '../../helpers/CalcProdAmount';
import { getProduct } from '../../api/apiProducts';
import { Banner } from '../../components/Banner';
import { ProductList } from '../../components/ProductList';

export const HomePage = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const getNewModels = (allProducts: Product[]) => {
    return [...allProducts]
      .filter(product => product.name.includes('14'))
      .sort((p1, p2) => p2.price - p1.price);
  };

  const getHotPrices = (allProducts: Product[]) => {
    return [...allProducts].sort((p1, p2) => {
      const item1 = p1.fullPrice - p1.price;
      const item2 = p2.fullPrice - p2.price;

      return item1 - item2;
    });
  };

  const getNewModelsProd = getNewModels(productList);
  const getHotPricesProd = getHotPrices(productList);

  const productsAmount = useMemo(
    () => calculateProductAmount(productList),
    [productList],
  );

  useEffect(() => {
    setIsLoading(true);
    getProduct()
      .then(setProductList)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="homepage">
      <div className="container">
        <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>
        <section className="homepage__banner">
          <Banner />
        </section>
        {!isLoading && !errorMessage && (
          <section className="homepage__newModels">
            <div className="container">
              <ProductList
                title="Brand new models"
                products={getNewModelsProd.slice(0, 30)}
              />
            </div>
          </section>
        )}
        <section className="Categories">
          <div className="container">
            <Categories amount={productsAmount} />
          </div>
        </section>

        {!isLoading && !errorMessage && (
          <section className="homepage__newModels">
            <div className="container">
              <ProductList
                title="Hot proces"
                products={getHotPricesProd.slice(0, 30)}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
