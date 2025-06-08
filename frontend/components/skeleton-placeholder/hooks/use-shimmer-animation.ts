import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

export const useShimmerAnimation = (width: number) => {
  const animationProgress = useSharedValue(-width)

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(width, {
        duration: 1500,
        easing: Easing.elastic(0.3)
      }),
      -1,
      true
    )
  }, [width, animationProgress])

  return useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationProgress.value }]
    }
  })
}
