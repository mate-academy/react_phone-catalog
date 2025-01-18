import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../store/GlobalProvider';
import { fetchProducts, locateProduct } from '../../helpers/helpers';
import { NavigationPath } from '../../components/NavigatiomPath/NavigationPath';
import { BackPath } from '../../components/BackPath/BackPath';
// eslint-disable-next-line max-len
import { ProductDetailsInfo } from '../../components/ProductDetailsInfo/ProductDetailsInfo';
// eslint-disable-next-line max-len
import { ProductDetailsMore } from '../../components/ProductDetailsMore/ProductDetailsMore';
import { Loader } from '../../components/Loader/Loader';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { category: categoryId } = useParams();
  const { categories, selectedProduct, products } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const category = categories.find(cat => cat.id === categoryId);

  const [loading, setLoading] = useState(false);
  const prodId = products.find(p => p.itemId === selectedProduct?.id);

  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
      fetchProducts().then(data => {
        dispatch({ type: 'loadProducts', payload: data });
      });
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    setLoading(true);
    locateProduct(productId as string, categoryId as string)
      .then(prod => {
        if (prod) {
          dispatch({ type: 'selectedProduct', payload: prod });
        }

        return;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, dispatch, productId]);

  useEffect(() => {
    window.scrollTo(0, 0); // Прокручує на верх сторінки
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (category && selectedProduct) {
    const validProdId = prodId ?? null;

    return (
      <section>
        <NavigationPath
          firstLvl={category.title}
          secondLvl={selectedProduct.name}
        />

        <BackPath />

        {validProdId && (
          <ProductDetailsInfo
            title={selectedProduct.name}
            prodId={validProdId}
          />
        )}

        <ProductDetailsMore />
      </section>
    );
  }

  return <Loader />;
};
