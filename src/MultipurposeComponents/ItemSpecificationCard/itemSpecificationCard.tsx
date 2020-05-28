import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb/breadCrumb';
import './itemSpecificationCard.scss';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { DFS } from '../../Additional/additional_api';

export const ItemSpecificationCard = () => {
  const [gadgets, setGadgets] = useState([]);
  const dataFromServer = useContext(DFS);

  useEffect(() => {
    dataFromServer.then(data => setGadgets(data));
  }, [dataFromServer]);

  // let rootUrl = '/';

  return (
    <div className="Item">
      <BreadCrumb page="CHANGE ME WHEN U KNOW!" />
      <h1 className="Item__title">Here name of the phones go!</h1>
      <div className="Item__specs_upper ISU">
        <div className="ISU__photos" />
        <div className="ISU__specification" />
      </div>
      <div className="Item__specs_lower ISL">
        <div className="ISL__about" />
        <div className="ISL__technical">
          <Link to="/phones/link">dafdaf</Link>
        </div>
      </div>
      <ProductSlider title="You may also like" phones={gadgets} />
    </div>
  );
};
