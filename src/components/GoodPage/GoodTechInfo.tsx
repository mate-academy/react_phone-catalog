import React from 'react';

interface Props {
  goodInfo: Good | undefined;
  goodDetail: GoodDetail;
}

export const GoodTechInfo: React.FC<Props> = ({ goodInfo, goodDetail }) => (
  <ul className="GoodPage__InfoList">
    <li className="GoodPage__InfoItem">
      <p className="GoodPage__InfoTitle">
        Screen
      </p>
      <p className="GoodPage__InfoFeature">
        {goodInfo && (goodInfo.screen || 'No info')}
      </p>
    </li>
    <li className="GoodPage__InfoItem">
      <p className="GoodPage__InfoTitle">
        Resolution
      </p>
      <p className="GoodPage__InfoFeature">
        {goodDetail && (goodDetail.display.screenResolution || 'No info')}
      </p>
    </li>
    <li className="GoodPage__InfoItem">
      <p className="GoodPage__InfoTitle">
        Processor
      </p>
      <p className="GoodPage__InfoFeature">
        {goodDetail && (goodDetail.hardware.cpu || 'No info')}
      </p>
    </li>
    <li className="GoodPage__InfoItem">
      <p className="GoodPage__InfoTitle">
        RAM
      </p>
      <p className="GoodPage__InfoFeature">
        {goodInfo && (goodInfo.ram || 'No info')}
      </p>
    </li>
  </ul>
);
