import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PhoneDetails } from './PhoneDetails';

type TParams = { phoneId: string };

export const PhoneDetailsPage:
FC<RouteComponentProps<TParams>> = ({ match }) => (
  <div className="details-page">
    <PhoneDetails id={match.params.phoneId} />
  </div>
);
