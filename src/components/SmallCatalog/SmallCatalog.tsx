import React, { FC } from 'react';
import './_SmallCatalog.scss';

interface Props {
  titleName: string;
}

export const SmallCatalog: FC<Props> = (props) => {
  const { titleName } = props;

  return (
    <div className="smCatalog">
      <div className="smCatalog__prices-top">
        <h3 className="smCatalog__title">{titleName}</h3>
        <div className="smCatalog__control-btns">
          <button
            type="button"
            className="smCatalog__price-btn smCatalog__price-btn--left"
          />
          <button
            type="button"
            className="smCatalog__price-btn smCatalog__price-btn--right"
          />
        </div>
      </div>
      <div className="smCatalog__prices-main">
        <div className="temp-block" />
        <div className="temp-block" />
        <div className="temp-block" />
        <div className="temp-block" />
      </div>
    </div>
  );
};
