import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState, type FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { auth } from '../../config/firebase';
import { useCartActionsStore } from '../../hooks/useCartAndFavorites';
import { handleError } from '../../utils/errorHandler';
import { loadUserDataToStore, syncUserData } from '../../utils/userDataSync';
import styles from './SignUp.module.scss';

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AppError {
  code: string;
  [key: string]: unknown;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const { loadFromStorage } = useCartActionsStore();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = userCredential.user;
      const displayName = `${data.firstName} ${data.lastName}`;

      await updateProfile(user, {
        displayName: displayName,
      });

      await syncUserData(user.uid, displayName, data.email, true);

      await loadUserDataToStore(user.uid);
      loadFromStorage();

      console.log('Registration successful!');

      toast.success('Registration successful', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
      reset();
    } catch (error: unknown) {
      console.error('Registration error:', error);
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
        <h1 className="mt-3 text-2xl font-semibold text-gray-500 capitalize sm:text-3xl">
          Sign Up
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>

          <input
            {...register('firstName', {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="First Name"
          />
        </div>
        {errors.firstName && (
          <span className={styles.error}>
            {errors.firstName.type === 'required' && 'First name is required'}
            {errors.firstName.type === 'minLength' &&
              'First name must be at least 2 characters'}
            {errors.firstName.type === 'maxLength' &&
              'First name must not exceed 20 characters'}
          </span>
        )}

        <div className="relative flex items-center mt-4">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>

          <input
            {...register('lastName', {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Last Name"
          />
        </div>
        {errors.lastName && (
          <span className={styles.error}>
            {errors.lastName.type === 'required' && 'Last name is required'}
            {errors.lastName.type === 'minLength' &&
              'Last name must be at least 2 characters'}
            {errors.lastName.type === 'maxLength' &&
              'Last name must not exceed 20 characters'}
          </span>
        )}

        <div className="relative flex items-center mt-4">
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
        </div>
        {errors.email && (
          <span className={styles.error}>
            {errors.email.type === 'required' && 'Email is required'}
            {errors.email.type === 'pattern' && 'Invalid email format'}
          </span>
        )}

        <div className="relative flex items-center mt-4">
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
            type="password"
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /^[A-Za-z0-9]+$/i,
            })}
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Password"
          />
        </div>
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

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full px-6 h-12 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ?
              <span className={styles.loader}></span>
            : 'Sign up'}
          </button>
        </div>
      </form>

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
