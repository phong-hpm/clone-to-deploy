export type TCategoryName = 'SKV' | 'SMT' | 'miniV' | 'miniT';

export type TCategory = {
  id: number;
  name: TCategoryName;
  parent_id?: number;
};
