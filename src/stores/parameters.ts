import { create } from 'zustand';

import { TLens } from 'types/lens';
import { TReferenceLens } from 'types/reference-lens';
import { TCategory } from 'types/category';

type State = {
  lensData?: TLens;
  setLensData: (lensData?: TLens) => void;

  referenceLensData?: TReferenceLens;
  setReferenceLensData: (referenceLensData?: TReferenceLens) => void;

  rootCategory?: TCategory;
  setRootCategory: (rootCategory?: TCategory) => void;

  category?: TCategory;
  setCategory: (category?: TCategory) => void;

  resetAll: () => void;
};

export const useParametersStore = create<State>((set, get) => ({
  lensData: undefined,
  setLensData: (lensData) => set({ lensData }),

  referenceLensData: undefined,
  setReferenceLensData: (referenceLensData) => set({ referenceLensData }),

  rootCategory: undefined,
  setRootCategory: (rootCategory) => set({ rootCategory }),

  category: undefined,
  setCategory: (category) => set({ category }),

  resetAll: () => {
    get().setReferenceLensData(undefined);
    get().setLensData(undefined);

    get().setRootCategory(undefined);
    get().setCategory(undefined);
  },
}));
