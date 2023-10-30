import React from 'react';
import { ProductInfo } from '../../types/ProductInfo';
import './SpecsDetails.scss';
import '../AddtoCardDetails/AddtoCardDetails.scss';

type Props = {
  productDescription: ProductInfo;
};

export const SpecsDetails: React.FC<Props> = ({ productDescription }) => {
  return (
    <div className="SpecsDetails">
      <h1 className="SpecsDetails__title">Tech specs</h1>
      <div className="SpecsDetails__wrapper">
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey Regular">Screen</h2>
          <h2 className="AddtoCardDetails__specsValue Regular">
            {productDescription.display.screenSize}
          </h2>
        </div>
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey Regular">Resolution</h2>
          <h2 className="AddtoCardDetails__specsValue Regular">
            {productDescription.display.screenResolution}
          </h2>
        </div>
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey Regular">Processor</h2>
          <h2 className="AddtoCardDetails__specsValue Regular">
            {productDescription.hardware.cpu}
          </h2>
        </div>
        {
          productDescription.storage.ram && (
            <div className="AddtoCardDetails__specsUnit">
              <h2 className="AddtoCardDetails__specsKey Regular">RAM</h2>
              <h2 className="AddtoCardDetails__specsValue Regular">
                {productDescription.storage.ram}
              </h2>
            </div>
          )
        }
        {
          productDescription.storage.flash && (
            <div className="AddtoCardDetails__specsUnit">
              <h2 className="AddtoCardDetails__specsKey Regular">
                Built in memory
              </h2>
              <h2 className="AddtoCardDetails__specsValue Regular">
                {productDescription.storage.flash}
              </h2>
            </div>
          )
        }
        {
          productDescription.camera.primary && (
            <div className="AddtoCardDetails__specsUnit">
              <h2 className="AddtoCardDetails__specsKey Regular">Camera</h2>
              <h2 className="AddtoCardDetails__specsValue Regular">
                {productDescription.camera.primary}
              </h2>
            </div>
          )
        }
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey Regular">battery</h2>
          <h2 className="AddtoCardDetails__specsValue Regular">
            {productDescription.battery.type}
          </h2>
        </div>
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey Regular">Bloutooth</h2>
          <h2 className="AddtoCardDetails__specsValue Regular">
            {productDescription.connectivity.bluetooth}
          </h2>
        </div>
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey Regular">Cell</h2>
          <h2 className="AddtoCardDetails__specsValue Regular">
            {productDescription.connectivity.cell}
          </h2>
        </div>
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey Regular">Weight</h2>
          <h2 className="AddtoCardDetails__specsValue Regular">
            {productDescription.sizeAndWeight.weight}
          </h2>
        </div>
      </div>
    </div>
  );
};
