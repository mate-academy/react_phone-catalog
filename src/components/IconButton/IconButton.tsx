/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext } from 'react';
import cn from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./IconButton.module.scss');

const {
  IconButton: button,
  'IconButton--selected': selected,
  'IconButton--selected-dark': selectedDark,
  'IconButton--favorite': favoriteButton,
  'IconButton--dark': dark,
  'IconButton--disabled': disabledButton,
  'IconButton--disabled-dark': disabledDark,
} = styles;

type Arrow = {
  direction: 'left' | 'right' | 'up' | 'down',
  disabled: boolean,
};

type Counter = {
  action: 'Plus' | 'Minus',
  disabled: boolean,
};

type Favorite = {
  filled: boolean,
};

type Page = {
  number: number,
  selected: boolean,
};

type Link = {
  params: SearchParams
};

type Props = {
  className?: string;
  onClick: () => void;
  arrow?: Arrow | null,
  favorite?: Favorite | null;
  page?: Page | null,
  link?: Link | null,
  counter?: Counter | null,
};

export const IconButton: FC<Props> = ({
  className = '',
  onClick,
  arrow = null,
  favorite = null,
  page = null,
  link = null,
  counter = null,
}) => {
  const { isThemeDark, theme } = useContext(ThemeContext);

  const pickIcon = () => {
    let icon = '';

    if (arrow) {
      const { direction, disabled } = arrow;

      icon = `./icons/Arrow_${direction}_${theme}${disabled ? '_disabled' : ''}.svg`;
    }

    if (favorite) {
      const { filled } = favorite;

      icon = filled ? './icons/Heart_filled.svg' : `./icons/Heart_${theme}.svg`;
    }

    if (counter) {
      const { action, disabled } = counter;

      icon = `./icons/${action}_${theme}${disabled ? '_disabled' : ''}.svg`;
    }

    return icon;
  };

  const style = page ? {} : { backgroundImage: `url(${pickIcon()})` };

  const componentClassNames = cn(
    { [selected]: page?.selected && !isThemeDark },
    {
      [selectedDark]: page?.selected
        && isThemeDark,
    },
    { [favoriteButton]: favorite },
    className,
    button,
    { [dark]: isThemeDark },
    {
      [disabledButton]: arrow?.disabled
        && !isThemeDark && link,
    },
    {
      [disabledDark]: arrow?.disabled
        && isThemeDark && link,
    },
  );

  return (
    link ? (
      <SearchLink
        params={link.params}
        className={componentClassNames}
        onClick={onClick}
        style={style}
      >
        {page?.number}
      </SearchLink>
    ) : (
      <button
        className={componentClassNames}
        type="button"
        disabled={arrow?.disabled || counter?.disabled || false}
        onClick={onClick}
        style={style}
      >
        {page?.number}
      </button>
    )
  );
};

IconButton.defaultProps = {
  className: '',
  arrow: null,
  favorite: null,
  page: null,
  link: null,
  counter: null,
};
