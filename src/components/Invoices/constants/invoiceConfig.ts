import { TYPOGRAPHY } from '@/constants/typography';

export const COMPANY_NAME = 'CODEX';
export const COMPANY_WEBSITE = 'codex.com';

export const DATE_LOCALE = 'en-GB';
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  stripe: 'Stripe (Card)',
  liqpay: 'LiqPay',
};

export enum InvoiceButtonLabel {
  Download = 'Download Invoice',
  Preparing = 'Preparing...',
  Generating = 'Generating...',
}

export const DOWNLOAD_BUTTON_CLASS = `h-14 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-foreground ${TYPOGRAPHY.buttons} rounded-md flex items-center justify-center gap-2 transition-all w-full disabled:opacity-50`;
