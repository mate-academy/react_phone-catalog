import React, { useContext, useEffect, useState } from 'react';
import { DFS } from '../Additional/additional_api';
import './phonesCatalog.scss';
import { PageCreator } from '../MultipurposeComponents/PageCreator/pageCreator';
import { EmptyPage } from '../MultipurposeComponents/EmptyPage/emptyPage';

export const PhonesCatalog = () => {
  const [phones, setPhones] = useState([]);

  const dataFromServer = useContext(DFS);


  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { type: string }) => el.type === 'phone'))
      .then(data => setPhones(data));
  }, [dataFromServer]);


  return (
    <>
      {phones.length !== 0
        ? (
          <PageCreator
            pageName="Phones"
            gadgets={phones}
            route="/phones/"
          />
        )
        : (
          <EmptyPage pageName="Phones" />
        )}
    </>
  );
};
