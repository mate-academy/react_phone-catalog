import React from 'react';

import { AllItemsList } from '../../components/AllItemsList';

export const MobilePhonesPage: React.FC = () => {
  return (
    <>
      <h1>Mobile phones</h1>
      <AllItemsList path="../../../public/api/phones.json" />
    </>
  );
};
