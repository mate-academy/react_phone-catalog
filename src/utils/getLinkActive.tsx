import classNames from 'classnames';
import sharedStyles from '../styles/shared/shared.module.scss';

type GetLinkActiveParam = {
  isActive: boolean;
  baseClass?: string;
};

export const getLinkActive = ({ isActive, baseClass }: GetLinkActiveParam) =>
  classNames(baseClass, {
    [sharedStyles.active]: isActive,
  });
