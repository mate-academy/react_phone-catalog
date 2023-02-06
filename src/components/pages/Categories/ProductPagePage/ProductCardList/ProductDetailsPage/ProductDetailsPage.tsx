import './ProductDetailsPage.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProductDescPage } from './ProductDescPage/ProductDescPage';
import {
  NavigationButtons,
} from '../../../../../../helpers/NavigationButtons/NavigationButtons';
import { Button } from '../../../../../../helpers/Button/Button';

export const ProductDetailsPage: React.FC<any> = ({ products }) => {
  const { id } = useParams();

  const [product, setProduct] = useState();

  const getProduct = async () => {
    const singleProduct = products.find((one: any) => {
      return (one.id === id);
    });

    console.log(singleProduct)

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
