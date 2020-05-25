
import React, { useState, useEffect, useContext } from 'react';
import { getDetails } from '../../helpers/api';
import { ProductDetails, Product } from '../../interfaces';
import { About } from './About/About';
import { TechSpecs } from './TechSpecs/TechSpecs';
import { CardsSlider } from '../../components/CardsSlider/CardsSlider';
import { Gallery } from './Gallery/Gallery';
import { MyContext } from '../../App';
import './ProductPage.scss';


export const ProductPage = ({ product }: { product: Product }) => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({} as ProductDetails);

  useEffect(
    () => {
      getDetails(product.id)
        .then((productDetails) => {
          setProductDetails(productDetails)
        });
    }, []
  )

  const {
    // additionalFeatures,
    // android,
    // availability,
    // battery,
    // camera,
    // connectivity,
    description,
    // display,
    // hardware,
    // id,
    // images,
    // name,
    // sizeAndWeight,
    // storage
  } = productDetails;

  const {products} = useContext(MyContext);
  return (
 (JSON.stringify(productDetails) === JSON.stringify({}))
      ? <h1>Wait!!!</h1>
      : <div className="ProductPage">
        <h1>{productDetails.name}</h1>
        <div className="ProductPage__group-wrapper">
        <Gallery
        images={productDetails.images}/>

        </div>
        <div className="ProductPage__group-wrapper">
        <About description={description} />
        <TechSpecs product={product} productDetailes={productDetails} />
        </div>


        <CardsSlider products={products} title={'You may also like'} />
      </div>


  )
}
