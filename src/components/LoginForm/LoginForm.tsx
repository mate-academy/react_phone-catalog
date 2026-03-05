import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FirebaseLoginError } from './types/SignInErrors';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext.tsx';
import {
  doSingInWithEmailAndPassword,
  doSingInWithGoogle,
} from '@/firebase/auth';
import { COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';

const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  [FirebaseLoginError.InvalidCredential]: 'Incorrect email or password.',
  [FirebaseLoginError.UserNotFound]: 'No user with this email was found.',
  [FirebaseLoginError.PopupClosedByUser]: 'Google sign-in has been canceled.',
};

export function LoginForm() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSingInWithEmailAndPassword(email, password);
        setEmail('');
        setPassword('');
      } catch (error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode in LOGIN_ERROR_MESSAGES) {
          setErrorMessage(LOGIN_ERROR_MESSAGES[errorCode]);
        } else {
          setErrorMessage('There was an error signing in. Please try again.');
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSingInWithGoogle();
      } catch (error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode in LOGIN_ERROR_MESSAGES) {
          setErrorMessage(LOGIN_ERROR_MESSAGES[errorCode]);
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const { t } = useTranslation();

  return (
    <>
      {userLoggedIn && (
        <Navigate
          to={'/'}
          replace={true}
        />
      )}
      <div className={cn('flex flex-col gap-6')}>
        <Card>
          <CardHeader>
            <CardTitle> {t('login.loginToAccount')}</CardTitle>
            <CardDescription>{t('login.enterAccount')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">
                      {t('login.password')}
                    </FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </Field>
                {errorMessage && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-md border border-red-200">
                    {errorMessage}
                  </div>
                )}
                <Field>
                  <Button
                    className={cn(COLORS.green, 'cursor-pointer')}
                    type="submit"
                    disabled={isSigningIn}
                  >
                    {t('login.signIn')}
                  </Button>
                  <Button
                    className="cursor-pointer flex items-center justify-center gap-2 w-full"
                    variant="outline"
                    type="button"
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    {t('login.signWithGoogle')}
                  </Button>
                  <FieldDescription className="text-center">
                    {t('login.noAccount?')}{' '}
                    <Link to={'/signup'}>{t('login.signUp')}</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
