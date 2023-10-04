import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './HotPrices.scss';
import { ProductCard } from '../productCard/ProductCard';
import { getProducts } from '../../redux/thunks/product.thunk';
import { SliderButtons } from '../sliderButtons/SliderButtons';
import { Error } from '../error/Error';
import { Loader } from '../loader/Loader';

export const HotPrices = () => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const products = useAppSelector((state) => state.products.list);
  const { isLoading, hasError } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const productsPerPage = 4;
  const totalGroups = useMemo(
    () => Math.ceil(products.length / productsPerPage),
    [products, productsPerPage],
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="hot-prices">
      <div className="hot-prices__header">
        <h1 className="hot-prices__title">Hot prices</h1>
        <SliderButtons
          totalGroups={totalGroups}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
        />
      </div>
      {hasError && !isLoading && <Error />}
      {isLoading && !hasError ? (
        <Loader />
      ) : (
        <div className="hot-prices__slider">
          <div className="hot-prices__slider-container">
            {products
              .slice(
                (currentGroup - 1) * productsPerPage,
                currentGroup * productsPerPage,
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
