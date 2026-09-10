import React from 'react';

export const TechBlock = ({ selectedProduct }) => {
  return (
    <>
      <p className="text-h3 about-title">Tech specs</p>
      <div className="details-info__configurate-line"></div>
      <div className="details-info__tech-xaps"></div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">
          Screen
        </div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.screen}
        </div>
      </div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">
          Resolution
        </div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.resolution}
        </div>
      </div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">
          Processor
        </div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.processor}
        </div>
      </div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">RAM</div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.ram}
        </div>
      </div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">
          Built in memory
        </div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.capacityAvailable}
        </div>
      </div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">
          Camera
        </div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.camera}
        </div>
      </div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">Zoom</div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.zoom}
        </div>
      </div>

      <div className="details-info__tech-xap">
        <div className="text-body secondary details-info__tech-xap-x">Cell</div>
        <div className="text-body  details-info__tech-xap-v">
          {selectedProduct?.cell}
        </div>
      </div>
    </>
  );
};
