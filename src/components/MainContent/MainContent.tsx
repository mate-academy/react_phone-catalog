import { Category } from '../Category';
import { HotPrice } from '../HotPrice';
import { NewModels } from '../NewModels';

import './MainContent.scss';

export const MainContent = () => {
  return (
    <div className="main-content">
      <NewModels />
      <Category />
      <HotPrice />
    </div>
  );
};
