import React from 'react'

export const ProductTechSpecs = ({
  display,
  hardware,
  storage,
  android,
  battery,
  sizeAndWeight,
  shortened,
 }: ProductTechSpecs) => {
  return (
    <>
    {shortened ? (
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
    ) : (
      <div className="product__specs product__specs--text-md">
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
          <span className="product__spec-title">Processor</span>
          <span className="product__spec-info">
            {hardware.cpu}
          </span>
        </div>
        <div className="product__spec">
          <span className="product__spec-title">Storage</span>
          <span className="product__spec-info">
            {storage.flash || '32000MB'}
          </span>
        </div>
        <div className="product__spec">
          <span className="product__spec-title">RAM</span>
          <span className="product__spec-info">
            {storage.ram || '1000 MB'}
          </span>
        </div>
        <div className="product__spec">
          <span className="product__spec-title">OS</span>
          <span className="product__spec-info">
            {android.os}
          </span>
        </div>
        <div className="product__spec">
          <span className="product__spec-title">Battery</span>
          <span className="product__spec-info">
            {battery.type}
          </span>
        </div>
        <div className="product__spec">
          <span className="product__spec-title">Weight</span>
          <span className="product__spec-info">
            {sizeAndWeight.weight}
          </span>
        </div>
      </div>
    )}
    </>
  )
}
