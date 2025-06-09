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

  const defaultImageSource: ImageSourcePropType = useMemo(() => {
    const imageUri = Image.resolveAssetSource(
      require('@assets/images/image-placeholder.png'),
    ).uri;

    return {
      uri: imageUri,
      height,
      width,
    };
  }, [height, width]);

  if (!uri) {
    return null;
  }

  return <Image defaultSource={defaultImageSource} source={imageSource} />;
};
