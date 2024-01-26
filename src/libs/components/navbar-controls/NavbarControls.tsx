import { createElement } from 'react';

import './styles.scss';

import { ControlsComponents } from './libs/controls-components.enum';
import { Icon } from '../icon/Icon';
import { NavbarLink } from '../navbar-link/NavbarLink';
import { controlsLinks } from '../navbar/libs/enums/controls-links.enum';
import { IconNames } from '../../enums';

export const NavbarControls: React.FC = () => {
  return (
    <div className="navbar-controls">
      {controlsLinks.map(link => (
        <NavbarLink
          className="navbar-controls__link"
          key={link.url}
          link={link}
          isIconLink
        >
          <Icon
            icon={link.IconNames as IconNames}
            className="navbar-controls__icon"
          >
            {createElement(ControlsComponents[link.title], {
              className: 'navbar-controls__qty',
            })}
          </Icon>
        </NavbarLink>
      ))}
    </div>
  );
};
