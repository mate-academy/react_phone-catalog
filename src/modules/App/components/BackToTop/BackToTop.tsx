import { Arrow } from '@components/Arrow';
import './BackToTop.scss';

import { ArrowType } from '@sTypes/ArrowType';

export const BackToTop = () => {
  return (
    <div className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
      <div className="back-to-top__label">Back to top</div>

      <div>
        <Arrow type={ArrowType.up} />
      </div>
    </div>
  );
};
