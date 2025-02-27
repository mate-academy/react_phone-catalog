import { CSSProperties } from 'react';
import { GridLoader } from 'react-spinners';
import './Loader.scss';

const override: CSSProperties = {
  margin: 'auto',
  display: 'block',
  marginTop: '80px',
};

export const Loader = () => (
  <div className="loader">
    <GridLoader color="#4219D0" size={50} cssOverride={override} />
  </div>
);
