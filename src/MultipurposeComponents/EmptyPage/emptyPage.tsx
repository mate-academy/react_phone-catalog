import React, { FC } from 'react';
import './emptyPage.scss';
import { BreadCrumb } from '../BreadCrumb/breadCrumb';

type Params = {
  pageName: string;
};

export const EmptyPage: FC<Params> = ({
  pageName,
}) => {
  return (
    <div className="EmptyPage">
      <BreadCrumb page={pageName} />
      <div className="bike">
        <div className="bike__header">
          <p className="bike__header_slim">
            Unfortunately, we have no
            {pageName}
            {' '}
            yet
          </p>
          <p>But our courier is already on its way!</p>
        </div>
        <div className="bike__cloud-1" />
        <div className="bike__cloud-2" />
        <div className="bike__cloud-3" />
        <div className="bike__bike">
          <div className="bike__wheel">
            <div className="bike__needle" />
            <div className="bike__needle" />
            <div className="bike__needle" />
          </div>
          <div className="bike__wheel">
            <div className="bike__needle" />
            <div className="bike__needle" />
            <div className="bike__needle" />
          </div>
          <div className="bike__down-tube" />
          <div className="bike__tubes">
            <div className="bike__chain" />
            <div className="bike__seat-stays" />
            <div className="bike__chain-stays" />
            <div className="bike__seat-tube" />
            <div className="bike__star">
              <div className="bike__pedal" />
            </div>
            <div className="bike__seat" />
          </div>
          <div className="bike__top-tube" />
          <div className="bike__fo" />
          <div className="bike__head-tube" />
          <div className="bike__helm" />
          <div className="bike__lock" />
        </div>
        <div className="bike__man">
          <div className="bike__arm">
            <div className="bike__forearm">
              <div className="bike__hand" />
            </div>
            <div className="bike__sleeve" />
          </div>
          <div className="bike__back-leg">
            <div className="bike__shin">
              <div className="bike__skin" />
              <div className="bike__ked" />
            </div>
          </div>
          <div className="bike__butt" />
          <div className="bike__front-leg">
            <div className="bike__shin">
              <div className="bike__skin" />
              <div className="bike__ked" />
            </div>
          </div>
          <div className="bike__shirt">
            <div className="bike__collar" />
          </div>
          <div className="bike__arm">
            <div className="bike__forearm">
              <div className="bike__hand" />
            </div>
            <div className="bike__sleeve" />
          </div>
          <div className="bike__head">
            <div className="bike__eye" />
            <div className="bike__eye" />
            <div className="bike__whisker" />
            <div className="bike__nose" />
            <div className="bike__month" />
            <div className="bike__whisker" />
            <div className="bike__cap">
              <div className="bike__peak">
                <div className="bike__peak-parts" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};
