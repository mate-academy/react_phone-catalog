import './BackToTop.scss';

import { Icon } from '@components/Icon';
import { IconType } from '@sTypes/IconType';

export const BackToTop = () => {
  return (
    <div className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
      <div className="back-to-top__label">Back to top</div>

      <div>
        <Icon type={IconType.arrowUp} />
      </div>
    </div>
  );
};
