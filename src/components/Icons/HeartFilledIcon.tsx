import React from 'react';
import './Icons.scss';
import '../../styles/utils/_vars.scss';

type Props = {
  count?: number;
};

export const HeartFilledIcon: React.FC<Props> = ({ count }) => {
  return (
    <div className="icon">
      <svg
        className="icon__heart--filled"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852
          1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005
          2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005
          1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668
          3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668
          7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165
          14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158
          7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679
          5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158
          3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015
          1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z"
          fill="#F447AF"
        />
      </svg>

      {count && count > 0 && <span className="icon__counter">{count}</span>}
    </div>
  );
};
