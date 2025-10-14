import { Status } from '@features/index';

export const isStatus = (arg: unknown): arg is Status => {
  return Object.values(Status).some(el => el === arg);
};
