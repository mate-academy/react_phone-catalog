import './HotPrice.scss';
import { useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { fetchProducts } from '../../api';
import { Card } from '../Card';
import { Carousel } from '../Carousel';

export const HotPrice = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data: ProductType[] = await fetchProducts();

        const sortedByDiscount = [...data].sort(
          (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
        );

        const hotPrice = sortedByDiscount.slice(0, 10);

        setProducts(hotPrice);
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
    <section className="hotprice main__margin">
      <div className="hotprice__top">
        <h2 className="hotprice__top-title text__title text__title--basic">
          Hot prices
        </h2>
      </div>

      <Carousel>
        {products.map(product => {
          const {
            id,
            itemId,
            name,
            image,
            price,
            fullPrice,
            screen,
            capacity,
            ram,
          } = product;

          return (
            <Card
              key={id}
              id={itemId}
              name={name}
              image={image}
              price={price}
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
