import { Nav } from '../Nav';

import './Menu.scss';

export const Menu = () => {
  return (
    <div className="Menu" id="Menu">
      <div className="container container--with-min-height">
        <div className="Menu__content">
          <Nav />
        </div>
      </div>
    </div>
  );
};
