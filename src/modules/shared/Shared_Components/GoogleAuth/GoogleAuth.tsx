/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { CheckoutContext } from '../../../../Store/CheckoutStore';
import { decodeJWT } from '../../../../utils/decodeJWT';
import { emitSessionStorageChange } from '../../../../utils/eventEmitters/sessionStorageEmitter';
import {
  CheckoutData,
  GoogleCredentials,
  SessionStorageCredentials,
} from '../../Types/types';

export const GoogleAuth = () => {
  const { checkoutData } = useContext(CheckoutContext);

  return (
    <GoogleLogin
      onSuccess={(response: GoogleCredentialResponse) => {
        const credentials: GoogleCredentials = decodeJWT(response?.credential);

        const checkoutCredentials: CheckoutData = {
          ...checkoutData,
          firstName: credentials.given_name,
          lastName: credentials.family_name,
          email: credentials.email,
          isLoggedInByGoogle: true,
        };

        emitSessionStorageChange(
          SessionStorageCredentials.CheckoutCredentials,
          checkoutCredentials,
        );
      }}
      onError={() => {
        alert('Login Failed');
      }}
    />
  );
};
