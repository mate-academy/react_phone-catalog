import React, { FC } from 'react';
import './_PhoneDetailsPage.scss';
import { RouteComponentProps } from 'react-router';
import { PhoneDetais } from '../PhoneDetais/PhoneDetais';

interface MatchParams {
  phoneId: string;
}

type PhoneDetaisPageT = RouteComponentProps<MatchParams>;

export const PhoneDetaisPage: FC<PhoneDetaisPageT> = ({ match }) => {
  return (
    <main className="main">
      <div className="phoneDetaisPage">
        <div className="phoneDetailsPage__wrapper">
          <PhoneDetais data={match.params.phoneId} />
        </div>
      </div>
    </main>
  );
};
