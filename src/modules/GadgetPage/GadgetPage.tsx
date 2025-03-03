import React from 'react';
import { Footer } from '../HomePage/components/Footer';
import { Header } from '../HomePage/components/Header';
import { Gadget } from '../shared/types/Gadget';
import { GadgetsCollection } from './GadgetsCollection';

type Props = {
  gadgets: Gadget[];
};

export const GadgetPage: React.FC<Props> = ({ gadgets }) => {
  return (
    <>
      <Header />
      <GadgetsCollection gadgets={gadgets} />
      <Footer />
    </>
  );
};
