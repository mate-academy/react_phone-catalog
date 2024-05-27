import { MoveButton } from '../buttons/MoveButton';
import { Icon } from '../Icon';
import { IconList } from '../Icon/styles/IconList';
import { Logo } from '../Logo';

import classes from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.Footer__container}>
        <Logo bigLogo />
        <ul className={classes.Footer__list}>
          <li>
            <a href="!#" className={classes.Footer__link}>
              Github
            </a>
          </li>
          <li>
            <a href="!#" className={classes.Footer__link}>
              Contacts
            </a>
          </li>
          <li>
            <a href="!#" className={classes.Footer__link}>
              rights
            </a>
          </li>
        </ul>
        <div className={classes['Footer__back-top']}>
          <span>Back&nbsp;to&nbsp;top</span>
          <MoveButton onClick={() => window.scrollTo(0, 0)}>
            <Icon icon={IconList.up} />
          </MoveButton>
        </div>
      </div>
    </footer>
  );
};
