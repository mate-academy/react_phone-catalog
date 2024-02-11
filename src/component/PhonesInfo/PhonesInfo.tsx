import { useContext } from 'react';
import './PhonesInfo.scss';
import { ProductContext } from '../../ProductContext';

export const PhonesInfo = () => {
  const { phones } = useContext(ProductContext);

  return (
    <div className="phones">
      <div className="container">
        <div className="phones__url">
          <img src="./icon/Home.svg" alt="" className="phones__url__home" />

          <img src="./icon/Right.svg" alt="" className="phones__url__right" />

          <div className="phones__url__title"> Phones </div>
        </div>

        <h1 className="phones__title"> Mobile phones </h1>

        <p className="phones__subtitle">
          {`${phones.length} models`}
        </p>
      </div>
    </div>
  );
};
