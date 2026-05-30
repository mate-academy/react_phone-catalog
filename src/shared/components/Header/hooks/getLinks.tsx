import classNames from 'classnames';
export const getLinksClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('', {
    'active-link': isActive,
  });
};
