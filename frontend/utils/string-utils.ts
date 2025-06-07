export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
