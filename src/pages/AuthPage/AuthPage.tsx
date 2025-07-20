import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignIn } from '../../components/SignIn';
import { SignUp } from '../../components/SignUp';
import { auth } from '../../config/firebase';
import styles from './AuthPage.module.scss';

export const AuthPage: FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => listen();
  }, [location.pathname, navigate]);

  return (
    <section className={`bg-white ${styles.authPage}`}>
      <div className="container flex flex-col items-center justify-center min-h-screen px-8 mx-auto">
        {!isSignUp ?
          <SignIn />
        : <SignUp />}

        <div className="mt-6 text-center ">
          <button
            onClick={handleToggle}
            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          >
            {!isSignUp ?
              'Don’t have an account yet? Sign up'
            : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </section>
  );
};
