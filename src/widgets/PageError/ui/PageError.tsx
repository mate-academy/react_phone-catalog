/* eslint-disable @typescript-eslint/indent */

import { ErrorInfo, FC } from 'react';
import cls from './pageError.module.scss';
import { Button } from '../../../shared/ui/forms';
import { TitleTag } from '../../../shared/ui/TitleTag';

interface Props {
  error?:
    | {
        error: Error;
        errorInfo: ErrorInfo;
      }
    | undefined;
}

export const PageError: FC<Props> = ({ error }) => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <>
      <TitleTag Tag="h2" title="Something went wrong" className={cls.title} />
      {error && <p key={Date.now()}>{`${error?.errorInfo?.componentStack}`}</p>}
      {error && <p key={Date.now()}>{`${error?.errorInfo.digest}`}</p>}
      <Button onClick={reloadPage} className={cls.button}>
        Reload
      </Button>
    </>
  );
};
