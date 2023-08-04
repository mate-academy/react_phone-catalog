import { Oval } from 'react-loader-spinner';
import './Loader.scss';

export const Loader = () => {
  return (
    <div className="loader__container">
      <Oval
        ariaLabel="loading-indicator"
        height={200}
        width={200}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="#89939A"
        secondaryColor="#E2E6E9"
      />
    </div>
  );
};
