import { useContext, useEffect, useState } from 'react';
import { getNewItems, getSaleItems } from '../../helpers/functions';
import { Category } from '../../Components/Category';
import { CardCarousel } from '../../Components/CardCarousel';
import { Slider } from '../../Components/Slider';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { SearchContext } from '../../variables/contexts';

export const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsSale, setProductsSale] = useState<Product[]>([]);
  const [productsNew, setProductsNew] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setSearchVisible } = useContext(SearchContext);

  useEffect(() => {
    setSearchVisible(false);
    setIsLoading(true);
    getProducts()
      .then(receivedProducts => {
        setProducts(receivedProducts);
        setIsLoading(false);
      })
      .catch(() => {
      })
      .finally(() => {
      });
  }, []);

  useEffect(() => {
    if (products) {
      setProductsSale(getSaleItems(products));
      setProductsNew(getNewItems(products));
    }
  }, [products]);

  return (
    <main className="page__main">
      <Slider isLoading={isLoading} />
      <CardCarousel
        products={productsSale}
        isLoading={isLoading}
        title="Hot prices"
      />
      <Category products={products} isLoading={isLoading} />
      <CardCarousel
        products={productsNew}
        isLoading={isLoading}
        title="Brand new models"
      />
    </main>
  );
};
