/* eslint-disable @typescript-eslint/indent */
import { memo } from 'react';
import { Product } from '../../model/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsCardSceleton } from '../ProductCard/ProductsCardSceleton';
import { PaginationProducts } from '../../../../widgets/PaginationProducts';
import { useToggleCardActions } from '../../model/hooks/useToggleCardActions';
import cls from './productsList.module.scss';

interface Props {
  products: Product[];
  isLoading: boolean;
  totalPages?: number;
  onChangeCurrentPage?: (page: number) => void;
  currentPage?: number;
}

const getSceletons = () =>
  Array.from({ length: 4 }, (_, index) => index).map(item => (
    <ProductsCardSceleton key={item} />
  ));

export const ProductsList = memo((props: Props) => {
  const {
    products,
    isLoading,
    totalPages = 1,
    onChangeCurrentPage = () => {},
    currentPage = 1,
  } = props;

  const [toggleFavorite, toggleCart] = useToggleCardActions();

  return (
    <>
      <div className={cls.productsList__body}>
        {isLoading && getSceletons()}
        {!isLoading &&
          products &&
          products.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              toggleFavorite={toggleFavorite}
              toggleCart={toggleCart}
            />
          ))}
      </div>

      {totalPages !== 1 && (
        <PaginationProducts
          onPageChange={onChangeCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </>
  );
});
