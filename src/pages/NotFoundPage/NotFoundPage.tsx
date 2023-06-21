import { FC } from 'react'
import { Link } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';
import './notFoundPage.scss';

export const NotFoundPage: FC = () => {
  return (
    <>
      <Notification message={'You have reached the wrong page'} />
    </>
  )
}
