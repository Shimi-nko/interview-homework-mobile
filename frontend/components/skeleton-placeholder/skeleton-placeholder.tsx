import { LinearGradient } from 'expo-linear-gradient';
import type { FC } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import { useShimmerAnimation } from './hooks/use-shimmer-animation';

export type SkeletonPlaceholderProps = {
  width: number;
  height: number;
  backgroundColor: string;
  shimmerColor: string;
  containerStyle?: ViewStyle;
};

export const SkeletonPlaceholder: FC<SkeletonPlaceholderProps> = (props) => {
  const { width, backgroundColor, shimmerColor } = props;

  const shimmerEffectStyle = useShimmerAnimation(width);
  const style = styles(props);

  return (
    <View
      style={[
        style.container,
        { ...props.containerStyle, backgroundColor: backgroundColor },
      ]}
    >
      <Animated.View style={[style.animationContainer, shimmerEffectStyle]}>
        <LinearGradient
          colors={[backgroundColor, shimmerColor, backgroundColor]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={style.linearGradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = ({ height, width, backgroundColor }: SkeletonPlaceholderProps) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
      overflow: 'hidden',
      backgroundColor: backgroundColor,
    },
    animationContainer: {
      height,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: backgroundColor,
    },
    linearGradient: {
      width,
    },
  });
