import { create } from 'zustand';

import { TLens } from 'types/lens';
import { TReferenceLens } from 'types/reference-lens';
import { TApiMeta } from 'types/api';

type State = {
  loading: boolean;
  setLoading: (loading: boolean) => void;

  called: boolean;
  setCalled: (called: boolean) => void;

  lensesMeta?: TApiMeta;
  setLensesMeta: (lensesMeta?: TApiMeta) => void;

  lensList: { lens: TLens; reference_lens: TReferenceLens }[];
  setLensList: (lensList: { lens: TLens; reference_lens: TReferenceLens }[]) => void;
};

export const useLensStore = create<State>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),

  called: false,
  setCalled: (called) => set({ called }),

  lensesMeta: undefined,
  setLensesMeta: (lensesMeta) => set({ lensesMeta }),

  lensList: [],
  setLensList: (lensList) => set({ lensList }),
}));
