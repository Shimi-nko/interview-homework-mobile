import { useThemeColor } from '@hooks/useThemeColor';
import { Fragment, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  type ImageSourcePropType,
} from 'react-native';

export const useImage = (width: number, height: number, uri?: string) => {
  const [loading, setLoading] = useState(true);
  const color = useThemeColor({}, 'icon');

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

  const onLoadStart = () => {
    setLoading(true);
  };

  const onLoadEnd = () => {
    setLoading(false);
  };

  return (
    <Fragment>
      {loading && <ActivityIndicator size="small" color={color} />}
      <Image
        style={{ width, height }}
        source={imageSource}
        onLoadStart={onLoadStart}
        onLoad={onLoadEnd}
        onLoadEnd={onLoadEnd}
      />
    </Fragment>
  );
};
