import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails';
import { Main } from '../../components/Main/Main';

type TParams = {
  phoneId: string;
}

type Props = RouteComponentProps<TParams>;

export const PhoneDetailsPage: FC<Props> = ({ match }) => (
  <>
    <Header />
    <Main>
      <PhoneDetails phoneId={match.params.phoneId} />
    </Main>
    <Footer />
  </>
);
