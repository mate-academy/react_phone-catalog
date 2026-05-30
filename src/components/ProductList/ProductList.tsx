import './ProductList.scss';
import React, { useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { fetchProducts } from '../../api';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import { CategoryHeader } from '../CategoryHeader';
import { Filters } from '../Filters';
import { Card } from '../Card';
import { Pagination } from '../Pagination';
import { NotFoundProduct } from '../NotFoundProduct';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const ProductList: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data: ProductType[] = await fetchProducts();

        const filteredProducts = data.filter(
          product => product.category === category,
        );

        setProducts(filteredProducts);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhones();
  }, [category]);

  const {
    filteredProducts,
    sortBy,
    setSortBy,
    itemPerPage,
    setItemPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useFilteredProducts(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="product-list">
      {products.length === 0 ? (
        <NotFoundProduct />
      ) : (
        <>
          <CategoryHeader
            category={category}
            categoryTitle={title}
            productCount={products.length}
            filterComponent={
              <Filters
                sortBy={sortBy}
                itemPerPage={itemPerPage}
                onSortChange={setSortBy}
                onItemsChange={value => setItemPerPage(Number(value))}
              />
            }
          />

          <div className="product-list__list">
            {filteredProducts.map(product => {
              const {
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
                  key={itemId}
                  id={itemId}
                  category={category}
                  name={name}
                  image={image}
                  price={price}
                  fullPrice={fullPrice}
                  screen={screen}
                  capacity={capacity}
                  ram={ram}
                />
              );
            })}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
};
