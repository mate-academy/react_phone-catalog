import { BreadCrumbs, Wrapper } from '../../components';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  return (
    <div className="accessories">
      <Wrapper>
        <div className="accessories__path-container">
          <BreadCrumbs />
        </div>
      </Wrapper>
    </div>
  );
};
