import { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { NavigationPath } from '../../components/NavigationPath/NavigationPath.component';
import {
  DispatchContext,
  StatesContext,
} from '../../store/GlobalStateProvider';
import { useParams } from 'react-router-dom';
import { getProductsSummary, locateProduct } from '../../api/products';
import { BackPath } from '../../components/BackPath/BackPath.component';
// eslint-disable-next-line max-len
import { ProductDetailsMain } from '../../components/ProductDetailsMain/ProductDetailsMain.component';
// eslint-disable-next-line max-len
import { ProductDetailsDescription } from '../../components/ProductDetailsDescription/ProductDetailsDescription.component';
// eslint-disable-next-line max-len
import { ProductDetailsSpecs } from '../../components/ProductDetailsSpecs/ProductDetailsSpecs.component';
// eslint-disable-next-line max-len
import { ProductSlider } from '../../components/base/ProductSlider/ProductSlider.component';
import { ProductSummary } from '../../types/ProductSummary';
// eslint-disable-next-line max-len
import { ProductDetailsCarousel } from '../../components/ProductDetailsCarousel/ProductDetailsCarousel.component';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { category: categoryId } = useParams();
  const { categories, isReady, selectedProduct } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const category = categories.find(cat => cat.id === categoryId);
  const [suggested, setSuggested] = useState<ProductSummary[]>();

  useEffect(() => {
    locateProduct(productId as string, categoryId as string).then(prod => {
      if (prod) {
        dispatch({ type: 'selectedProduct', payload: prod });
      }

      return;
    });
  }, [categoryId, dispatch, productId]);

  useEffect(() => {
    getProductsSummary().then(prods => {
      setSuggested(prods.filter(p => p.category === selectedProduct?.category));
    });
  }, [selectedProduct]);

  if (category && isReady && selectedProduct) {
    return (
      <div className="productDetails-page">
        <NavigationPath
          firstLevel={category.id}
          secondLevel={selectedProduct.name}
        />
        <BackPath />
        <h2 className="title">{selectedProduct.name}</h2>
        <div className="productDetailCard">
          <ProductDetailsCarousel />
          <ProductDetailsMain />
        </div>
        <ProductDetailsDescription />
        <ProductDetailsSpecs />
        {suggested && (
          <div className="productDetails-page__suggested">
            <ProductSlider
              title="You may also like"
              products={suggested}
              showDiscount={false}
            />
          </div>
        )}
      </div>
    );
  } else {
    return 'Loading... Please wait';
  }
};
