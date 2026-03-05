import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FirebaseAuthError } from './types/SignUpErrors';
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
import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';

const ERROR_MESSAGES: Record<string, string> = {
  [FirebaseAuthError.EmailAlreadyInUse]: 'This email is already taken.',
  [FirebaseAuthError.WeakPassword]:
    'The password is too weak (minimum 6 characters)',
  [FirebaseAuthError.InternalError]: 'Internal server error.',
  [FirebaseAuthError.InvalidEmail]: 'Invalid mail format.',
};

export const SignUpForm = () => {
  const { userLoggedIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);

      try {
        await doCreateUserWithEmailAndPassword(email, password, name);
      } catch (error) {
        setIsRegistering(false);
        const errorCode = (error as { code: string }).code;
        if (errorCode in ERROR_MESSAGES) {
          setErrorMessage(ERROR_MESSAGES[errorCode]);
        } else {
          setErrorMessage('An error occurred during registration.');
        }
      }
    }
  };

  return (
    <>
      {userLoggedIn && (
        <Navigate
          to={'/'}
          replace={true}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>{t('login.createAccount')}</CardTitle>
          <CardDescription>{t('login.enterInfo')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{t('login.fullName')}</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t('login.namePlaceholder')}
                  required
                />
              </Field>
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
                <FieldLabel htmlFor="password">
                  {t('login.password')}
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <FieldDescription>{t('login.passwordError')}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  {t('login.confirmPassword')}
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </Field>
              {errorMessage && (
                <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-md border border-red-200">
                  {errorMessage}
                </div>
              )}
              <FieldGroup>
                <Field>
                  <Button
                    className={cn(COLORS.green, 'cursor-pointer')}
                    type="submit"
                  >
                    {t('login.createAccount')}
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    {t('login.haveAccount?')}{' '}
                    <Link to={'/login'}>{t('login.signIn')}</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
