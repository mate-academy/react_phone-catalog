import { useContext, useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductsSlider';
import { Slider } from '../../components/Slider';
import './HomePage.scss';
import { Category, Product } from '../../types/product';
import { MyLoader } from '../../components/UI/MyLoader';
import { categories } from '../../api/category/category';
import { CategoryItem } from '../../components/CategoryItem';
import { DispatchContext, StateContext } from '../../store/State';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/productsHelpers';
import { getAllProducts } from '../../api/productApi';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const { allProducts, loading, loadingError } = useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllProducts<Product[]>()
      .then(products => {
        dispatch({ type: 'getAllProducts', payload: products });
      })
      .catch(() => dispatch({
        type: 'setLoadingError',
        payload: 'Something went wrong...',
      }))
      .finally(() => dispatch({ type: 'setLoading', payload: false }));

    const favoriteProducts = localStorage.getItem('favoriteProducts');

    if (!favoriteProducts) {
      localStorage.setItem('favoriteProducts', JSON.stringify([]));
    } else {
      dispatch({
        type: 'updateFavorite',
        payload: JSON.parse(favoriteProducts),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setNewProducts(getBrandNewProducts(allProducts));
    setHotProducts(getHotPriceProducts(allProducts));
  }, [allProducts]);

  return (
    <div className="homepage">
      <h1 className="visually-hidden">Home Page</h1>

      <section className="homepage__slider homepage__section">
        <Slider />
      </section>

      <section className="homepage__hot homepage__section">
        <h2 className="homepage__section-title">Hot prices</h2>
        {loading
          ? <MyLoader />
          : (
            <>
              {loadingError
                ? <h3>{loadingError}</h3>
                : <ProductSlider products={hotProducts} />}
            </>
          )}
      </section>

      <section className="homepage__section">
        <h2 className="homepage__section-title">Shop by category</h2>

        <div
          className="homepage__categories"
          data-cy="categoryLinksContainer"
        >
          {categories.map((category: Category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="homepage__section">
        <h2 className="homepage__section-title">Brand new models</h2>
        {loading
          ? <MyLoader />
          : (
            <>
              {loadingError
                ? <h3>{loadingError}</h3>
                : <ProductSlider products={newProducts} />}
            </>
          )}
      </section>
    </div>
  );
};
