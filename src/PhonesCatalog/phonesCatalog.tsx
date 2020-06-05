import React, { useContext, useEffect, useState } from 'react';
import { ServerData } from '../Additional/additional_api';
import './phonesCatalog.scss';
import { PageCreator } from '../MultipurposeComponents/PageCreator/pageCreator';
import { EmptyPage } from '../MultipurposeComponents/EmptyPage/emptyPage';

export const PhonesCatalog = () => {
  const [phones, setPhones] = useState([]);

  const dataFromServer = useContext(ServerData);


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
          />
        )
        : (
          <EmptyPage pageName="Phones" />
        )}
    </>
  );
};
