export const FirebaseAuthError = {
  EmailAlreadyInUse: 'auth/email-already-in-use',
  WeakPassword: 'auth/weak-password',
  InternalError: 'auth/internal-error',
  InvalidEmail: 'auth/invalid-email',
} as const;

export type FirebaseAuthError =
  (typeof FirebaseAuthError)[keyof typeof FirebaseAuthError];
