import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/products';
import { ProductSpecs } from '../../types/ProductSpecs';
import { BreadCrumb } from '../Breadcrumb';
import { CapacityButton } from './ProductParts/CapacityButton';
import { CartAndFavButtons } from './ProductParts/CartAndFavButtons';
import { ColorsPart } from './ProductParts/ColorsPart';
import { ImagePart } from './ProductParts/ImagePart';
import { MainSpecs } from './ProductParts/MainSpecs';
import { PricePart } from './ProductParts/PricePart';
import { ReturnButton } from './ProductParts/ReturnButton';
import { TechSpecs } from './ProductParts/TechSpecs';

export const ProductDetails: React.FC = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<ProductSpecs>();
  const [imageSelector, setImageSelector] = useState(0);

  const fetchProduct = async () => {
    const res = await getProduct(productId);

    setProduct(res);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <>
      <section className="section">
        <div className="container">
          <BreadCrumb />
          <ReturnButton />
          <h1 className="title">{product?.name}</h1>
          <div className="columns is-variable is-6 mb-6">
            <ImagePart
              product={product}
              imageSelector={imageSelector}
              setImageSelector={setImageSelector}
            />
            <div className="column">
              <div className="columns is-mobile">
                <div className="column is-two-thirds">
                  <ColorsPart />
                  <hr />
                  <CapacityButton product={product} />
                  <hr />
                  <PricePart />
                  <CartAndFavButtons />
                  <MainSpecs product={product} />
                </div>
                <div className="column">
                  <p className="has-text-grey-light is-size-7 is-pulled-right">
                    ID: 802390
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-variable is-6">
            <div className="column is-half">
              <h3 className="title is-3">About</h3>
              <hr />
              <p
                className="has-text-grey-light is-size-7"
              >
                {product?.description}
              </p>
            </div>
            <TechSpecs product={product} />
          </div>
        </div>
      </section>
    </>
  );
};
