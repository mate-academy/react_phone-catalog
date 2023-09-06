import { PathDisplay, Wrapper } from '../../components';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  return (
    <div className="accessories">
      <Wrapper>
        <div className="accessories__path-container">
          <PathDisplay />
        </div>
      </Wrapper>
    </div>
  );
};
