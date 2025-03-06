import classNames from 'classnames';
import sharedStyles from '/src/styles/shared.module.scss';

type GetLinkActiveParam = {
  isActive: boolean;
  baseClass?: string;
};

export const getLinkActive = ({ isActive, baseClass }: GetLinkActiveParam) =>
  classNames(baseClass, {
    [sharedStyles['is-active']]: isActive,
  });
