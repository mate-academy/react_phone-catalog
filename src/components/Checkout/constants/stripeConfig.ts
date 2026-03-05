export const STRIPE_PUBLIC_KEY =
  'pk_test_51T2Z36HgUJaKIiLfmdNyCLzc6JXFYo35LnbrddyrzcA3tyRv9Z73K5x59oPRNCCGBE8Dgdqw83MG8mOIQuKkCi7z00IzaGYL0r';

function getThemeColor(varName: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback;
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || fallback
  );
}

export function getStripeAppearance() {
  const bg = getThemeColor('--card', '#fee9ca');
  const fg = getThemeColor('--foreground', '#3d2400');
  const primary = getThemeColor('--primary', '#3b2010');
  const border = getThemeColor('--border', '#dfc08a');
  const ring = getThemeColor('--ring', '#b8844a');
  const cardAccent = getThemeColor('--muted', '#f7edd8');
  const muted = getThemeColor('--muted-foreground', '#7a5c40');
  const destructive = getThemeColor('--destructive', '#eb5757');

  return {
    theme: 'flat' as const,
    variables: {
      colorPrimary: primary,
      colorBackground: bg,
      colorText: fg,
      colorDanger: destructive,
      colorTextSecondary: muted,
      colorTextPlaceholder: muted,
      colorIcon: muted,
      fontFamily: 'Manrope, sans-serif',
      borderRadius: '6px',
    },
    rules: {
      '.Tab': {
        border: `1px solid ${border}`,
        backgroundColor: bg,
      },
      '.Tab--selected': {
        backgroundColor: cardAccent,
        borderColor: primary,
        color: fg,
      },
      '.Tab:hover': {
        backgroundColor: cardAccent,
      },
      '.Input': {
        border: `1px solid ${border}`,
        backgroundColor: bg,
      },
      '.Input:focus': {
        borderColor: ring,
        boxShadow: `0 0 0 3px ${ring}33`,
      },
      '.Label': {
        color: fg,
      },
    },
  };
}

export const MOCK_PAYMENT_DELAY_MS = 1000;

export const ORDER_SUCCESS_RETURN_PATH = '/#/order-success/pending';
