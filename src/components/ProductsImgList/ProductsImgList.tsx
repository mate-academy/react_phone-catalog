import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import './ProductsImgList.scss';

interface Props {
  imgArr: string[]
}

const classNames = require('classnames')

export const ProductsImgList: React.FC<Props> = ({imgArr}) => {
  const [selectedImgId, selectImg] = useState(0)

  useEffect(() => {
    selectImg(0)
  }, [imgArr])

  return (
    <div className="product-img-list-container">
      <div className="list__scroll-state">
        {imgArr.map((img) => {
          const imgIndex = imgArr.indexOf(img)
          return (
            <div
              key={img}
              onMouseOver={() => selectImg(imgIndex)}
              className={classNames([
                "croll-state__miniature",
                {"scroll-state__miniature_active": selectedImgId === imgIndex}
              ])}
            >
              <img alt="" src={imgArr[imgIndex]} className="miniature__img"/>
            </div>
          )
        })}
      </div>
      <div className="product-img-list">
        <img alt="" className="list__picture" src={`${imgArr[selectedImgId]}`}/>
      </div>
    </div>
  )
}
