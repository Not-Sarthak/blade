import styled from 'styled-components/native';
import type { EasingFn } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { makeBorderSize } from '~utils';
import { useTheme } from '~components/BladeProvider';
import type { ActionStates } from '~tokens/theme/theme';

const BaseInputStyledAnimatedBorder = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  opacity: 1,
  backgroundColor: theme.colors.brand.primary[500],
  height: makeBorderSize(theme.border.width.thin),
}));

export const BaseInputAnimatedBorder = ({
  currentInteraction,
}: {
  currentInteraction: keyof ActionStates;
}): ReactNode => {
  const { theme } = useTheme();
  const borderAnimationEasing = (theme.motion.easing.standard.effective as unknown) as EasingFn;

  const widthTrigger = useSharedValue(0);
  const opacityTrigger = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(widthTrigger.value, [0, 1], [0, 100])}%`,
      opacity: interpolate(opacityTrigger.value, [0, 1], [0, 1]),
    };
  });

  useEffect(() => {
    if (currentInteraction == 'focus') {
      widthTrigger.value = 0;
      opacityTrigger.value = 1;
      widthTrigger.value = withTiming(1, {
        duration: theme.motion.duration.moderate,
        easing: borderAnimationEasing,
      });
    } else {
      opacityTrigger.value = withTiming(0, {
        duration: theme.motion.duration.xquick,
        easing: borderAnimationEasing,
      });
    }
  }, [
    currentInteraction,
    opacityTrigger,
    widthTrigger,
    theme.motion.duration,
    borderAnimationEasing,
  ]);

  return <BaseInputStyledAnimatedBorder style={animatedStyle} />;
};