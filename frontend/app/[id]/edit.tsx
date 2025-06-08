import { EditScreen } from '@screens/edit-screen';
import { useGlobalSearchParams } from 'expo-router';

export default () => {
  const { id } = useGlobalSearchParams<{ id: string }>();
  return <EditScreen productId={id} />;
};
