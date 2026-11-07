import { useNavigate } from 'react-router-dom';
import { ButtonSelect } from '../components/atoms/Buttons/ButtonSelect';
import { Typography } from '../components/atoms/Typography/Typography';
import { useCallback, useEffect, useState } from 'react';
import { AnimationDots } from '../components/atoms/AnimationDots/AnimationDots';

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (counter === 0) {
        navigateToHome();
      }

      setCounter((currentAmount) =>
        currentAmount > 0 ? currentAmount - 1 : currentAmount,
      );
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [counter, navigateToHome]);

  return (
    <div className="flex justify-center items-center mt-10 md:mt-15 lg:mt-20 flex-col gap-2 md:gap-8 lg:gap-12">
      <Typography level="h1">404</Typography>
      <Typography level="h2">Page not found</Typography>
      <Typography level="body">
        The page you were looking for doesn't exist.
      </Typography>
      <div className="py-5 flex flex-col justify-center items-center gap-4">
        <AnimationDots />
        <Typography level="body">
          Redirecting to the homepage in {counter} seconds...
        </Typography>
      </div>

      <div>
        <ButtonSelect
          handleClick={navigateToHome}
          isSelected={false}
          className="h-12 p-8 w-full bg-primary hover:cursor-pointer text-white items-center justify-center flex hover-zoom-small hover:border-primary dark:bg-accent-dark dark:border-none dark:hover:bg-accent-hover-dark"
          content="Go to the Homepage"
        />
      </div>
    </div>
  );
};
