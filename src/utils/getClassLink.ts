import classNames from 'classnames';

type Params = {
  baseClass: CSSModuleClasses[string];
  activeClass: CSSModuleClasses[string];
};

export function getClassLink({ baseClass, activeClass }: Params) {
  return function ({ isActive }: { isActive: boolean }) {
    return classNames(baseClass, { [activeClass]: isActive });
  };
}
