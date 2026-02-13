// import cn from 'classnames';
// import style from './Loader.module.scss';

// export const Loader = () => (
//   <div className={cn(style.Loader)} data-cy="loader">
//     <div className={cn(style.Loader__content)} />
//   </div>
// );

/* eslint-disable import/no-extraneous-dependencies */
import cn from 'classnames';
import style from './Loader.module.scss';
import { StyledWrapper } from './StyledWrapper';

export const Loader = () => (
  <div className={cn(style.Loader)} data-cy="loader">
    <StyledWrapper className={cn(style.Loader__content)}>
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  </div>
);
