/* eslint-disable */

import { VariantType } from 'notistack';

export const createHandleClickVariant =
  (enqueueSnackbar: (msg: string, options: { variant: VariantType }) => void) =>
  (message: string, variant: VariantType) =>
  () => {
    enqueueSnackbar(message, { variant });
  };
