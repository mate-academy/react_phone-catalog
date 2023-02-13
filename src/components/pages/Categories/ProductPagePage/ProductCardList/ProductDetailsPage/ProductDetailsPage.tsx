import './ProductDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { Button } from '../../../../../../common/Button/Button';
import {
  NavigationButtons,
} from '../../../../../../common/NavigationButtons/NavigationButtons';
import { ProductDescPage } from './ProductDescPage/ProductDescPage';
import {
  DetailedProductContext,
} from '../../../../../../context/DetailedProductContext';

export const ProductDetailsPage: React.FC<any> = (
  { products },
) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    detailedProduct,
    setDetailedProduct,
  } = useContext<any>(DetailedProductContext);
  const [product, setProduct] = useState();
  let category = '';

  const getProduct = async () => {
    const singleProduct = products.find((one: any) => {
      return (one.id === id);
    });

    const response = await fetch(
      `/new/products/${singleProduct.itemId}.json`,
      {
        method: 'GET',
      },
    );

    if (response.status === 200) {
      const result = await response.json();

      return setDetailedProduct(result);
    }

    category = singleProduct.category;

    return setProduct(singleProduct);
  };

  useEffect(() => {
    if (products) {
      getProduct();
    }
  }, [products]);

  return (
    <div className="details__page">
      <NavigationButtons id={id} title={category} />
      <div className="back-button body12">
        <Button
          className="no-border"
          image="icons/Chevron (Arrow Left).svg"
          alt="<"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div
          className="back-button__text"
          onClick={() => {
            navigate(-1);
          }}
          aria-hidden
        >
          Back
        </div>
      </div>
      { id && id <= products.length
        ? detailedProduct && (
          <ProductDescPage
            products={products}
            singleProduct={product}
          />
        )
        : <h1>No product found</h1>}
    </div>
  );
};
