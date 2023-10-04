import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SliderButtons } from '../sliderButtons/SliderButtons';
import './RandomPhones.scss';
import { ProductCard } from '../productCard/ProductCard';
import { getProducts } from '../../redux/thunks/product.thunk';
import { Error } from '../error/Error';
import { Loader } from '../loader/Loader';

export const RandomPhones = () => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const products = useAppSelector((state) => state.products.list);
  const dispatch = useAppDispatch();
  const { hasError, isLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productsPerPage = 4;
  const totalGroups = useMemo(
    () => Math.ceil(products.length / productsPerPage),
    [products, productsPerPage],
  );

  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());

  return (
    <div className="random_phones">
      <div className="random_phones__header">
        <h1 className="random_phones__title">You may also like</h1>
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
        <div className="random_phones__slider">
          <div className="random_phones__slider-container">
            {shuffledProducts
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
