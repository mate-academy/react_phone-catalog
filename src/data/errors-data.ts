export const ERRORS_LIST = [
  {
    code: 'auth/invalid-credential',
    message: 'The email or password is invalid.',
  },
  {
    code: 'auth/missing-password',
    message: 'No Password Provided',
  },
  {
    code: 'auth/email-already-in-use',
    message: 'The email address is already in use by another account.',
  },
  {
    code: 'auth/weak-password',
    message: 'Password should be at least 6 characters',
  },
  {
    code: 'auth/invalid-login-credentials',
    message: 'The email or password is invalid.',
  },
  {
    code: 'auth/invalid-email',
    message: 'The Email Address is invalid!',
  },
  {
    code: 'auth/user-disabled',
    message:
      'The account associated with this Email Address has been disabled.',
  },
  {
    code: 'auth/user-not-found',
    message: 'No user found for the provided Email Address.',
  },
  {
    code: 'auth/wrong-password',
    message: 'Wrong password.',
  },
  {
    code: 'auth/missing-email',
    message: "Email address hasn't been set up.",
  },
  {
    code: 'auth/session-expired',
    message: 'The session has expired.',
  },
  {
    code: 'auth/too-many-requests',
    message: 'Too many requests have been made.',
  },
  {
    code: 'auth/user-disabled',
    message: 'The user has been disabled.',
  },
  {
    code: 'auth/too-many-failed-attempts',
    message: 'Too many failed attempts have been made to sign in.',
  },
  {
    code: 'auth/account-exists-with-different-credential',
    message:
      'An account with the same email address or phone number already exists, but with different credentials.',
  },
  {
    code: 'auth/credential-already-in-use',
    message: 'The credentials are already in use for another account.',
  },
  {
    code: 'auth/unknown-error',
    message: 'An unknown error occurred.',
  },
  {
    code: 'auth/network-request-failed',
    message:
      'It seems like there is a network issue. Please check your internet connection and try again.',
  },
  {
    code: 'auth/popup-closed-by-user',
    message:
      'The popup has been closed before authentication could be completed. Please try again.',
  },
  {
    code: 'auth/internal-error',
    message:
      'It seems like there is a network issue. Please check your internet connection and try again.',
  },
  {
    code: 'default',
    message: 'An unknown error occurred. Please try again later.',
  },
];
