import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/img/Logo.png';
import { Container } from '../../shared/Container';
import { Icon } from '../../shared/ui/Icon';
import { RoundButton } from '../../shared/ui/RoundButton';
import { Text } from '../../shared/ui/Text';
import { FooterMenuList } from './components/FooterMenuList';
import { MenuItem } from './types';
import classes from './footer.module.scss';

type Props = {
  menuItems: MenuItem[];
};

export const Footer: FC<Props> = ({ menuItems }) => {
  return (
    <footer className={classes.footer}>
      <Container className={classes.footer__container}>
        <Link to={'/'} className={classes.footer__logo}>
          <img className={classes.footer__img} src={Logo} alt="Nice Gadgets" />
        </Link>
        <FooterMenuList items={menuItems} />
        <div className={classes.footer__backToTop}>
          <Link to={'#top'} className={classes.footer__backToTopTextLink}>
            <Text variant="small">Back to top</Text>
          </Link>
          <Link to={'#top'}>
            <RoundButton>
              <Icon variant="arrow-up" />
            </RoundButton>
          </Link>
        </div>
      </Container>
    </footer>
  );
};
