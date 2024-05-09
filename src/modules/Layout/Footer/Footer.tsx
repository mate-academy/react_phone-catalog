import React, { ComponentProps, FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Logo from '../../../assets/img/Logo.png';
import { Container } from '../../shared/Container';
import { Icon } from '../../shared/ui/Icon';
import { RoundButton } from '../../shared/ui/RoundButton';
import { Text } from '../../shared/ui/Text';
import { FooterMenuList } from './components/FooterMenuList';
import { MENU_ITEMS } from './variables';
import classes from './footer.module.scss';

type Props = ComponentProps<'footer'>;

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className={cn(classes.footer, className)}>
      <Container className={classes.footer__container}>
        <Link to={'/'} className={classes.footer__logo}>
          <img className={classes.footer__img} src={Logo} alt="" />
        </Link>
        <FooterMenuList items={MENU_ITEMS} />
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
