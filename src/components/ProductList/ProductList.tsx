import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  let newProducts = useMemo(() => [...products], [products]);
  const sort = searchParams.get('sortBy');
  const query = searchParams.get('query')?.toLocaleLowerCase().trim();

  const page = searchParams.get('page');
  const perPage = searchParams.get('perPage');

  if (query) {
    if (query.includes(' ')) {
      newProducts = newProducts.filter((product) => (
        query.split(' ').every((part) => product.name
          .toLocaleLowerCase()
          .split(' ')
          .some((productNamePart) => productNamePart.includes(part)))
      ));
    } else {
      newProducts = newProducts.filter((product) => (
        product.name.toLowerCase().includes(query)
      ));
    }
  }

  switch (sort) {
    case 'name':
      newProducts.sort((productA, productB) => (
        productA.name.toLowerCase().localeCompare(productB.name.toLowerCase())
      ));
      break;

    case 'age':
      newProducts.sort((productA, productB) => productA.age - productB.age);
      break;

    case 'price':
      newProducts.sort(
        (productA, productB) => productA.price * (100 - productA.discount)
          - productB.price * (100 - productB.discount),
      );
      break;

    default:
      break;
  }

  useEffect(() => {
    if (perPage && page && perPage !== 'all') {
      const lastProductIndex = +perPage * +page;
      const firstProductIndex = lastProductIndex - +perPage;

      setVisibleProducts(
        newProducts.slice(firstProductIndex, lastProductIndex),
      );
    } else {
      setVisibleProducts(newProducts);
    }
  }, [perPage, page, newProducts]);

  if (newProducts.length === 0) {
    return (
      <h1 className="product-list__error">
        no products matching this criteria
      </h1>
    );
  }

  return (
    <div className="product-list" data-cy="productList">
      <div className="product-list__products">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {perPage && (
        <div className="product-list__pagination">
          <Pagination total={newProducts.length} perPage={+perPage} />
        </div>
      )}
    </div>
  );
};
