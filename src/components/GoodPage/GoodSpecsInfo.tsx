import React from 'react';

interface Props {
  goodInfo: Good | undefined;
  goodDetail: GoodDetail;
}

export const GoodSpecsInfo: React.FC<Props> = ({ goodInfo, goodDetail }) => (
  <ul className="GoodPage__SpecsList">
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        Screen
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodInfo && (goodInfo.screen || 'No info')}
      </p>
    </li>
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        Resolution
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodDetail && (goodDetail.display.screenResolution || 'No info')}
      </p>
    </li>
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        Processor
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodDetail && (goodDetail.hardware.cpu || 'No info')}
      </p>
    </li>
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        RAM
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodInfo && (goodInfo.ram || 'No info')}
      </p>
    </li>
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        Built in memory
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodInfo && (goodInfo.capacity || 'No info')}
      </p>
    </li>
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        Camera
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodDetail && (goodDetail.camera.primary || 'No info')}
      </p>
    </li>
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        Zoom
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodDetail && (goodDetail.camera.zoom || 'No info')}
      </p>
    </li>
    <li className="GoodPage__SpecsItem">
      <p className="GoodPage__SpecsTitle">
        Cell
      </p>
      <p className="GoodPage__SpecsFeature">
        {goodDetail && (goodDetail.connectivity.cell || 'No info')}
      </p>
    </li>
  </ul>
);
