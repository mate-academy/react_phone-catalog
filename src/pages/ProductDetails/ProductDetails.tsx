import { Product } from '../../types/Product';
import { Category } from '../../types/Category';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import {
  DispatchContext,
  StatesContext,
} from '../../base/store/GlobalStateProvider';

import {
  getCategories,
  getProductDetails,
  getSuggestedProducts,
} from '../../api/products';

import { NavigationPath } from '../../components/Navigation/Navigation';
import { BackPath } from '../../components/BackButton/BackButton';
import { ProductDetailsCarousel } from '../../components/ProductDetailsCarousel/ProductDetailsCarousel';
import { ProductDetailsMain } from '../../components/ProductMain/ProductMain';
import { ProductDetailsDescription } from '../../components/ProductDescription/ProductDescription';
import { ProductSlider } from '../../base/ProductSlider/ProductSlider';
import { ProductDetailsSpecs } from '../../components/ProductDetail/ProductDetail';

import './ProductDetails.scss';

export const ProductDetailsPage = () => {
  const { productId, category } = useParams();
  const { selectedProduct } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);

  const [categoryData, setCategory] = useState<Category>();
  const [suggested, setSuggested] = useState<Product[]>();

  useEffect(() => {
    getCategories().then(cats => {
      const foundCategory = cats.find(
        (cat: Category) => cat.category_name === category,
      );

      setCategory(foundCategory);
    });
  }, [category]);

  useEffect(() => {
    if (productId && category) {
      getProductDetails(productId, category)
        .then(prod => {
          if (prod) {
            const productForContext = {
              id: prod.id,
              name: prod.name,
              categoryId: category,
              images: prod.images,
              description: prod.description,
              specs: {
                screen: prod.screen,
                resolution: prod.resolution,
                processor: prod.processor,
                ram: prod.ram,
                camera: prod.camera,
                zoom: prod.zoom,
                cell: prod.cell,
                color: prod.color,
                capacity: prod.capacity,
              },
              avaiableVariants: {
                colorsAvaiable: prod.colorsAvailable,
                capacityAvailable: prod.capacityAvailable,
              },
            };

            dispatch({
              type: 'selectedProduct',
              payload: productForContext,
            });
          }
        })
        .catch(() => {
          // Error handled silently
        });
    }
  }, [dispatch, productId, category]);

  useEffect(() => {
    if (productId && category) {
      getSuggestedProducts(productId, category, 12).then(prods => {
        setSuggested(prods);
      });
    }
  }, [productId, category]);

  if (categoryData && selectedProduct) {
    return (
      <div className="productDetails-page">
        <NavigationPath
          firstLevel={categoryData.category_name}
          secondLevel={selectedProduct.name}
        />

        <BackPath />

        <h2 className="title">{selectedProduct.name}</h2>

        <div className="productDetailCard">
          <ProductDetailsCarousel />
          <ProductDetailsMain />
        </div>

        <div className="productDetails-page__info">
          <ProductDetailsDescription />
          <ProductDetailsSpecs />
        </div>

        {suggested && suggested.length > 0 && (
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
  }

  return <div>Loading... Please wait</div>;
};
