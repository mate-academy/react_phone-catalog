import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useAppSelector} from "../../../app/hooks";

import {Breadcrumbs} from "../../Breadcrumbs/Breadcrumbs";
import {Gallery} from "./Gallery/Gallery";
import {ProductInfoCard} from "./ProductInfoCard/ProductInfoCard";
import {AboutProduct} from "./AboutProduct/AboutProduct";
import {colorExtractor} from "../../../services/colorExtractor";
import {capacityExtractor} from "../../../services/capacityExtractor";
import {useMediaQuery} from "react-responsive";
import {Banner} from "../Home/Banner/Banner";
import {imagesExtractor} from "../../../services/imagesExtractor";

export const ProductDetails: React.FC = () => {
  const [productPictures, setProductPictures] = useState<string[]>([]);
  const {productId} = useParams();

  const color = colorExtractor(productId || "")
    .charAt(0)
    .toUpperCase()
    .concat(colorExtractor(productId || "").slice(1));

  const capacity = capacityExtractor(productId || "");

  const currentProduct = useAppSelector(
    state => state.selectedProduct.selectedProduct,
  );

  const {name, images} = currentProduct || {};

  useEffect(() => {
    if (currentProduct && productId && images) {
      const localColor = colorExtractor(productId);
      const localImages = imagesExtractor(localColor, images);

      setProductPictures(localImages);
    }
  }, [currentProduct, productId]);

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <section className="product-details">
      <div className="container">
        <Breadcrumbs />

        <h1
          className="
            title
            product-details__title
            title-custom
          "
        >
          {`${name} ${capacity} ${color}`}
        </h1>

        <div className="content__top">
          <div className="content__top__left">
            {isMobile ? <Banner pictures={productPictures} /> : <Gallery />}
          </div>

          <div className="content__top__right">
            <div className="content__top__right__info">
              <ProductInfoCard />
            </div>
          </div>
        </div>

        <div className="content__bottom">
          <AboutProduct />
        </div>
      </div>
    </section>
  );
};
