import React from 'react';
import { Button } from '../../components/common/Button/Button';

type GoodDetailsProps = {
  goodData: Good,
  colors: string[],
}


export const GoodDetails: React.FC<GoodDetailsProps> = ({ goodData, colors }) => {
  return (
    <section className="details">
      <div className="details-container">
        <div className="details__card">

          <span className="details__colors-title">
            Available colors
          </span>
          <div className="details__colors">
            <ul className="details__colors-list">
              {colors.map(color => (
                <li className="details__color-item">
                  <span
                      className="details__color"
                      style={{backgroundColor: color}}>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <span className="details__capacity-title">
            Select capacity
          </span>
          <div className="details__capacity">
            <ul className="details__capacity-list">
                <li className="details__capacity-item">
                  <span className="details__capacity-span">
                    {goodData.capacity}
                  </span>
                </li>
              </ul>
          </div>


          <div className="details__price-container">
            <span className="details__price">
              {"$" + goodData.price}
            </span>
          </div>

          <div className="details__btn-container btn">
            <Button classCSS={"btn__add-to-cart--primary"} title={'Add to cart'}  good={goodData} />
            <Button classCSS={"btn__add-to-fav--primary"} title={''}  good={goodData} />
          </div>

          <div className="details__feature">
            <span className="details__feature-title">
              Screen
            </span>
            <span className="details__feature-value">
              {goodData.screen}
            </span>
          </div>
          <div className="details__feature">
            <span className="details__feature-title">
              Capacity
            </span>
            <span className="details__feature-value">
              {goodData.capacity}
            </span>
          </div >
          <div className="details__feature">
            <span className="details__feature-title">
              RAM
            </span>
            <span className="details__feature-value">
              {goodData.ram}
            </span>
          </div>
        </div>

        <div className="details__product-id">
          <span className="details__product-id--current">
            ID:
            {' '}
            {goodData.id.toUpperCase()}
          </span>
        </div>
      </div>
    </section>
  )
}
