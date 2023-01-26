import { FC, useContext } from 'react';
import cn from 'classnames';
import { Logo } from '../Logo';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../contexts/ThemeContext';
import { goToTop } from '../../utils/goToTop';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./Footer.module.scss');

const {
  Footer: footer,
  'Footer--dark': footerDark,
  Footer__container: container,
  Footer__Logo: logo,
  Footer__info: info,
  'Footer__info-item': infoItem,
  'Footer__info-link': infoLink,
  'Footer__info-link--dark': infoLinkDark,
  Footer__action: action,
  'Footer__action-text': actionText,
  'Footer__action-text--dark': actionTextDark,
} = styles;

type Props = {
  className?: string;
};

enum FooterLinks {
  Github = 'https://github.com/anastasiia-tilikina',
  Contacts = '/',
  Rights = '/',
}

export const Footer: FC<Props> = ({ className = '' }) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <footer
      className={cn(
        footer,
        className,
        { [footerDark]: isThemeDark },
      )}
    >
      <div className={container}>
        <Logo className={logo} />

        <ul className={info}>
          {Object.entries(FooterLinks).map(([key, value], i) => (
            <li
              className={infoItem}
              key={key}
            >
              <a
                className={cn(
                  infoLink,
                  { [infoLinkDark]: isThemeDark },
                )}
                href={!i ? value : `#${value}`}
                target="_blank"
                rel="noreferrer"
              >
                {key}
              </a>
            </li>
          ))}
        </ul>

        <div className={action}>
          <p
            className={cn(
              actionText,
              { [actionTextDark]: isThemeDark },
            )}
          >
            Back to top
          </p>

          <IconButton
            arrow={{ direction: 'up', disabled: false }}
            onClick={goToTop}
          />
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  className: '',
};
