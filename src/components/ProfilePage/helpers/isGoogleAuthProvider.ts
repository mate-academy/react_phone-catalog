import type { User } from 'firebase/auth';
import { AuthProvider } from '../constants/authProvider';

export const isGoogleAuthProvider = (
  user: User | null | undefined,
): boolean => {
  return user?.providerData?.[0]?.providerId === AuthProvider.Google;
};
