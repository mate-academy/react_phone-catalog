import './Product.scss';
import { useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { fetchProducts } from '../../api';
import { Card } from '../Card';
import { Carousel } from '../Carousel';

export const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data: ProductType[] = await fetchProducts();

        const maxYear = Math.max(...data.map(product => product.year));
        const newestProducts = data.filter(product => product.year === maxYear);

        setProducts(newestProducts);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="product main__margin">
      <div className="product__top">
        <h2 className="product__top-title text__title text__title--basic">
          Brand new models
        </h2>
      </div>

      <Carousel>
        {products.map(product => {
          const { id, itemId, name, image, fullPrice, screen, capacity, ram } =
            product;

          return (
            <Card
              key={id}
              id={itemId}
              name={name}
              image={image}
              price={undefined}
              fullPrice={fullPrice}
              screen={screen}
              capacity={capacity}
              ram={ram}
              category={'phones'}
            />
          );
        })}
      </Carousel>
    </section>
  );
};
