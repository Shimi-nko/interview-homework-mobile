import { describe, expect } from '@jest/globals';
import { removeAccents } from '@utils/string-utils';

const texts = [
  ['Šampón na vlasy', 'Sampon na vlasy'],
  ['skriňa', 'skrina'],
  ['guľa', 'gula'],
  ['gúľa', 'gula'],
  ['kôš', 'kos'],
  ['ľavá', 'lava'],
  ['láva', 'lava'],
  ['plášť', 'plast'],
  ['raž', 'raz'],
];
describe('removeAccents', () => {
  test.each(texts)(
    'should return normalized text without diacritics',
    (value, expectedValue) => {
      const normalizedValue = removeAccents(value);
      expect(normalizedValue).toEqual(expectedValue);
    },
  );
});
