import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import * as usersActions from '../features/users';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';
import { setAuthor } from '../features/author';
import { clearPost } from '../features/selectedPost';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const users = useAppSelector(state => state.users.users);
  const author = useAppSelector(state => state.author.author);
  const dispatch = useAppDispatch();

  const selectAuthor = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(clearPost());
  };

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{author?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => selectAuthor(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
