export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/\p{Diacritic}/gu, '');

export const replaceCommaForPeriodSymbol = (input: string) => {
  return input.replace(',', '.');
};
