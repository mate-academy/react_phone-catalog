import classNames from 'classnames';

import { useCurrencyStore } from '@/shared/store/useCurrencyStore';

import styles from './CurrencySwitcher.module.scss';

export const CurrencySwitcher = () => {
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  return (
    <div
      className={styles.currencySwitch}
      role="group"
      aria-label="Currency"
    >
      {(['USD', 'UAH'] as const).map((value) => (
        <button
          key={value}
          type="button"
          className={classNames(styles.currencyButton, {
            [styles.activeCurrency]: currency === value,
          })}
          onClick={() => setCurrency(value)}
          aria-pressed={currency === value}
        >
          {value}
        </button>
      ))}
    </div>
  );
};
