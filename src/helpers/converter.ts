export const convertStringToNumber = (value?: string | number | null) => {
  if (typeof value === 'number') return value;
  if (value === null) return null;
  if (value === undefined) return undefined;
  if (!value) return null;
  return Number(value);
};
