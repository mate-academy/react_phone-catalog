import { ReactElement } from 'react';
import { Status } from '@features/itemsLoader/Status';
import { Spinner } from '@ui/loadingUI/spinner';
import { ErrorElement } from '@ui/loadingUI/errorElement';

const createLoaderMap = (
  message: string,
  spinnerStyle: string,
  errorStyle: string,
): Record<Status, ReactElement> => ({
  [Status.LOADING]: <Spinner className={spinnerStyle} />,
  [Status.ERROR]: <ErrorElement message={message} className={errorStyle} />,
});

const loaderTextMap: Record<Status, string> = {
  [Status.LOADING]: 'Loading...',
  [Status.ERROR]: 'Something went wrong...',
};

export { createLoaderMap, loaderTextMap };
