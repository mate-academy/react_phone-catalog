/* eslint-disable */

type Props = {
  variant?: 'right' | 'top' | 'bottom' | 'left';
};

export const VECTOR_SVG: React.FC<Props> = ({ variant = 'right' }) => {
  const variantTransform = () => {
    switch (variant) {
      case 'right':
        return {
          transform: 'rotate(0deg)',
          transformOrigin: 'center',
        };

      case 'top':
        return {
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
        };

      case 'bottom':
        return {
          transform: 'rotate(90deg)',
          transformOrigin: 'center',
        };

      case 'left':
        return {
          transform: 'rotate(180deg)',
          transformOrigin: 'center',
        };

      default:
        return {};
    }
  };

  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      xmlns="http://www.w3.org/2000/svg"
      style={variantTransform()}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M0.528758 0.528606
          C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606
          L5.47157 4.52861
          C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141
          L1.47157 9.47141
          C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141
          C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861
          L4.05735 5.00001
          L0.528758 1.47141
          C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
      />
    </svg>
  );
};

export const LIKE_SVG = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.62852 0.631417C10.1584 0.411843 10.7264 0.298828 11.3 0.298828
      C11.8737 0.298828 12.4416 0.411843 12.9716 0.631417C13.5015 0.850991
      13.983 1.17282 14.3885 1.57852C14.7941 1.98398 15.1158 2.46537 15.3353
      2.99519C15.5549 3.52511 15.6679 4.0931 15.6679 4.66671C15.6679 5.24032
      15.5549 5.80831 15.3353 6.33824C15.1158 6.86811 14.794 7.34953 14.3884
      7.75502C14.3883 7.75506 14.3884 7.75498 14.3884 7.75502L8.49502 13.6484
      C8.22165 13.9217 7.77844 13.9217 7.50507 13.6484L1.61174 7.75502C0.792668
      6.93595 0.33252 5.82505 0.33252 4.66671C0.33252 3.50837 0.792668 2.39747
      1.61174 1.5784C2.43081 0.759334 3.54171 0.299185 4.70005 0.299185
      C5.85839 0.299185 6.96928 0.759334 7.78835 1.5784L8.00005 1.7901L8.21162
      1.57852C8.21158 1.57856 8.21166 1.57848 8.21162 1.57852C8.61711 1.17288
      9.09865 0.85097 9.62852 0.631417ZM13.3983 2.56824C13.1228 2.29261 12.7957
      2.07396 12.4357 1.92479C12.0756 1.77561 11.6898 1.69883 11.3 1.69883
      C10.9103 1.69883 10.5245 1.77561 10.1644 1.92479C9.80441 2.07396 9.4773
      2.29261 9.2018 2.56824L8.49502 3.27502C8.22165 3.54839 7.77844 3.54839
      7.50507 3.27502L6.7984 2.56835C6.24189 2.01183 5.48708 1.69918 4.70005
      1.69918C3.91301 1.69918 3.15821 2.01183 2.60169 2.56835C2.04517 3.12487
      1.73252 3.87967 1.73252 4.66671C1.73252 5.45375 2.04517 6.20855 2.60169
      6.76507L8.00005 12.1634L13.3984 6.76507C13.674 6.48957 13.8928 6.16235
      14.042 5.80233C14.1911 5.4423 14.2679 5.05642 14.2679 4.66671C14.2679
      4.27701 14.1911 3.89112 14.042 3.5311C13.8928 3.17107 13.6739 2.84374
      13.3983 2.56824Z"
    />
  </svg>
);

export const SHOPPING_SVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.33366 6C5.70185 6 6.00033 6.29848 6.00033 6.66667C6.00033 7.1971 6.21104 7.70581 6.58611 8.08088C6.96118 8.45595 7.46989 8.66667 8.00033 8.66667C8.53076 8.66667 9.03947 8.45595 9.41454 8.08088C9.78961 7.70581 10.0003 7.1971 10.0003 6.66667C10.0003 6.29848 10.2988 6 10.667 6C11.0352 6 11.3337 6.29848 11.3337 6.66667C11.3337 7.55072 10.9825 8.39857 10.3573 9.02369C9.73223 9.64881 8.88438 10 8.00033 10C7.11627 10 6.26842 9.64881 5.6433 9.02369C5.01818 8.39857 4.66699 7.55072 4.66699 6.66667C4.66699 6.29848 4.96547 6 5.33366 6Z"/>
  </svg>
);

