import { useContext } from 'react';
import { CardProduct } from '../../../shared/components/CardProduct';
import cn from 'classnames';
import style from './productList.module.scss';
import { PageContext } from '../../../../context/PageContext';
import { SearchEnum } from '../../../../types/SearchType';
import { useSearchParams } from 'react-router-dom';

export const ProductList = () => {
  const { products } = useContext(PageContext);
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get(SearchEnum.PAGE)) || 1;
  const perPage = Number(searchParams.get(SearchEnum.ITEMS)) || products.length;

  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <div className={cn(style['product-list'])}>
      {!Boolean(currentProducts.length) && (
        <h1 className={cn(style['product-list__title'])}>
          Product was not found
        </h1>
      )}
      {currentProducts.map(product => (
        <div className={cn(style['product-list__item'])} key={product.id}>
          <CardProduct product={product} />
        </div>
      ))}
    </div>
  );
};
