import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #f0f0f0 40px,
    #e0e0e0 80px
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const Skeleton: React.FC<{
  width?: string;
  height?: string;
  flexSrink?: string;
}> = ({ width, height }) => {
  return <SkeletonWrapper style={{ width, height }} />;
};
