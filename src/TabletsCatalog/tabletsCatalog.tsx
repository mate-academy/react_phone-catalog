import React, { useContext, useEffect, useState } from 'react';
import { DFS } from '../Additional/additional_api';
import { PageCreator } from '../MultipurposeComponents/PageCreator/pageCreator';
import { EmptyPage } from '../MultipurposeComponents/EmptyPage/emptyPage';

export const TabletsCatalog = () => {
  const [tablets, setTablets] = useState([]);
  const dataFromServer = useContext(DFS);


  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { type: string }) => el.type === 'tablet'))
      .then(data => setTablets(data));
  }, [dataFromServer]);


  return (
    <>
      {tablets.length !== 0
        ? (
          <PageCreator
            pageName="Tablets"
            gadgets={tablets}

          />
        )
        : (
          <EmptyPage pageName="Tablets" />
        )}
    </>
  );
};
