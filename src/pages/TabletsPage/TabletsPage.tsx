import { BreadCrumbs, Wrapper } from '../../components';
import './TabletsPage.scss';

export const TabletsPage = () => {
  return (
    <div className="tablets">
      <Wrapper>
        <div className="tablets__path-container">
          <BreadCrumbs />
        </div>
      </Wrapper>
    </div>
  );
};
