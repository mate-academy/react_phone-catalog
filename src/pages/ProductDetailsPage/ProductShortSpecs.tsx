import React from 'react'

export const ProductShortSpecs = ({
  display,
  storage,
  battery,
}: ProductDetails) => {
  return (
    <div className="product__specs">
      <div className="product__spec">
        <span className="product__spec-title">Screen</span>
        <span className="product__spec-info">
          {display.screenSize}
        </span>
      </div>
      <div className="product__spec">
        <span className="product__spec-title">Resolution</span>
        <span className="product__spec-info">
          {display.screenResolution}
        </span>
      </div>
      <div className="product__spec">
        <span className="product__spec-title">Battery</span>
        <span className="product__spec-info">
          {battery.type}
        </span>
      </div>
      <div className="product__spec">
        <span className="product__spec-title">RAM</span>
        <span className="product__spec-info">
          {storage.ram || '1000 MB'}
        </span>
      </div>
    </div>
  )
}
