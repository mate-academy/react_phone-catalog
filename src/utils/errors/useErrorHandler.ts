import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { ERROR_I18N_KEY } from './errorI18nMap';
import type { ErrorCode } from './errorCode';

export const useErrorHandler = () => {
  const { t } = useTranslation();

  const handleError = useCallback(
    (code: ErrorCode, error?: unknown) => {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      const message = t(ERROR_I18N_KEY[code] || ERROR_I18N_KEY.UNKNOWN);

      toast.error(message);
    },
    [t],
  );

  return { handleError };
};
