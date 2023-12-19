import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../helpers/Types';
import { ProductCard } from './ProductCard';
import { NoSearchResults } from './NoSearchResults';

export type FavouritesListProps = {
  products: Product[]
};

export enum SortEnum {
  Newest = 'age',
  Alphabetically = 'name',
  Cheapest = 'price',
}

export enum ItemsOnPage {
  Default = '4',
  I8 = '8',
  I16 = '16',
  IAll = 'all',
}

export const FavouritesList = ({ products }: FavouritesListProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [productsPerPage, setproductsPerPage] = useState<Product[]>([]);

  useEffect(() => {
    let sortedProducts = [...products];

    if (query) {
      sortedProducts = sortedProducts.filter((product) => (
        product.name.toLowerCase().includes(query.toLocaleLowerCase())
      ));
    }

    setproductsPerPage(() => sortedProducts);
  }, [products, query]);

  return (
    <div className="product">
      <p className="product__description BodyText">
        {`${products?.length} items`}
      </p>
      {productsPerPage.length > 0 ? (
        <ul className="product__list" data-cy="productList">
          {productsPerPage && productsPerPage.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ul>
      ) : (<NoSearchResults />)}
    </div>
  );
};
