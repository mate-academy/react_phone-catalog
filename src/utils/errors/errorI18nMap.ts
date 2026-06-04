import type { ErrorCode } from './errorCode';

export const ERROR_I18N_KEY: Record<ErrorCode, string> = {
  NETWORK: 'errors.network',
  API_ERROR: 'errors.apiErrors',
  LOCAL_STORAGE_READ: 'errors.localStorageRead',
  LOCAL_STORAGE_WRITE: 'errors.localStorageWrite',
  UNKNOWN: 'errors.unknown',
  THEME_PROVIDER: 'errors.themeProvider',
};
