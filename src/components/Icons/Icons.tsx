import { withBase } from '../../utils/withBase';
import cn from 'classnames';
import styles from './Icons.module.scss';

type IconProps = {
  className?: string;
};

// File masks keep the existing currentColor states and color transitions.
const Icon = ({ className, src }: IconProps & { src: string }) => (
  <span
    aria-hidden="true"
    className={cn(styles.icon, className)}
    style={{
      maskImage: `url("${withBase(src)}")`,
      WebkitMaskImage: `url("${withBase(src)}")`,
    }}
  />
);

export const IconChevronRight = ({ className }: IconProps) => (
  <Icon src="/icons/chevron-right.svg" className={className} />
);

export const IconChevronLeft = ({ className }: IconProps) => (
  <Icon src="/icons/chevron-left.svg" className={className} />
);

export const IconChevronUp = ({ className }: IconProps) => (
  <Icon src="/icons/chevron-up.svg" className={className} />
);

export const IconChevronDown = ({ className }: IconProps) => (
  <Icon src="/icons/chevron-down.svg" className={className} />
);

export const IconHeart = ({ className }: IconProps) => (
  <Icon src="/icons/heart.svg" className={className} />
);

export const IconHeartFilled = ({ className }: IconProps) => (
  <Icon src="/icons/heart-filled.svg" className={className} />
);

export const IconCart = ({ className }: IconProps) => (
  <Icon src="/icons/cart.svg" className={className} />
);

export const IconClose = ({ className }: IconProps) => (
  <Icon src="/icons/close.svg" className={className} />
);

export const IconMenu = ({ className }: IconProps) => (
  <Icon src="/icons/menu.svg" className={className} />
);

export const IconHome = ({ className }: IconProps) => (
  <Icon src="/icons/home.svg" className={className} />
);

export const IconPlus = ({ className }: IconProps) => (
  <Icon src="/icons/plus.svg" className={className} />
);

export const IconMinus = ({ className }: IconProps) => (
  <Icon src="/icons/minus.svg" className={className} />
);
