import { DetailScreen } from '@screens/detail-screen';
import { useGlobalSearchParams } from 'expo-router';

export default () => {
  const { id } = useGlobalSearchParams<{ id: string }>();
  return <DetailScreen productId={id} />;
};
