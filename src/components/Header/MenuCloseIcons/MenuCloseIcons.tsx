import classNames from 'classnames';
import style from './MenuCloseIcons.module.scss';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../GlobalProvider';

export const MenuCloseIcons = () => {
  const { showMenu } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className={classNames(style.container)}>
      {!showMenu ? (
        <div className={classNames(style.container_menu)}>
          <div
            className={classNames(style.icon_container)}
            onClick={() => dispatch({ type: 'setShowMenu', payload: true })}
          >
            <div className={classNames(style.icon, style.icon_menu)} />
          </div>
        </div>
      ) : (
        <div className={classNames(style.container_close)}>
          <div
            className={classNames(style.icon_container)}
            onClick={() => dispatch({ type: 'setShowMenu', payload: false })}
          >
            <div className={classNames(style.icon, style.icon_close)} />
          </div>
        </div>
      )}
    </div>
  );
};
