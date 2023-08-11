import { OopsBanner } from '../../components/OopsBanner';
import './style.scss';

export const AccessoriesPage = () => {
  return (
    <div className="accessories">
      <h1>
        Accessories
      </h1>

      <div className="accessories__banner">
        <OopsBanner />
      </div>
    </div>
  );
};
