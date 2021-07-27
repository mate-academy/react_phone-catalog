import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import { useRef } from "react";
import { ProductsList } from "../ProductsList";
import "./ProductSlider.scss"

interface Props {
  products: any[];
  title?: string;
}

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const slider = useRef<HTMLDivElement>(null);

  const list: HTMLDivElement = slider.current
    ? [...slider.current.childNodes as any].find(
        (child) => child.className.includes('products-list')
      )
    : ''

  const [scrollState, setScrollState] = useState(0);

  return(
    <div className="product-slider" ref={slider}>
      <div className="is_flex items_centered">
        <h1 >{ title }</h1>
        <div className="row_gap_10px">
          <button
            disabled={scrollState <= 0}
            onClick={() => {
              let newScroll = list.scrollLeft - (slider.current?.clientWidth as number + 16)
            
              list.scrollTo({
                left: newScroll,
                behavior: "smooth"
              });

              setScrollState(newScroll);
            }}
            className="square-button"
            >
            <i className="arrow_direction_left arrow_color_black"/>
          </button>
          <button
            disabled={scrollState >= list.scrollWidth - list.clientWidth}
            onClick={() => {
              let newScroll = list.scrollLeft + (slider.current?.clientWidth as number + 16)

              list.scrollTo({
                left: newScroll,
                behavior: "smooth"
              });
              setScrollState(newScroll);
            }}

            className="square-button"
          >
            <i className="arrow_direction_right arrow_color_black"/>
          </button>
        </div>
      </div>
      <ProductsList cardsArr={products} oneRow/>
    </div>
  )
}
