import { MATERIAL_OPTIONS } from 'constants/parameters';
import { TCategory } from 'types/category';

export const getMaterialLabel = (value?: string | null) => {
  return MATERIAL_OPTIONS.find((item) => item.value === value)?.label;
};

export const findRootCategory = (categoryList: TCategory[], id?: string | number | null): TCategory | undefined => {
  const category = categoryList.find((item) => item.id === id);
  if (!category) return;
  if (category.parent_id === 0) return category;

  return findRootCategory(categoryList, category.parent_id);
};

export const findCategories = (categoryList: TCategory[], id?: string | number | null) => {
  const category = categoryList.find((item) => item.id === id);
  const rootCategory = findRootCategory(categoryList, id);
  return { category, rootCategory };
};
