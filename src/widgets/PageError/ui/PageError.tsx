import { FC } from 'react';
import cls from './pageError.module.scss';
import { Button } from '../../../shared/ui/forms';
import { TitleTag } from '../../../shared/ui/TitleTag';

export const PageError: FC = () => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <>
      <TitleTag Tag="h2" title="Something went wrong" className={cls.title} />
      <Button onClick={reloadPage} className={cls.button}>
        Reload
      </Button>
    </>
  );
};
