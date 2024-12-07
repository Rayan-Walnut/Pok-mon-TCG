import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  AnimateProps,
} from 'react-native-reanimated';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

const AnimatedView = Animated.createAnimatedComponent(View);

type AnimatedViewStyle = AnimateProps<ViewStyle>;

const localStyles = StyleSheet.create({
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: [{ skewX: '-20deg' }],
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

interface ShineEffectProps {
  style?: AnimatedViewStyle;
}

export const ShineEffect = ({ style }: ShineEffectProps): JSX.Element => {
  const translateX = useSharedValue(-100);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(100, {
        duration: 1500,
        easing: Easing.ease,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const gradientProps: LinearGradientProps = {
    colors: ['transparent', 'rgba(255,255,255,0.3)', 'transparent'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    style: localStyles.gradientContainer
  };

  return (
    <AnimatedView style={[localStyles.shineEffect, animatedStyle]}>
      <LinearGradient {...gradientProps} />
    </AnimatedView>
  );
};