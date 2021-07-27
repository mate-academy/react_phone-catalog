import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import './PictureSlider.scss'
import debounce from 'lodash/debounce';
import { useEffect } from "react";

const classNames = require('classnames')

interface Props {
  imgArr: string[];
}

export const PictureSlider: React.FC<Props> = ({imgArr}) => {
  const [selectedImgId, selectImg] = useState(0)

  const nextPicture = () => {
    if(selectedImgId === imgArr.length - 1) {
      selectImg(0);
      return;
    }
    selectImg(selectedImgId + 1);
  }
  const nextPictureWithDebounce = useCallback(debounce(nextPicture, 5000), [selectedImgId])

  const prevPicture = useCallback(() => {
    if(selectedImgId === 0) {
      selectImg(imgArr.length - 1);
      return;
    }
    selectImg(selectedImgId - 1);
  }, [selectedImgId, imgArr.length]);

  useEffect(() => {
    nextPictureWithDebounce()

    return nextPictureWithDebounce.cancel
  }, [selectedImgId, nextPictureWithDebounce])


  return (
    <div className="picture-slider-container">
      <div className="picture-slider">
        <button
          className="picture-slider__scroll-button"
          onClick={prevPicture}
        >
          <i className="arrow_direction_left arrow_color_black"/>
        </button>
        <img
          alt=""
          className="picture-slider__picture"
          src={`${imgArr[selectedImgId]}`}
        />
        <button
          className="picture-slider__scroll-button"
          onClick={nextPicture}
        >
          <i className="arrow_direction_right arrow_color_black"/>
        </button>
      </div>
      <div className="scroll-state">
        {imgArr.map((img) => (
          <div
            onClick={() => selectImg(imgArr.indexOf(img))}
            className={classNames([
              {'is_active': imgArr.indexOf(img) === selectedImgId}
            ])}
          />
        ))}
      </div>
    </div>
  )
}