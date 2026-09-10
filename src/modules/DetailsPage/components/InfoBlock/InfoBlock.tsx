import React from 'react';

export const InfoBlock = ({ selectedProduct }) => {
  return (
    <>
      <div className="info-details">
        <div className="text-small secondary info-details__v">Screen</div>
        <div className="text-small info-details__h">
          {selectedProduct?.screen}
        </div>
      </div>

      <div className="info-details">
        <div className="text-small secondary info-details__v">Resolution</div>
        <div className="text-small info-details__h">
          {selectedProduct?.resolution}
        </div>
      </div>

      <div className="info-details">
        <div className="text-small secondary info-details__v">Processor</div>
        <div className="text-small info-details__h">
          {selectedProduct?.processor}
        </div>
      </div>

      <div className="info-details">
        <div className="text-small secondary info-details__v">RAM</div>
        <div className="text-small info-details__h">{selectedProduct?.ram}</div>
      </div>
    </>
  );
};
