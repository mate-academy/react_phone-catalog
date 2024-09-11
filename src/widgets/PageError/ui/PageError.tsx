/* eslint-disable @typescript-eslint/indent */

import { ErrorInfo, FC } from 'react';
import cls from './pageError.module.scss';
import { Button } from '../../../shared/ui/forms';
import { TitleTag } from '../../../shared/ui/TitleTag';
import { TextBlock } from '../../../shared/ui/TextBlock';

interface Props {
  error?: {
    error: Error;
    errorInfo: ErrorInfo;
  } | null;
}

export const PageError: FC<Props> = ({ error }) => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <>
      <TitleTag Tag="h2" title="Something went wrong" className={cls.title} />

      {error && (
        <>
          <TextBlock text={`Error: ${error.error.message}`} />
          <TextBlock text={`Stack trace: ${error.errorInfo.componentStack}`} />
          {error.errorInfo.digest && (
            <TextBlock text={`Digest: ${error.errorInfo.digest}`} />
          )}
        </>
      )}

      <Button onClick={reloadPage} className={cls.button}>
        Reload
      </Button>
    </>
  );
};
