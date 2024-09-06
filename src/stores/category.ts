import { create } from 'zustand';

import { TCategory } from 'types/category';

type State = {
  categoryList: TCategory[];
  setCategoryList: (categoryList: TCategory[]) => void;
};

export const useCategoryStore = create<State>((set) => ({
  categoryList: [],
  setCategoryList: (categoryList) => set({ categoryList }),
}));
