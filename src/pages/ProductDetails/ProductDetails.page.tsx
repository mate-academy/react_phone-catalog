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
// eslint-disable-next-line max-len
import { ProductDetailsDescription } from '../../components/ProductDetailsDescription/ProductDetailsDescription.component';
// eslint-disable-next-line max-len
import { ProductDetailsSpecs } from '../../components/ProductDetailsSpecs/ProductDetailsSpecs.component';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { category: categoryId } = useParams();
  const { categories, isReady, selectedProduct } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const category = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    locateProduct(productId as string, categoryId as string).then(prod => {
      if (prod) {
        dispatch({ type: 'selectedProduct', payload: prod });
      }

      return;
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
        <ProductDetailsDescription />
        <ProductDetailsSpecs />
      </div>
    );
  } else {
    return 'Loading... Please wait';
  }
};
