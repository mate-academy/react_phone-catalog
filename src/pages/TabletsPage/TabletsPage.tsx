import { OopsBanner } from '../../components/OopsBanner';
import './style.scss';

export const TabletsPage = () => {
  return (
    <div className="tablets">
      <h1>
        Tablets
      </h1>

      <div className="tablets__banner">
        <OopsBanner />
      </div>
    </div>
  );
};
