import { Platform } from 'react-native';

export const BASE_URL = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
});
export const ALL_PRODUCTS_URL = `${BASE_URL}/all`;
export const PRODUCT_BY_ID_URL = (id: string) => `${BASE_URL}/${id}`;
