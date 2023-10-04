import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SliderButtons } from '../sliderButtons/SliderButtons';
import './NewModels.scss';
import { ProductCard } from '../productCard/ProductCard';
import { Error } from '../error/Error';
import { getProducts } from '../../redux/thunks/product.thunk';
import { Loader } from '../loader/Loader';

export const NewModels = () => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const products = useAppSelector((state) => state.products.list);
  const { isLoading, hasError } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productsPerPage = 4;
  const totalGroups = useMemo(
    () => Math.ceil(products.length / productsPerPage),
    [products, productsPerPage],
  );

  const sortedProducts = [...products].sort(
    (product1, product2) => product2.price - product1.price,
  );

  return (
    <div className="newModels">
      <div className="newModels__header">
        <h1 className="newModels__title">Brand new models</h1>
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
        <div className="newModels__slider">
          <div className="newModels__slider-container">
            {sortedProducts
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
