import { SkeletonPlaceholder } from '@components/skeleton-placeholder/skeleton-placeholder';
import { useThemeColor } from '@hooks/use-theme-color';
import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const SKELETON_WIDTH_: number = 260;
const IMAGE_SKELETON_SIZE: number = 50;

export const WarehouseProductPlaceholder: FC = () => {
  const color = useThemeColor({}, 'textInverse');

  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        height={IMAGE_SKELETON_SIZE}
        width={IMAGE_SKELETON_SIZE}
        backgroundColor="white"
        shimmerColor={color}
        containerStyle={{ borderRadius: 16 }}
      />
      <View style={styles.skeletons}>
        <SkeletonPlaceholder
          height={20}
          width={SKELETON_WIDTH_}
          backgroundColor="white"
          shimmerColor={color}
          containerStyle={{ borderRadius: 16 }}
        />
        <SkeletonPlaceholder
          height={20}
          width={SKELETON_WIDTH_}
          backgroundColor="white"
          shimmerColor={color}
          containerStyle={{ borderRadius: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    columnGap: 8,
  },
  skeletons: {
    gap: 16,
  },
});
