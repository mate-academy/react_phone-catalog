export const FirebaseLoginError = {
  InvalidCredential: 'auth/invalid-credential',
  UserNotFound: 'auth/user-not-found',
  PopupClosedByUser: 'auth/popup-closed-by-user',
} as const;

export type FirebaseLoginErrorType =
  (typeof FirebaseLoginError)[keyof typeof FirebaseLoginError];
