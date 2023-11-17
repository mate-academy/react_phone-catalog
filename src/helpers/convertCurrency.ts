export const currencies = {
  en: 'GBP',
  et: 'EUR',
  ru: 'UAH',
  uk: 'UAH',
};

export const convertCurrency = (
  amount: number,
  sale: number,
  toCurrency: string,
) => {
  const poundPrice = 0.88;
  const uahPrice = 39.35;

  let currencyValue;

  switch (toCurrency) {
    case 'GBP': {
      currencyValue = poundPrice;
      break;
    }

    case 'UAH': {
      currencyValue = uahPrice;
      break;
    }

    default: {
      currencyValue = 1;
    }
  }

  return Math.round((amount - (amount * sale)) * currencyValue);
};
