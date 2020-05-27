
import React, { useState, useEffect, useContext } from 'react';
import { getDetails } from '../../helpers/api';
import { ProductDetails, Product } from '../../interfaces';
import { About } from './About/About';
import { TechSpecs } from './TechSpecs/TechSpecs';
import { CardsSlider } from '../../components/CardsSlider/CardsSlider';
import { Gallery } from './Gallery/Gallery';
import { Card } from './Card/Card';
import { MyContext } from '../../App';
import './ProductPage.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { GoBack } from '../../components/GoBack/GoBack';
import {WaitLoading} from '../../components/WaitLoading/WaitLoading';


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

  const { products } = useContext(MyContext);

  return (
    (JSON.stringify(productDetails) === JSON.stringify({}))
      ? <WaitLoading />
      : <div className="ProductPage">
        <Breadcrumbs />
        <GoBack />
        <h1 className="ProductPage__title">{productDetails.name}</h1>
        <div className="ProductPage__group-wrapper">
          <Gallery
            images={productDetails.images} />
          <Card product={product} productDetails={productDetails}/>
          <About description={description} />
          <TechSpecs product={product} productDetails={productDetails} />
        </div>
        <div className="ProductPage__group-wrapper">

        </div>


        <CardsSlider products={products} title={'You may also like'} />
      </div>
  )
}
