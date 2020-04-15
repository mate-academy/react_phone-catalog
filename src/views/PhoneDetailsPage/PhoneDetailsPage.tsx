import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PhoneDetailsMain } from '../../components/PhoneDetailsMain';

type TParams = {
  phoneId: string;
}

type Props = RouteComponentProps<TParams>;

export const PhoneDetailsPage: FC<Props> = ({ match }) => (
  <>
    <Header />
    <main className="main">
      <PhoneDetailsMain phoneId={match.params.phoneId} />
    </main>
    <Footer />
  </>
);
