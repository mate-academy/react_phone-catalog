import { CSSProperties } from 'react';
import { MoonLoader } from 'react-spinners';

export const Loader: React.FC = () => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    padding: '100 100',
  };

  return (
    <div className="loader">
      <MoonLoader
        color="#313237"
        cssOverride={override}
        size={80}
      />
    </div>
  );
};
