interface IconProps {
  className?: string;
  'aria-label'?: string;
}

import { heartPath, cartPath, homePath } from './iconPaths';

export function IconHeart({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={heartPath} />
    </svg>
  );
}

export function IconHeartFilled({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d={heartPath} />
    </svg>
  );
}

export function IconCart({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d={cartPath} />
    </svg>
  );
}

export function IconMenu({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function IconClose({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconChevronLeft({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function IconChevronRight({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function IconArrowUp({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export function IconLogo({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      width="89"
      height="32"
      viewBox="0 0 89 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Nice Gadgets"
      style={{ overflow: 'visible' }}
    >
      <text
        x="0"
        y="23"
        fontFamily="'Mont', sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="#313237"
        letterSpacing="-0.2px"
      >
        Nice G
      </text>
      <circle cx="53" cy="9" r="5" fill="#E2E6E9" />
      <text
        x="60"
        y="23"
        fontFamily="'Mont', sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="#313237"
        letterSpacing="-0.2px"
      >
        adgets
      </text>
    </svg>
  );
}

export function IconDot({
  className,
  $active = false,
}: IconProps & { $active?: boolean }): JSX.Element {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r={$active ? 8 : 4}
        fill={$active ? '#313237' : '#B4BDC3'}
      />
    </svg>
  );
}

export function IconMinus({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconPlus({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconRemove({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconHome({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={homePath} />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IconChevronArrowRight({
  className,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      aria-label={ariaLabel}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
