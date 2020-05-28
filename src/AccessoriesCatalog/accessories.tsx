import React, { useContext, useEffect, useState } from 'react';
import { DFS } from '../Additional/additional_api';
import { PageCreator } from '../MultipurposeComponents/PageCreator/pageCreator';
import { EmptyPage } from '../MultipurposeComponents/EmptyPage/emptyPage';

export const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const dataFromServer = useContext(DFS);

  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { type: string }) => el.type === 'accessorie'))
      .then(data => setAccessories(data));
  }, [dataFromServer]);

  return (
    <>
      {accessories.length !== 0
        ? (
          <PageCreator
            pageName="Accessories"
            gadgets={accessories}

          />
        )
        : (

          <>
            <EmptyPage pageName="Accessories" />
          </>
        )}
    </>
  );
};
