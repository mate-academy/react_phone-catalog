import { useContext, useEffect } from 'react';
// eslint-disable-next-line max-len
import { NavigationPath } from '../../components/NavigationPath/NavigationPath.component';
import {
  DispatchContext,
  StatesContext,
} from '../../store/GlobalStateProvider';
import { useParams } from 'react-router-dom';
import { locateProduct } from '../../api/products';
import { BackPath } from '../../components/BackPath/BackPath.component';
// eslint-disable-next-line max-len
import { ProductDetailsMain } from '../../components/ProductDetailsMain/ProductDetailsMain.component';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { category: categoryId } = useParams();
  const { categories, isReady, selectedProduct } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const category = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    locateProduct(productId ?? '', categoryId ?? '').then(prod => {
      dispatch({ type: 'selectedProduct', payload: prod });
    });
  }, [categoryId, dispatch, productId]);
  if (category && isReady && selectedProduct) {
    return (
      <div className="productDetails-page">
        <NavigationPath
          firstLevel={category.id}
          secondLevel={selectedProduct.name}
        />
        <BackPath />
        <ProductDetailsMain />
      </div>
    );
  } else {
    return 'Loading... Please wait';
  }
};
