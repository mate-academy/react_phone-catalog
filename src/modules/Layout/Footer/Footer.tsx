import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/img/Logo.png';
import { Container } from '../../shared/Container';
import { Icon } from '../../shared/ui/Icon';
import { RoundButton } from '../../shared/ui/RoundButton';
import { Text } from '../../shared/ui/Text';
import { FooterMenuList } from './components/FooterMenuList';
import { menuItems } from './variables';
import classes from './footer.module.scss';

type Props = {};

export const Footer: FC<Props> = () => {
  const scrollToTop: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={classes.footer}>
      <Container className={classes.footer__container}>
        <Link to={'/'} className={classes.footer__logo}>
          <img className={classes.footer__img} src={Logo} alt="Nice Gadgets" />
        </Link>

        <FooterMenuList items={menuItems} />

        <div className={classes.footer__backToTop}>
          <Link
            onClick={scrollToTop}
            to={''}
            className={classes.footer__backToTopTextLink}
          >
            <Text.Small>Back to top</Text.Small>
          </Link>
          <Link onClick={scrollToTop} to={''}>
            <RoundButton>
              <Icon variant="arrow-up" />
            </RoundButton>
          </Link>
        </div>
      </Container>
    </footer>
  );
};
