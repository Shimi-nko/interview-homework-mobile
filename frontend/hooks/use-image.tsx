import { useMemo } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';

export const useImage = (width: number, height: number, uri?: string) => {
  const imageSource: ImageSourcePropType = useMemo(() => {
    return {
      uri,
      cache: 'only-if-cached',
      height,
      width,
    };
  }, [uri, height, width]);

  if (!uri) {
    return null;
  }

  return (
    <Image
      defaultSource={{
        uri: require('@assets/images/image-placeholder.png'),
        height,
        width,
      }}
      source={imageSource}
    />
  );
};
