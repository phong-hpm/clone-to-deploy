import { TReferenceLens } from 'types/reference-lens';
import { TApiMeta, TApiResponse } from 'types/api';

import axiosInstance from 'helpers/axios';

export const getReferenceLensesApi = async (options?: {
  page?: number;
  perPage?: number;
  category?: string;
  referenceName?: string;
  search?: string;
}) => {
  const { page, perPage, category, search } = options || {};

  const params = {
    per_page: perPage || 6,
    page: page || 1,
    'filter[category_id]': category,
    'filter[keyword]': search,
  };

  const { data } = await axiosInstance.get<{ data: TApiMeta & { data: TReferenceLens[] } }>('/reference-lenses', {
    params,
  });

  const { data: entityData, ...apiMeta } = data.data;

  return {
    data: entityData || [],
    meta: apiMeta,
  };
};

export const getReferenceLensByIdApi = async (id: string | number) => {
  const { data } = await axiosInstance.get<TApiResponse<TReferenceLens>>(`/reference-lenses/${id}`);
  return data;
};
