import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../ProductContext';
import { ProductCard } from '../ProductCard';
import { Product } from '../../Type/Product';

interface Props {
  product: Product[];
}

export const ProductsList: React.FC<Props> = ({ product }) => {
  const { filterdProducts, setFilterdProducts } = useContext(ProductContext);
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const query = searchParams.get('query') || '';

  const sliseFrom = (+page - 1) * +perPage;
  const sliseTo = +perPage * +page;

  useEffect(() => {
    const filteredProduct = () => {
      const productToFilter = [...product];
      let filteredProducts = productToFilter;

      if (query.trim()) {
        filteredProducts = filteredProducts.filter((prod) => (
          prod.name.toLowerCase().includes(query.toLowerCase())
        ));
      }

      switch (sort) {
        case 'age':
          filteredProducts.sort((a, b) => b.year - a.year);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          filteredProducts.sort((a, b) => b.fullPrice - a.fullPrice);
          break;
        default:
          break;
      }

      return filteredProducts;
    };

    const updatedFilterdProducts = filteredProduct();

    setFilterdProducts(updatedFilterdProducts);
  }, [
    product,
    sliseFrom,
    sliseTo,
    sort,
    query,
    setFilterdProducts,
    perPage]);

  return (
    <div className="ProductsList" data-cy="productList">
      {perPage !== 'all'
        ? (filterdProducts.slice(sliseFrom, sliseTo).map(phone => (
          <ProductCard key={phone.id} product={phone} sale />
        )))
        : (filterdProducts.map(phone => (
          <ProductCard key={phone.id} product={phone} sale />
        )))}
    </div>
  );
};
