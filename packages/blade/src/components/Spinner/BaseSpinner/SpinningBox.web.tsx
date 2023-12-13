import styled, { css, keyframes } from 'styled-components';
import { motion as spinnerMotion } from './spinnerTokens';
import getIn from '~utils/lodashButBetter/get';
import BaseBox from '~components/Box/BaseBox';
import { makeMotionTime } from '~utils/makeMotionTime';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningBox = styled(BaseBox)(({ theme }) => {
  return css`
    padding: 1px;
    width: max-content;
    display: inline-flex;
    animation: ${rotate} ${makeMotionTime(getIn(theme.motion, spinnerMotion.duration))}
      ${getIn(theme.motion, spinnerMotion.easing)} infinite;
  `;
});

export { SpinningBox };
