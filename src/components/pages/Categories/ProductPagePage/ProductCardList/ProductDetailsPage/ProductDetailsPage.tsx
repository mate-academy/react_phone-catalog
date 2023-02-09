import './ProductDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../../../../../../common/Button/Button';
import {
  NavigationButtons,
} from '../../../../../../common/NavigationButtons/NavigationButtons';
import { ProductDescPage } from './ProductDescPage/ProductDescPage';

export const ProductDetailsPage: React.FC<any> = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  const getProduct = async () => {
    const singleProduct = products.find((one: any) => {
      return (one.id === id);
    });

    try {
      const response = await fetch(
        `/_new/products/${singleProduct.itemId}.json`,
        {
          method: 'GET',
        },
      );

      // console.log(response.json());
      if (response.status === 200) {
        const result = await response.json();

        return setProduct(result);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  // let res = getProduct()

  useEffect(() => {
    if (products) {
      getProduct();
    }
  }, [products]);

  return (
    <div className="details__page">
      <NavigationButtons product={product} id={id} />
      <div className="back-button body12">
        <Button
          className="no-border"
          image="/icons/Chevron (Arrow Left).svg"
          alt="<"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="back-button__text">
          Back
        </div>
      </div>
      {
        product && (
          <ProductDescPage
            product={product}
            setProduct={setProduct}
            products={products}
          />
        )
      }
    </div>
  );
};