export const BURGERMENU_SVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4.5C1 4.08579 1.39175 3.75 1.875 3.75H14.125C14.6082 3.75 15 4.08579 15 4.5C15 4.91421 14.6082 5.25 14.125 5.25H1.875C1.39175 5.25 1 4.91421 1 4.5Z"/>
    <path d="M1 8C1 7.58579 1.39175 7.25 1.875 7.25H14.125C14.6082 7.25 15 7.58579 15 8C15 8.41421 14.6082 8.75 14.125 8.75H1.875C1.39175 8.75 1 8.41421 1 8Z"/>
    <path d="M1.875 10.75C1.39175 10.75 1 11.0858 1 11.5C1 11.9142 1.39175 12.25 1.875 12.25H14.125C14.6082 12.25 15 11.9142 15 11.5C15 11.0858 14.6082 10.75 14.125 10.75H1.875Z"/>
  </svg>
);

export const CLOSING_SVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.4714 4.4714C12.7318 4.21105 12.7318 3.78894 12.4714 3.52859C12.2111 3.26824 11.789 3.26824 11.5286 3.52859L8.00004 7.05719L4.47145 3.52859C4.2111 3.26824 3.78899 3.26824 3.52864 3.52859C3.26829 3.78894 3.26829 4.21105 3.52864 4.4714L7.05723 7.99999L3.52864 11.5286C3.26829 11.7889 3.26829 12.211 3.52864 12.4714C3.78899 12.7317 4.2111 12.7317 4.47145 12.4714L8.00004 8.9428L11.5286 12.4714C11.789 12.7317 12.2111 12.7317 12.4714 12.4714C12.7318 12.211 12.7318 11.7889 12.4714 11.5286L8.94285 7.99999L12.4714 4.4714Z"/>
  </svg>
)

export const FAVORIT_SVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29877C10.7264 1.29877 10.1584 1.41178 9.62852 1.63136C9.09865 1.85091 8.61711 2.17281 8.21162 2.57846L8.00005 2.79003L7.78835 2.57834C6.96928 1.75927 5.85839 1.29912 4.70005 1.29912C3.54171 1.29912 2.43081 1.75927 1.61174 2.57834C0.792668 3.39741 0.33252 4.50831 0.33252 5.66665C0.33252 6.82499 0.792668 7.93589 1.61174 8.75496L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75496C14.794 8.34947 15.1158 7.86805 15.3353 7.33817C15.5549 6.80825 15.6679 6.24026 15.6679 5.66665C15.6679 5.09304 15.5549 4.52505 15.3353 3.99513C15.1158 3.46531 14.7941 2.98392 14.3885 2.57846C13.983 2.17276 13.5015 1.85093 12.9716 1.63136C12.4416 1.41178 11.8737 1.29877 11.3 1.29877Z" fill="#EB5757"/>
  </svg>
)

export const HOME_SVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.59038 0.807088C7.83112 0.619846 8.16823 0.619846 8.40897 0.807088L14.409 5.47375C14.5714 5.60006 14.6663 5.79426 14.6663 5.99999V13.3333C14.6663 13.8638 14.4556 14.3725 14.0806 14.7475C13.7055 15.1226 13.1968 15.3333 12.6663 15.3333H3.33301C2.80257 15.3333 2.29387 15.1226 1.91879 14.7475C1.54372 14.3725 1.33301 13.8638 1.33301 13.3333V5.99999C1.33301 5.79426 1.42799 5.60006 1.59038 5.47375L7.59038 0.807088ZM2.66634 6.32605V13.3333C2.66634 13.5101 2.73658 13.6797 2.8616 13.8047C2.98663 13.9298 3.1562 14 3.33301 14H12.6663C12.8432 14 13.0127 13.9298 13.1377 13.8047C13.2628 13.6797 13.333 13.5101 13.333 13.3333V6.32605L7.99967 2.1779L2.66634 6.32605Z"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.33301 8.00001C5.33301 7.63182 5.63148 7.33334 5.99967 7.33334H9.99967C10.3679 7.33334 10.6663 7.63182 10.6663 8.00001V14.6667C10.6663 15.0349 10.3679 15.3333 9.99967 15.3333C9.63148 15.3333 9.33301 15.0349 9.33301 14.6667V8.66668H6.66634V14.6667C6.66634 15.0349 6.36786 15.3333 5.99967 15.3333C5.63148 15.3333 5.33301 15.0349 5.33301 14.6667V8.00001Z"/>
  </svg>
);
