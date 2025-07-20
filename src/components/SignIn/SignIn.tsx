import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, type FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Bounce, ToastContainer } from 'react-toastify';
import { auth } from '../../config/firebase';
import { handleError } from '../../utils/errorHandler';
import { loadUserDataToStore } from '../../utils/userDataSync';
import { GoogleSSOAuth } from '../SSO-Auth/GoogleSSOAuth';
import styles from './SignIn.module.scss';

interface FormInputs {
  email: string;
  password: string;
}

interface AppError {
  code: string;
  [key: string]: unknown;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export const SignIn: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log('Вход успешен!');

      await loadUserDataToStore(userCredential.user.uid);

      reset();
    } catch (error: unknown) {
      console.error('Error Firebase:', error);
      handleError(error as AppError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mt-3 text-2xl font-semibold text-gray-500 capitalize sm:text-3xl ">
          Sign In
        </h1>

        <div className="relative flex items-center mt-8">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-3 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>

          <input
            {...register('email', {
              required: true,
              maxLength: 30,
              pattern: emailPattern,
            })}
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email address"
          />
          {errors.email && (
            <span className={styles.error}>
              {errors.email.type === 'required' && 'Email is required'}
              {errors.email.type === 'pattern' && 'Invalid email format'}
            </span>
          )}
        </div>

        <div className="relative flex items-center mt-5">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>

          <input
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /^[A-Za-z0-9]+$/i,
            })}
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Password"
          />
          {errors.password && (
            <span className={styles.error}>
              {errors.password.type === 'required' && 'Password is required'}
              {errors.password.type === 'minLength' &&
                'Password must be at least 6 characters'}
              {errors.password.type === 'maxLength' &&
                'Password must not exceed 20 characters'}
              {errors.password.type === 'pattern' &&
                'Password can only contain letters and numbers'}
            </span>
          )}
        </div>

        <div className="mt-7">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full px-6 h-12 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            {isLoading ?
              <span className={styles.loader}></span>
            : 'Sign in'}
          </button>

          <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
            or sign in with
          </p>
        </div>
      </form>
      <GoogleSSOAuth />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={5}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

// function handleSubmit(
//   onSubmit: any,
// ): import('react').FormEventHandler<HTMLFormElement> | undefined {
//   throw new Error('Function not implemented.');
// }
