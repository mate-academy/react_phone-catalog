import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useAppSelector} from "../../../../app/hooks";

import classNames from "classnames";

import {colorExtractor} from "../../../../services/colorExtractor";
import {imagesExtractor} from "../../../../services/imagesExtractor";

export const Gallery: React.FC = () => {
  const [mainImg, setMainImg] = useState("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const {productId} = useParams();

  const selectedProduct = useAppSelector(
    state => state.selectedProduct.selectedProduct,
  );

  const {images} = selectedProduct || {};

  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (selectedProduct && images && productId) {
      const color = colorExtractor(productId);

      const localImages = imagesExtractor(color, images);

      if (!!localImages.length) {
        setMainImg(localImages[0]);
        setThumbnails(localImages.slice(1));
      }
    }
  }, [selectedProduct, productId]);

  const handleThumbnailClick = (img: string) => {
    setFade(true);

    setTimeout(() => {
      setThumbnails(prevImg =>
        prevImg.map(prev => (prev === img ? mainImg : prev)),
      );

      setMainImg(img);

      setFade(false);
    }, 500);
  };

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img
          className={classNames("gallery__main__img", {
            "fade-out": fade,
          })}
          src={mainImg}
          alt=""
        />
      </div>

      <div className="gallery__thumbnail">
        {thumbnails.map((src, index) => (
          <img
            className="gallery__thumbnail__img"
            src={src}
            alt={`thumbnail-${index}`}
            key={index}
            onClick={() => handleThumbnailClick(src)}
          />
        ))}
      </div>
    </div>
  );
};
