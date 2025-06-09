import { describe, expect } from '@jest/globals';
import {
  removeAccents,
  replaceCommaForPeriodSymbol,
} from '@utils/string-utils';

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

const stringWithComma = '1,5';
describe('removeAccents', () => {
  test.each(texts)(
    'should return normalized text without diacritics',
    (value, expectedValue) => {
      const normalizedValue = removeAccents(value);
      expect(normalizedValue).toEqual(expectedValue);
    },
  );
});

describe('replaceCommaForPeriodSymbol', () => {
  it('should return changed string with period instead of comma', () => {
    const numberStringValue = replaceCommaForPeriodSymbol(stringWithComma);
    expect(numberStringValue).toEqual('1.5');
  });
});
