/* eslint-disable max-len */
import React, { ComponentProps, FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useIsThemeDark } from '../../../../app/features/preferences/useIsThemeDark';
import { Container } from '../../../shared/Container';
import { Text } from '../../../shared/ui/Text';
import { RoundButton } from '../../../shared/ui/RoundButton';
import { Icon } from '../../../shared/ui/Icon';
import { MenuItem } from '../../types';
import { FooterMenuList } from '../FooterMenuList';
import classes from './footer.module.scss';
import { getLogoPath } from '../../../../utils/getLogoPath';

type Props = ComponentProps<'footer'> & {
  links: MenuItem[];
};

const scrollToTop: React.MouseEventHandler<HTMLAnchorElement> = e => {
  e.preventDefault();

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: FC<Props> = ({ className, links, ...props }) => {
  const [isDark] = useIsThemeDark();

  return (
    <footer {...props} className={cn(classes.footer, className)}>
      <Container className={classes.footer__container}>
        <Link to={'/'} className={classes.footer__logo}>
          <img
            className={classes.footer__img}
            src={getLogoPath(isDark)}
            alt="Nice Gadgets"
          />
        </Link>

        <FooterMenuList items={links} />

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
