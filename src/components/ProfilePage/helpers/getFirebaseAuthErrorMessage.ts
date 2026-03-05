import { FirebaseAuthErrorCode } from '../constants/firebaseAuthErrorCode';

export const getFirebaseAuthErrorMessage = (
  error: unknown,
  defaultMessage: string,
): string => {
  const code =
    error instanceof Error && 'code' in error ?
      (error as { code: string }).code
    : '';

  switch (code) {
    case FirebaseAuthErrorCode.WrongPassword:
    case FirebaseAuthErrorCode.InvalidCredential:
      return 'Невірний пароль';
    case FirebaseAuthErrorCode.RequiresRecentLogin:
      return 'Потрібно повторно увійти в акаунт';
    default:
      return defaultMessage;
  }
};
