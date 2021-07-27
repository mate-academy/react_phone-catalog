import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddToCartButton from "../../components/AddToCartButton";
import { getHotPriceProducts, getProductById, getProductDetails } from "../../components/api";
import { BackButton } from "../../components/BackButton";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import LikeButton from "../../components/LikeButton";
import { ProductSlider } from "../../components/PorductSlider";
import { ProductsImgList } from '../../components/ProductsImgList'
import './ProductDetailsPage.scss'

import { Card } from "../../interfaces/Card";

export interface Props {
  id: string;
}

interface Details {
  additionalFeatures: string, 
  android: {
      os: string;
      ui: string
  };
  availability: string[];
  battery: {
      standbyTime: string;
      talkTime: string;
      type: string
  };
  camera: {
      features: string[], 
      primary: string
  };
  connectivity: {
      bluetooth: string;
      cell: string;
      gps: boolean;
      infrared: boolean;
      wifi: string
  }; 
  description: string;
  display: {
      screenResolution: string;
      screenSize: string;
      touchScreen: boolean;
  };
  hardware: {
      accelerometer: boolean, 
      audioJack: string, 
      cpu: string, 
      fmRadio: boolean, 
      physicalKeyboard: boolean, 
      usb: string
  };
  id: string;
  images: string[], 
  name: string, 
  sizeAndWeight: {
      dimensions: string[];
      weight: string
  };
  storage: {
      flash: string; 
      ram: string
  }
}


export const ProductDetailsPage: React.FC<Props> = ({
  id,
}) => {
  const [ProductDetails, setProductDetails] = useState<Details>({} as Details);
  const [ProductPrice, setProductPrice] = useState<number>(0);
  const [suggestedProducts, setSuggestedProducts] = useState<Card[]>([] as Card[])
  const history = useHistory()

  useEffect(() => {
    console.log(history)
    getHotPriceProducts().then((response: Card[]) => setSuggestedProducts(response.filter((product) => id !== product.id)))
    getProductDetails(id).then((response) => setProductDetails(response))
    getProductById(id).then(({price}) => setProductPrice(price))
  }, [id, history])

  return (<div className="Page">
    <Breadcrumbs/>
    <BackButton />
    <h1>{ProductDetails.name}</h1>
    <div className="info-block" >
      <ProductsImgList imgArr={(ProductDetails.images || [])} />
      <div className="actions-block">
        <div className="actions-block_part">
          <h1>${ProductPrice}</h1>
          <div className="is_flex row_gap_8px">
            <AddToCartButton idToAdd={id} isBig/>
            <LikeButton id={id} isBig/>
          </div>
        </div>
        <div className="actions-block_part">
          <div className="small-text tech-specs-block">
            <div className="text_color_gray">Screen</div>
            <div className="tech-specs-block_value">
              {(ProductDetails.display || {}).screenSize}
            </div>

            <div className="text_color_gray">Resolution</div>
            <div className="tech-specs-block_value">
              {(ProductDetails.display || {}).screenResolution}
            </div>

            <div className="text_color_gray">Processor</div>
            <div className="tech-specs-block_value">
              {(ProductDetails.hardware || {}).cpu}
            </div>

            <div className="text_color_gray">RAM</div>
            <div className="tech-specs-block_value">
              {(ProductDetails.storage || {}).ram}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="details-block">
      <div className="details-block_column">
        <h1>About</h1>
        <div className="hr" />
        <p className="body-text text_color_gray">{ProductDetails.description}</p>
      </div>
      <div className="details-block_column">
        <h1>Tech specs</h1>
        <div className="hr" />
        <div className="body-text tech-specs-block">
          <div className="text_color_gray">Screen</div>
          <div className="tech-specs-block_value">
            {(ProductDetails.display || {}).screenSize}
          </div>

          <div className="text_color_gray">Resolution</div>
          <div className="tech-specs-block_value">
            {(ProductDetails.display || {}).screenResolution}
          </div>

          <div className="text_color_gray">Processor</div>
          <div className="tech-specs-block_value">
            {(ProductDetails.hardware || {}).cpu}
          </div>

          <div className="text_color_gray">RAM</div>
          <div className="tech-specs-block_value">
            {(ProductDetails.storage || {}).ram}
          </div>

          <div className="text_color_gray">Built in memory</div>
          <div className="tech-specs-block_value">
            {(ProductDetails.storage || {}).flash}
          </div>

          <div className="text_color_gray">Camera</div>
          <div className="tech-specs-block_value">
            {(ProductDetails.camera || {}).primary}
          </div>

          <div className="text_color_gray">Zoom</div>
          <div className="tech-specs-block_value">
            {(ProductDetails.connectivity || {}).cell}
          </div>
        </div>
      </div>
    </div>
    <ProductSlider title="You may also like"products={suggestedProducts}/>
  </div>
)
}
