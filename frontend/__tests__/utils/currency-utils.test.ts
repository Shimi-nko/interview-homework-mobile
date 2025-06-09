import { describe, expect, it } from '@jest/globals';
import { formatCurrency } from '@utils/currency-utils';

describe('formatCurrency', () => {
  it('should return correct format and currency', () => {
    const amount = formatCurrency(200);
    expect(amount).toEqual('200,00 €');
  });
  it('should return correct format and currency with decimal values', () => {
    const amount = formatCurrency(1.5);
    expect(amount).toEqual('1,50 €');
  });
});
